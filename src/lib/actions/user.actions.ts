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
    bio?: string;
    profileImage?: string;
    createdAt: string;
    updatedAt: string;
};

// Helper to serialize Mongoose document to plain object
function serializeUser(user: IUser & { _id: { toString(): string }; createdAt: Date; updatedAt: Date }): UserProfile {
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
        profileImage: user.profileImage,
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
    } catch (error: unknown) {
        console.error("Error fetching user profile:", error);
        return { error: error instanceof Error ? error.message : "Failed to fetch profile" };
    }
}

export async function updateUserProfile(userId: string, data: Partial<IUser>) {
    try {
        await connectToDatabase();

        // Prevent updating sensitive fields (email, password) via this action
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email: _email, password: _password, ...updateData } = data;

        // Email is treated as immutable via this form; password changes require a dedicated flow.

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
    } catch (error: unknown) {
        console.error("Error updating user profile:", error);
        return { error: error instanceof Error ? error.message : "Failed to update profile" };
    }
}

export async function deleteUserProfile(userId: string) {
    try {
        await connectToDatabase();

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return { error: "User not found" };
        }

        return { success: true };
    } catch (error: unknown) {
        console.error("Error deleting user profile:", error);
        return { error: error instanceof Error ? error.message : "Failed to delete profile" };
    }
}
