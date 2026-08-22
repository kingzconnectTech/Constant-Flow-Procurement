type VercelRequest = {
  method?: string;
  body?: any;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
};

const APPS_SCRIPT_URL =
  process.env.APPS_SCRIPT_URL ||
  "https://script.google.com/macros/s/AKfycbwH1JPnExDdpFJi8tWXBRpGj0Gf8kV49tfdADntgjKoCZ2YkI39lmZH2iRML1p2Dv0A/exec";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { email, role } = req.body || {};

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return res.status(400).json({ status: "error", message: "Invalid email address" });
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

    const data = await scriptRes.json();

    // Pass through the Apps Script's actual status (success / duplicate / error)
    return res.status(200).json(data);
  } catch {
    // Fallback: If Apps Script returns plain text or redirects, check if successful
    try {
      const fallbackRes = await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${encodeURIComponent(email.trim().toLowerCase())}&role=${encodeURIComponent(role)}`,
      });
      const text = await fallbackRes.text();
      return res.status(200).json({ status: "success", message: text });
    } catch {
      return res
        .status(500)
        .json({ status: "error", message: "Failed to reach signup service" });
    }
  }
}
