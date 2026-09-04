type VercelRequest = {
  method?: string;
  body?: any;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (data: any) => VercelResponse;
};

const WEB3FORMS_ACCESS_KEY =
  process.env.WEB3FORMS_ACCESS_KEY ||
  "416814c8-d0c6-4a5b-a56b-98411cbbb560";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", message: "Method not allowed" });
  }

  const { name, email, phone, company, subject, message } = req.body || {};

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ status: "error", message: "Name is required" });
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ status: "error", message: "Valid email is required" });
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ status: "error", message: "Message is required" });
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
      return res.status(200).json({ status: "success", message: "Message sent successfully" });
    } else {
      return res.status(400).json({ status: "error", message: data.message || "Failed to send message" });
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return res.status(500).json({ status: "error", message: "Network error. Please try again." });
  }
}
