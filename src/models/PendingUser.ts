import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPendingUser extends Document {
    email: string;
    otp: string; // Hashed OTP
    otpExpires: Date;
    userData: Record<string, unknown>; // Contains name, password (hashed), phone, company, etc.
    otpRequests: number;
    otpWindowStart: Date;
    createdAt: Date;
    updatedAt: Date;
}

const PendingUserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        otp: { type: String, required: true },
        otpExpires: { type: Date, required: true },
        userData: { type: Schema.Types.Mixed, required: true }, // The validated user payload
        otpRequests: { type: Number, default: 0 },
        otpWindowStart: { type: Date },
    },
    {
        timestamps: true,
    }
);

// Optional: Automatic cleanup of unverified accounts after 1 hour (3600 seconds)
PendingUserSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 3600 });

// Delete the cached model to ensure schema updates are applied during Next.js Hot module replacement (HMR)
if (process.env.NODE_ENV !== 'production' && mongoose.models.PendingUser) {
    delete mongoose.models.PendingUser;
}

const PendingUser: Model<IPendingUser> = mongoose.models.PendingUser || mongoose.model<IPendingUser>("PendingUser", PendingUserSchema);

export default PendingUser;
