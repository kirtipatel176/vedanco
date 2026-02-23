import { brevoConfig } from "@/lib/brevo";
import { logger } from "@/utils/logger";

export interface BrevoPayload {
    sender: { email: string; name: string };
    to: Array<{ email: string; name?: string }>;
    subject: string;
    htmlContent: string;
    tags?: string[];
}

export class EmailService {
    /**
     * Core function to send an email via Brevo's v3 SMTP API.
     */
    static async sendEmail(payload: BrevoPayload) {
        if (!brevoConfig.apiKey) {
            logger.error("Email service missing API Key");
            throw new Error("Email service is not configured correctly.");
        }

        try {
            const response = await fetch("https://api.brevo.com/v3/smtp/email", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "api-key": brevoConfig.apiKey,
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                logger.error(`Brevo API Error (${response.status})`, errorData);
                throw new Error(errorData.message || `Brevo returned ${response.status} Bad Request`);
            }

            return await response.json();
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "Unknown error";
            logger.error("Email Dispatch Failed", msg);
            throw new Error(`Email Dispatch Failed: ${msg}`);
        }
    }

    /**
     * Sends a 6 digit OTP for registration flows.
     */
    static async sendOtpEmail(email: string, name: string, otp: string) {
        const payload: BrevoPayload = {
            sender: { email: brevoConfig.senderEmail, name: brevoConfig.senderName },
            to: [{ email, name }],
            subject: "Your Vedanco Registration OTP",
            htmlContent: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Welcome to Vedanco, ${name}!</h2>
              <p style="color: #555; font-size: 16px;">Please use the following One-Time Password to complete your registration.</p>
              <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 4px; text-align: center; margin: 20px 0;">
                <strong style="font-size: 32px; color: #007bff; letter-spacing: 4px;">${otp}</strong>
              </div>
              <p style="color: #777; font-size: 14px;">This code expires in 10 minutes. If you did not request this, please ignore this email.</p>
            </div>`,
            tags: ["otp_registration"]
        };

        return this.sendEmail(payload);
    }

    /**
     * Sends a 6 digit OTP for password reset flows.
     */
    static async sendPasswordResetOtpEmail(email: string, name: string, otp: string) {
        const payload: BrevoPayload = {
            sender: { email: brevoConfig.senderEmail, name: brevoConfig.senderName },
            to: [{ email, name }],
            subject: "Your Password Reset OTP",
            htmlContent: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Hello, ${name}</h2>
              <p style="color: #555; font-size: 16px;">We received a request to reset your password. Please use the following One-Time Password to proceed.</p>
              <div style="background-color: #ffffff; padding: 15px; border: 1px solid #ddd; border-radius: 4px; text-align: center; margin: 20px 0;">
                <strong style="font-size: 32px; color: #007bff; letter-spacing: 4px;">${otp}</strong>
              </div>
              <p style="color: #777; font-size: 14px;">This code expires in 15 minutes. If you did not request a password reset, please ignore this email.</p>
            </div>`,
            tags: ["otp_password_reset"]
        };

        return this.sendEmail(payload);
    }
}
