// Security utilities for request validation and logging

// Simple token generation for request signing
export function generateRequestToken(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  return Buffer.from(`${timestamp}:${random}`).toString('base64');
}

// Validate request token (basic timestamp validation)
export function validateRequestToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [timestamp] = decoded.split(':');
    const tokenTime = parseInt(timestamp, 10);
    
    // Token should be from the last 5 minutes
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    return !isNaN(tokenTime) && (now - tokenTime) < fiveMinutes && (now - tokenTime) > 0;
  } catch {
    return false;
  }
}

// Browser-based token validation (for client-side generated tokens)
export function validateBrowserToken(token: string): boolean {
  try {
    // Browser tokens use btoa instead of Buffer
    const decoded = atob(token);
    const [timestamp] = decoded.split(':');
    const tokenTime = parseInt(timestamp, 10);
    
    // Token should be from the last 5 minutes
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;
    
    return !isNaN(tokenTime) && (now - tokenTime) < fiveMinutes && (now - tokenTime) > 0;
  } catch {
    return false;
  }
}

// Security logging function
export function logSecurityEvent(event: string, details: any, severity: 'info' | 'warning' | 'error' = 'info') {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    severity,
    ...details,
  };
  
  console.log(`[SECURITY ${severity.toUpperCase()}]`, JSON.stringify(logEntry));
  
  // In production, you would send this to a logging service
  // like Datadog, Sentry, or CloudWatch
}

// Detect suspicious patterns
export function detectSuspiciousActivity(data: any): { suspicious: boolean; reason?: string } {
  // Check for common spam patterns
  const spamPatterns = [
    /viagra|cialis|casino|poker|lottery/i,
    /bitcoin|cryptocurrency|crypto/i,
    /\.ru|\.cn|\.pk/i, // Known spam domains
    /http[s]?:\/\/[^\s]+/i, // URLs in unexpected fields
  ];
  
  const textFields = Object.values(data).filter(
    value => typeof value === 'string' && value.length > 0
  );
  
  for (const field of textFields) {
    for (const pattern of spamPatterns) {
      if (pattern.test(field)) {
        return { suspicious: true, reason: `Spam pattern detected: ${pattern}` };
      }
    }
  }
  
  // Check for rapid submissions (timestamp analysis)
  if (data.timestamp) {
    const submissionTime = parseInt(data.timestamp, 10);
    const now = Date.now();
    const timeDiff = now - submissionTime;
    
    // If submission was less than 1 second ago, likely automated
    if (timeDiff < 1000) {
      return { suspicious: true, reason: 'Rapid submission detected' };
    }
  }
  
  return { suspicious: false };
}

// Sanitize input for logging (prevent log injection)
export function sanitizeForLogging(input: any): string {
  if (typeof input !== 'string') return JSON.stringify(input);
  
  return input
    .replace(/[\n\r]/g, ' ') // Remove newlines
    .replace(/\t/g, ' ') // Remove tabs
    .substring(0, 500); // Limit length
}