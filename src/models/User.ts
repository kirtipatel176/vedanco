import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password?: string;
    company?: string;
    designation?: string;
    experience?: string;
    skills?: string;
    bio?: string;
    profileImage?: string;
    isVerified: boolean;
    resetPasswordOtp?: string;
    resetPasswordOtpExpiry?: Date;
    // --- Lockout Tracking ---
    failedLoginAttempts: number;
    lockoutUntil?: Date;
    // ------------------------------
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true, select: false },
        company: { type: String },
        designation: { type: String },
        experience: { type: String },
        skills: { type: String },
        bio: { type: String },
        profileImage: { type: String },
        isVerified: { type: Boolean, default: true },
        resetPasswordOtp: { type: String },
        resetPasswordOtpExpiry: { type: Date },
        // --- Lockout Tracking ---
        failedLoginAttempts: { type: Number, default: 0 },
        lockoutUntil: { type: Date },
        // ------------------------------
    },
    {
        timestamps: true,
    }
);

// Delete the cached model to ensure schema updates are applied during Next.js Hot module replacement (HMR)
if (process.env.NODE_ENV !== 'production' && mongoose.models.User) {
    delete mongoose.models.User;
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
