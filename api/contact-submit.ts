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
};

const WEB3FORMS_ACCESS_KEY = process.env.WEB3FORMS_ACCESS_KEY;

if (!WEB3FORMS_ACCESS_KEY) {
  throw new Error("WEB3FORMS_ACCESS_KEY environment variable is not set");
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

  const { name, email, phone, company, subject, message, honeypot, securityToken } = req.body || {};

  // Security token validation
  if (!securityToken || !validateBrowserToken(securityToken)) {
    logSecurityEvent('INVALID_SECURITY_TOKEN', { ip: clientIP, userAgent: req.headers?.['user-agent'] }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  // Honeypot validation - if honeypot is filled, it's a bot
  if (honeypot && honeypot.trim() !== "") {
    logSecurityEvent('HONEYPOT_TRIGGERED', { ip: clientIP, userAgent: req.headers?.['user-agent'] }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  // Detect suspicious activity
  const suspiciousCheck = detectSuspiciousActivity({ name, email, message, company, subject, timestamp: req.body?.timestamp });
  if (suspiciousCheck.suspicious) {
    logSecurityEvent('SUSPICIOUS_ACTIVITY', { 
      ip: clientIP, 
      reason: suspiciousCheck.reason,
      email: sanitizeForLogging(email),
      userAgent: req.headers?.['user-agent']
    }, 'warning');
    return res.status(400).json({ status: "error", message: "Invalid request" });
  }

  // Validate required fields with length limits
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ status: "error", message: "Name is required" });
  }
  if (name.length > 100) {
    return res.status(400).json({ status: "error", message: "Name must be less than 100 characters" });
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ status: "error", message: "Valid email is required" });
  }
  if (email.length > 254) {
    return res.status(400).json({ status: "error", message: "Email must be less than 254 characters" });
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ status: "error", message: "Message is required" });
  }
  if (message.length > 5000) {
    return res.status(400).json({ status: "error", message: "Message must be less than 5000 characters" });
  }

  // Optional field validation
  if (phone && (typeof phone !== "string" || phone.length > 20)) {
    return res.status(400).json({ status: "error", message: "Phone must be less than 20 characters" });
  }

  if (company && (typeof company !== "string" || company.length > 100)) {
    return res.status(400).json({ status: "error", message: "Company must be less than 100 characters" });
  }

  if (subject && (typeof subject !== "string" || subject.length > 100)) {
    return res.status(400).json({ status: "error", message: "Subject must be less than 100 characters" });
  }

  // Sanitize inputs
  const sanitizedName = name.trim();
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedPhone = phone ? phone.trim() : "";
  const sanitizedCompany = company ? company.trim() : "Not specified";
  const sanitizedSubject = subject ? subject.trim() : "General Enquiry";
  const sanitizedMessage = message.trim();

  try {
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("name", sanitizedName);
    formData.append("email", sanitizedEmail);
    if (sanitizedPhone) {
      formData.append("phone", sanitizedPhone);
    }
    formData.append("company", sanitizedCompany);
    formData.append("subject", `[Constantflow Procurement] ${sanitizedSubject} from ${sanitizedName}`);
    formData.append("message", sanitizedMessage);
    formData.append("from_name", "Constantflow Procurement Website");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      logSecurityEvent('CONTACT_FORM_SUCCESS', { 
        ip: clientIP, 
        email: sanitizeForLogging(sanitizedEmail),
        userAgent: req.headers?.['user-agent']
      }, 'info');
      return res.status(200).json({ status: "success", message: "Message sent successfully" });
    } else {
      logSecurityEvent('CONTACT_FORM_FAILED', { 
        ip: clientIP, 
        error: data.message,
        userAgent: req.headers?.['user-agent']
      }, 'error');
      return res.status(400).json({ status: "error", message: data.message || "Failed to send message" });
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return res.status(500).json({ status: "error", message: "Network error. Please try again." });
  }
}
