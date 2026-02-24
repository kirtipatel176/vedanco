import mongoose, { Schema, Document, Model } from "mongoose"

export interface IUser extends Document {
    email: string
    password?: string
    name: string
    role: "user" | "admin" | "hr"
    isActive: boolean
    avatar?: string
    verified: boolean
    lastLogin?: Date
    phone?: string
    company?: string
    department?: string
    designation?: string
    location?: string
    bio?: string
    skills: string[]
    createdAt: Date
    updatedAt: Date
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        role: {
            type: String,
            enum: ["user", "admin", "hr"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        avatar: String,
        verified: {
            type: Boolean,
            default: false,
        },
        lastLogin: Date,
        phone: String,
        company: String,
        department: String,
        designation: String,
        location: String,
        bio: String,
        skills: [String],
    },
    {
        timestamps: true,
    }
)

// Delete the cached model to ensure schema updates are applied during Next.js Hot module replacement (HMR)
if (process.env.NODE_ENV !== 'production' && mongoose.models.User) {
    delete mongoose.models.User;
}

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User
