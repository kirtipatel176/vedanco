"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { getUserProfile, UserProfile } from "@/lib/actions/user.actions";
import { ProfileView } from "@/components/dashboard/profile/ProfileView";
import { ProfileForm } from "@/components/dashboard/profile/ProfileForm";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const { user: authUser, isLoading: isAuthLoading } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            if (!authUser?.id) return;

            try {
                setIsLoading(true);
                // We use the ID from the auth context to fetch the full profile
                const result = await getUserProfile(authUser.id);

                if (result.error) {
                    setError(result.error);
                    toast.error(result.error);
                } else if (result.user) {
                    setProfile(result.user);
                }
            } catch (err) {
                setError("Failed to load profile");
                toast.error("Failed to load profile");
            } finally {
                setIsLoading(false);
            }
        }

        if (!isAuthLoading && authUser) {
            fetchProfile();
        } else if (!isAuthLoading && !authUser) {
            setIsLoading(false); // Auth failed or not logged in
        }
    }, [authUser, isAuthLoading]);

    const handleProfileUpdate = (updatedUser: UserProfile) => {
        setProfile(updatedUser);
        setIsEditing(false);
    };

    if (isAuthLoading || (isLoading && authUser)) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!authUser) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-xl font-semibold">Please log in to view your profile</h2>
                {/* Redirect logic could go here or relying on protected route middleware */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
                <h2 className="text-xl font-semibold text-destructive">Error loading profile</h2>
                <p className="text-muted-foreground">{error}</p>
                <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8">
            {/* Breadcrumb or simplified header could go here if needed, but the view has a header */}

            {profile ? (
                isEditing ? (
                    <ProfileForm
                        user={profile}
                        onCancel={() => setIsEditing(false)}
                        onSuccess={handleProfileUpdate}
                    />
                ) : (
                    <ProfileView
                        user={profile}
                        onEdit={() => setIsEditing(true)}
                    />
                )
            ) : (
                <div className="flex justify-center p-8">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            )}
        </div>
    );
}
