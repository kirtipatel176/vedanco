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
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model if it already exists (Next.js hot reload issue)
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
