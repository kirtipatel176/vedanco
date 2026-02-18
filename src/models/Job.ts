import mongoose, { Schema, Document, Model, Types } from "mongoose"

export interface IJob extends Document {
    title: string
    department: string
    location: string
    type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship"
    description: string
    requirements: string[]
    salaryRange?: string
    experienceRequired?: string
    status: "active" | "closed" | "draft"
    slug: string
    postedBy: Types.ObjectId
    createdAt: Date
    updatedAt: Date
}

const JobSchema = new Schema<IJob>(
    {
        title: {
            type: String,
            required: [true, "Job title is required"],
            trim: true,
        },
        department: {
            type: String,
            required: [true, "Department is required"],
            trim: true,
        },
        location: {
            type: String,
            required: [true, "Location is required"],
            trim: true,
        },
        type: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Remote", "Internship"],
            required: [true, "Job type is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        requirements: [{
            type: String,
        }],
        salaryRange: String,
        experienceRequired: String,
        status: {
            type: String,
            enum: ["active", "closed", "draft"],
            default: "draft",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
)

const Job: Model<IJob> = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema)

export default Job;
