"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getUserProfile, UserProfile } from "@/lib/actions/user.actions";
import { ProfileView } from "@/components/dashboard/profile/ProfileView";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
    const { user: authUser, logout, updateUser } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            if (!authUser?.id) return;

            setIsLoading(true);
            try {
                const result = await getUserProfile(authUser.id);
                if (result.user) {
                    setProfile(result.user);
                } else {
                    toast.error(result.error || "Failed to load profile");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [authUser]);

    const handleUpdateSuccess = (updatedUser: UserProfile) => {
        setProfile(updatedUser);
        setIsEditing(false);
        // Instantly update the header avatar and name
        updateUser({
            name: updatedUser.name,
            profileImage: updatedUser.profileImage,
        });
    };

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profile Not Found</h2>
                <p className="text-gray-500 max-w-sm">We couldn&apos;t load your profile information. Please try refreshing the page or logging in again.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Profile</h1>
                <p className="text-gray-500 mt-2">Manage your personal information and experience.</p>
            </div>

            {isEditing ? (
                <ProfileForm
                    user={profile}
                    onSuccess={handleUpdateSuccess}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                    <ProfileView
                        user={profile}
                        onEdit={() => setIsEditing(true)}
                    />
                </div>
            )}
        </div>
    );
}
