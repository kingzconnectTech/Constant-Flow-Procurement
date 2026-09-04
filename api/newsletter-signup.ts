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

  // Validate Content-Type
  const contentType = req.headers?.["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return res.status(400).json({ status: "error", message: "Content-Type must be application/json" });
  }

  const { email, role } = req.body || {};

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

    // Pass through the Apps Script's actual status (success / duplicate / error)
    return res.status(200).json(data);
  } catch (error) {
    console.error("Newsletter signup error:", error);
    return res.status(500).json({ status: "error", message: "Failed to reach signup service" });
  }
}
