
"use server";

import TempUpload from "@/models/TempUpload";
import connectToDatabase from "@/lib/db";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function trackUpload(fileId: string, url: string, filePath: string, fileType: string) {
    try {
        await connectToDatabase();
        await TempUpload.create({
            fileId,
            url,
            filePath,
            fileType,
        });
        return { success: true };
    } catch (error) {
        console.error("Error tracking upload:", error);
        return { success: false, error: "Failed to track upload" };
    }
}

export async function deleteTempUpload(fileId: string) {
    try {
        await connectToDatabase();
        const upload = await TempUpload.findOneAndDelete({ fileId });
        if (upload) {
            await imagekit.deleteFile(fileId);
        }
        return { success: true };
    } catch (error) {
        console.error("Error deleting temp upload:", error);
        // Don't throw, just return failure, as this might be part of a cleanup process
        return { success: false, error: "Failed to delete upload" };
    }
}

export async function cleanupExpiredUploads() {
    try {
        await connectToDatabase();
        // Query items strictly older than 24h, delete from ImageKit, then delete from DB.

        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const expiredUploads = await TempUpload.find({ createdAt: { $lt: twentyFourHoursAgo } });

        if (expiredUploads.length === 0) return { success: true, count: 0 };

        const fileIdsToDelete = expiredUploads.map(u => u.fileId);

        // ImageKit bulk delete
        if (fileIdsToDelete.length > 0) {
            await imagekit.bulkDeleteFiles(fileIdsToDelete);
        }

        // Delete from DB
        await TempUpload.deleteMany({ _id: { $in: expiredUploads.map(u => u._id) } });

        return { success: true, count: expiredUploads.length };

    } catch (error) {
        console.error("Cleanup error:", error);
        return { success: false, error: "Cleanup failed" };
    }
}
