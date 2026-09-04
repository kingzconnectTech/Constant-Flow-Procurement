import { checkRateLimit, getClientIP } from './lib/rate-limiter';
import { logSecurityEvent, detectSuspiciousActivity, sanitizeForLogging, validateBrowserToken } from './lib/security-utils';

type VercelRequest = {
  method?: string;
  body?: any;
  headers?: any;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
  setHeader: (key: string, value: string) => VercelResponse;
  end: () => VercelResponse;
};

const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

if (!APPS_SCRIPT_URL) {
  throw new Error("APPS_SCRIPT_URL environment variable is not set");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    return res.status(429).json({ 
      status: "error", 
      message: "Too many requests. Please try again later.",
      retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
    });
  }

  // Validate Content-Type
  const contentType = req.headers?.["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(400).json({ status: "error", message: "Content-Type must be application/json" });
  }

  const { email, role, honeypot, securityToken } = req.body || {};

  // Security token validation
  if (!securityToken || !validateBrowserToken(securityToken)) {
    logSecurityEvent('INVALID_SECURITY_TOKEN_NEWSLETTER', { ip: clientIP, userAgent: req.headers?.['user-agent'] }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  // Honeypot validation - if honeypot is filled, it's a bot
  if (honeypot && honeypot.trim() !== "") {
    logSecurityEvent('HONEYPOT_TRIGGERED_NEWSLETTER', { ip: clientIP, userAgent: req.headers?.['user-agent'] }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  // Detect suspicious activity
  const suspiciousCheck = detectSuspiciousActivity({ email, role, timestamp: req.body?.timestamp });
  if (suspiciousCheck.suspicious) {
    logSecurityEvent('SUSPICIOUS_ACTIVITY_NEWSLETTER', { 
      ip: clientIP, 
      reason: suspiciousCheck.reason,
      email: sanitizeForLogging(email),
      userAgent: req.headers?.['user-agent']
    }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ status: "error", message: "Invalid email address" });
  }

  if (email.length > 254) {
    return res.status(400).json({ status: "error", message: "Email must be less than 254 characters" });
  }

  if (role !== "buyer" && role !== "supplier") {
    return res.status(400).json({ status: "error", message: "Invalid role" });
  }

  try {
    const scriptRes = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim().toLowerCase(), role }),
    });

    if (!scriptRes.ok) {
      return res.status(500).json({ status: "error", message: "Failed to reach signup service" });
    }

    const data = await scriptRes.json();

    // Log security events
    if (data.status === "success" || data.result === "success") {
      logSecurityEvent('NEWSLETTER_SIGNUP_SUCCESS', { 
        ip: clientIP, 
        email: sanitizeForLogging(email.trim().toLowerCase()),
        role,
        userAgent: req.headers?.['user-agent']
      }, 'info');
    } else if (data.status === "duplicate") {
      logSecurityEvent('NEWSLETTER_DUPLICATE', { 
        ip: clientIP, 
        email: sanitizeForLogging(email.trim().toLowerCase()),
        userAgent: req.headers?.['user-agent']
      }, 'warning');
    } else {
      logSecurityEvent('NEWSLETTER_SIGNUP_FAILED', { 
        ip: clientIP, 
        error: data.message,
        userAgent: req.headers?.['user-agent']
      }, 'error');
    }

    // Pass through the Apps Script's actual status (success / duplicate / error)
    return res.status(200).json(data);
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return res.status(500).json({ status: "error", message: "Failed to reach signup service" });
  }
}
