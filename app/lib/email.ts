
interface EmailPayload {
  subject: string;
  htmlContent: string;
  replyTo: { email: string; name: string };
}

export async function sendAdminEmail(payload: EmailPayload) {
  const apiKey = process.env.BREVO_API_KEY;
  const adminEmail = "info@kkdinamo.hr"; // Email na koji stižu obavijesti

  if (!apiKey) {
    console.error('GREŠKA: Nedostaje BREVO_API_KEY u .env.local datoteci.');
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: { name: "KK Dinamo Web", email: "no-reply@kkdinamo.hr" },
        to: [{ email: adminEmail, name: "KK Dinamo Uprava" }],
        replyTo: payload.replyTo,
        subject: `[WEB PRIJAVA] ${payload.subject}`,
        htmlContent: payload.htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo Email Error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email Send Error:', error);
    return false;
  }
}
