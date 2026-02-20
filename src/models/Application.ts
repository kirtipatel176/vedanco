import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
    // Job Info
    jobId: string;
    jobTitle?: string; // Cache job title

    // Personal Details
    fullName: string;
    email: string;
    phone: string;
    city: string;
    country: string;

    // Professional Info
    experienceYears: string;
    currentTitle?: string;
    currentCompany?: string;
    expectedSalary?: string;
    startDate?: string;

    // Documents
    resumeUrl: string;
    coverLetterUrl?: string; // or text
    portfolioUrl?: string;
    profileImageUrl?: string;

    // Screening
    reasonForApplying?: string;
    skillExperience?: string; // "Do you have experience with..."

    // Metadata
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" }, // Optional for non-logged in users
        jobId: { type: String, required: true },
        jobTitle: { type: String },

        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },

        experienceYears: { type: String, required: true },
        currentTitle: { type: String },
        currentCompany: { type: String },
        expectedSalary: { type: String },
        startDate: { type: String },

        resumeUrl: { type: String, required: true },
        coverLetterUrl: { type: String },
        portfolioUrl: { type: String },
        profileImageUrl: { type: String },

        reasonForApplying: { type: String },
        skillExperience: { type: String },

        status: {
            type: String,
            enum: ["APPLIED", "INTERVIEW", "IN_REVIEW", "REJECTED", "OFFER"],
            default: "APPLIED",
        },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

// Compound index to prevent duplicate applications for the same job by the same email
ApplicationSchema.index({ email: 1, jobId: 1 }, { unique: true });

// Prevent overwriting model if it already exists
const Application: Model<IApplication> =
    mongoose.models.Application ||
    mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
