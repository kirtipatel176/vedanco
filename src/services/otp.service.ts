import PendingUser from "@/models/PendingUser";
import { hashData, verifyData } from "@/utils/security";

export class OtpService {
    /**
     * Generates a 6-digit numeric OTP and stores it safely in the PendingUser collection.
     * Prevents race conditions by using robust updates.
     */
    static async generateAndStoreOtp(email: string, rawUserData: Record<string, unknown>, expirationMinutes = 10) {
        // Generate entirely numeric 6-digit PIN
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + expirationMinutes * 60 * 1000);

        // Convert to secure bcrypt hash
        const hashedOtp = await hashData(otp);

        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

        let pendingUser = await PendingUser.findOne({ email });

        // Apply rate limits natively
        if (pendingUser) {
            if (pendingUser.otpWindowStart && pendingUser.otpWindowStart > oneHourAgo) {
                if (pendingUser.otpRequests >= 3) {
                    throw new Error("Too many OTP requests. Try again after an hour.");
                }
                pendingUser.otpRequests += 1;
            } else {
                pendingUser.otpWindowStart = now;
                pendingUser.otpRequests = 1;
            }

            // Atomic update to replace old PIN
            await PendingUser.findOneAndUpdate(
                { email },
                {
                    $set: {
                        otp: hashedOtp,
                        otpExpires,
                        userData: rawUserData,
                        otpRequests: pendingUser.otpRequests,
                        otpWindowStart: pendingUser.otpWindowStart,
                    }
                },
                { new: true }
            );
        } else {
            // New request
            await PendingUser.create({
                email,
                otp: hashedOtp,
                otpExpires,
                userData: rawUserData,
                otpRequests: 1,
                otpWindowStart: now,
            });
        }

        return otp; // Return plaintext OTP to pass to the EmailService
    }

    /**
     * Safely verifies a user-provided OTP matches the DB hash
     */
    static async validateOtp(email: string, plainOtp: string) {
        const pendingUser = await PendingUser.findOne({ email });

        if (!pendingUser) {
            throw new Error("No OTP requested for this account or it has expired.");
        }

        if (pendingUser.otpExpires < new Date()) {
            throw new Error("OTP has expired. Please request a new one.");
        }

        const isMatch = await verifyData(plainOtp, pendingUser.otp);
        if (!isMatch) {
            throw new Error("Invalid OTP");
        }

        return pendingUser;
    }

    /**
     * Atomically clears out the pending record upon successful validation
     */
    static async consumeOtp(pendingUserId: string) {
        await PendingUser.deleteOne({ _id: pendingUserId });
    }
}
