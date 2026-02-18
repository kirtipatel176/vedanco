"use server";

import connectToDatabase from "@/lib/db";
import Application, { IApplication } from "@/models/Application";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function getApplications(limit?: number, email?: string) {
    noStore(); // Force dynamic data fetching
    try {
        await connectToDatabase();
        let query = Application.find({});

        if (email) {
            query = query.where('email', email);
        }

        query = query.sort({ createdAt: -1 });

        if (limit) {
            query = query.limit(limit);
        }

        const applications = await query.exec();
        return { success: true, data: JSON.parse(JSON.stringify(applications)) };
    } catch (error) {
        console.error("Error fetching applications:", error);
        return { success: false, error: "Failed to fetch applications" };
    }
}

export async function getApplicationStats(email?: string) {
    noStore();
    try {
        await connectToDatabase();

        const filter = email ? { email } : {};

        const [total, pending, interviewing, offers] = await Promise.all([
            Application.countDocuments(filter),
            Application.countDocuments({ ...filter, status: "APPLIED" }),
            Application.countDocuments({ ...filter, status: "INTERVIEW" }),
            Application.countDocuments({ ...filter, status: "OFFER" })
        ]);

        return {
            success: true,
            stats: {
                total,
                pending,
                interviewing,
                offers,
                rejectionRate: total > 0 ? Math.round((await Application.countDocuments({ ...filter, status: "REJECTED" }) / total) * 100) : 0
            }
        };
    } catch (error) {
        console.error("Error fetching application stats:", error);
        return { success: false, error: "Failed to fetch stats" };
    }
}

export async function createApplication(data: Partial<IApplication>) {
    try {
        await connectToDatabase();

        // Check for existing application
        const existingApplication = await Application.findOne({
            email: data.email,
            jobId: data.jobId
        });

        if (existingApplication) {
            return {
                success: false,
                error: "Duplicate",
                message: "You have already applied for this position."
            };
        }

        const newApplication = await Application.create(data);

        // Remove these files from TempUpload so they aren't cleaned up
        // We do this silently; if it fails, it's not critical for the user response,
        // but might lead to accidental deletion in 24h if we are unlucky.
        // Ideally we wrap this in try-catch or fire-and-forget.
        try {
            const urlsToKeep: string[] = [];
            if (data.resumeUrl) urlsToKeep.push(data.resumeUrl);
            if (data.coverLetterUrl) urlsToKeep.push(data.coverLetterUrl);
            // Add other file URLs if any

            if (urlsToKeep.length > 0) {
                // Dynamic import to avoid circular dependency issues if any
                const TempUpload = (await import("@/models/TempUpload")).default;
                await TempUpload.deleteMany({ url: { $in: urlsToKeep } });
            }
        } catch (cleanupError) {
            console.error("Error removing files from TempUpload:", cleanupError);
        }

        revalidatePath("/dashboard/applications");
        revalidatePath("/dashboard/admin/applications");

        return { success: true, data: JSON.parse(JSON.stringify(newApplication)), message: "Application submitted successfully." };
    } catch (error: unknown) {
        console.error("Error creating application:", error);
        const message = error instanceof Error ? error.message : "Failed to submit application";
        return {
            success: false,
            error: "SubmissionFailed",
            message
        };
    }
}
