export const brevoConfig = {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.BREVO_SENDER_EMAIL || "no-reply@vedanco.com",
    senderName: "Vedanco Support",
};

if (!brevoConfig.apiKey) {
    console.warn("BREVO_API_KEY is not defined in environment variables. Email sending will fail.");
}
