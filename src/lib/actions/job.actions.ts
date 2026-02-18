"use server";

import connectToDatabase from "@/lib/db";
import Job, { IJob } from "@/models/Job";
import { revalidatePath } from "next/cache";

export async function createJob(jobData: Partial<IJob>) {
    try {
        await connectToDatabase();

        // Generate slug from title if not provided
        if (!jobData.slug && jobData.title) {
            jobData.slug = jobData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        const newJob = await Job.create(jobData);
        revalidatePath("/dashboard");
        revalidatePath("/careers");
        return JSON.parse(JSON.stringify(newJob));
    } catch (error) {
        console.error("Error creating job:", error);
        throw new Error("Failed to create job");
    }
}

export async function getJobs(filter: Record<string, unknown> = {}, limit?: number) {
    try {
        await connectToDatabase();
        let query = Job.find(filter).sort({ createdAt: -1 });

        if (limit) {
            query = query.limit(limit);
        }

        const jobs = await query;
        return JSON.parse(JSON.stringify(jobs));
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error("Failed to fetch jobs");
    }
}

export async function getJobBySlug(slug: string) {
    try {
        await connectToDatabase();

        // Case-insensitive search
        const job = await Job.findOne({
            slug: { $regex: new RegExp(`^${slug}$`, 'i') }
        });

        if (!job) {
            console.error(`Job not found for slug: ${slug}`);
            throw new Error("Job not found");
        }
        return JSON.parse(JSON.stringify(job));
    } catch (error) {
        console.error("Error fetching job:", error);
        throw error; // Re-throw the original error to be handled by the page
    }
}

export async function updateJob(id: string, updateData: Partial<IJob>) {
    try {
        await connectToDatabase();
        const updatedJob = await Job.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedJob) throw new Error("Job not found");
        revalidatePath("/dashboard");
        revalidatePath("/careers");
        return JSON.parse(JSON.stringify(updatedJob));
    } catch (error) {
        console.error("Error updating job:", error);
        throw new Error("Failed to update job");
    }
}

export async function deleteJob(id: string) {
    try {
        await connectToDatabase();
        const deletedJob = await Job.findByIdAndDelete(id);
        if (!deletedJob) throw new Error("Job not found");
        revalidatePath("/dashboard");
        revalidatePath("/careers");
        return { message: "Job deleted successfully" };
    } catch (error) {
        console.error("Error deleting job:", error);
        throw new Error("Failed to delete job");
    }
}
