"use server";

import connectToDatabase from "@/lib/db";
import User, { IUser } from "@/models/User";
import { revalidatePath } from "next/cache";

// Define a safe return type that excludes sensitive fields like password
export type UserProfile = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    designation?: string;
    experience?: string;
    skills?: string;
    bio?: string; // Adding bio as per requirements, strictly speaking need to add to model too if not present
    createdAt: string;
    updatedAt: string;
};

// Helper to serialize Mongoose document to plain object
function serializeUser(user: any): UserProfile {
    return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        designation: user.designation,
        experience: user.experience,
        skills: user.skills,
        bio: user.bio,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

export async function getUserProfile(userId: string) {
    try {
        await connectToDatabase();

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return { error: "User not found" };
        }

        return { user: serializeUser(user) };
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        return { error: error.message || "Failed to fetch profile" };
    }
}

export async function updateUserProfile(userId: string, data: Partial<IUser>) {
    try {
        await connectToDatabase();

        // Prevent updating sensitive fields via this action if necessary
        const { email, password, ...updateData } = data as any;

        // If email update is allowed, we should check for uniqueness, but for now let's assume email is immutable via this form or handled carefully.
        // The requirement says "Allow updating values", implies basic profile info.

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return { error: "User not found" };
        }

        revalidatePath("/dashboard/profile");

        return { success: true, user: serializeUser(updatedUser) };
    } catch (error: any) {
        console.error("Error updating user profile:", error);
        return { error: error.message || "Failed to update profile" };
    }
}
