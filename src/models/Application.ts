import mongoose, { Schema, Document, Model } from "mongoose";

export interface IApplication extends Document {
    role: string;
    company: string;
    location: string;
    dateApplied: Date;
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    jobId: string;
    jobUrl?: string;
    salary?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApplicationSchema: Schema = new Schema(
    {
        role: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        dateApplied: { type: Date, required: true, default: Date.now },
        status: {
            type: String,
            enum: ["APPLIED", "INTERVIEW", "IN_REVIEW", "REJECTED", "OFFER"],
            default: "APPLIED",
        },
        jobId: { type: String, required: true },
        jobUrl: { type: String },
        salary: { type: String },
        notes: { type: String },
    },
    {
        timestamps: true,
    }
);

// Prevent overwriting model if it already exists (Next.js hot reload issue)
const Application: Model<IApplication> =
    mongoose.models.Application || mongoose.model<IApplication>("Application", ApplicationSchema);

export default Application;
