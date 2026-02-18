
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITempUpload extends Document {
    fileId: string;
    url: string;
    filePath: string;
    fileType: 'resume' | 'cover_letter' | 'other';
    createdAt: Date;
}

const TempUploadSchema = new Schema<ITempUpload>(
    {
        fileId: { type: String, required: true, unique: true },
        url: { type: String, required: true },
        filePath: { type: String, required: true },
        fileType: { type: String, enum: ['resume', 'cover_letter', 'other'], default: 'other' },
        createdAt: { type: Date, default: Date.now }, // Manually cleaned up to sync with ImageKit deletion
    },
    { timestamps: true }
);

const TempUpload: Model<ITempUpload> =
    mongoose.models.TempUpload || mongoose.model<ITempUpload>("TempUpload", TempUploadSchema);

export default TempUpload;
