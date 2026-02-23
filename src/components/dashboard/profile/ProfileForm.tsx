"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserProfile, updateUserProfile } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, UploadCloud, User } from "lucide-react";
import Image from "next/image";
import { IKContext, IKUpload } from "imagekitio-react";

// The authEndpoint handles ImageKit authentication signing
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;
const authenticator = async () => {
    try {
        const response = await fetch("/api/upload/auth");
        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.message || "Failed to authenticate with ImageKit");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("ImageKit Authentication Error:", error);
        throw error;
    }
};

const profileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    company: z.string().optional(),
    designation: z.string().optional(),
    experience: z.string().optional(),
    skills: z.string().optional(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
    user: UserProfile;
    onCancel: () => void;
    onSuccess: (updatedUser: UserProfile) => void;
}

export function ProfileForm({ user, onCancel, onSuccess }: Readonly<ProfileFormProps>) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(user.profileImage || "");

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: user.name,
            phone: user.phone,
            company: user.company || "",
            designation: user.designation || "",
            experience: user.experience || "",
            skills: user.skills || "",
            bio: user.bio || "",
        },
    });

    async function onSubmit(data: ProfileFormValues) {
        setIsLoading(true);
        try {
            const updatePayload = {
                ...data,
                profileImage: profileImageUrl, // Attach newly uploaded or existing image string
            };

            const result = await updateUserProfile(user._id, updatePayload);

            if (result.error) {
                toast.error(result.error);
            } else if (result.success && result.user) {
                toast.success("Profile updated successfully");
                onSuccess(result.user);
            }
        } catch (error: unknown) {
            console.error("Update error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    const onUploadStart = () => {
        setIsUploadingImage(true);
    };

    const onUploadSuccess = (res: { url: string }) => {
        setIsUploadingImage(false);
        setProfileImageUrl(res.url);
        toast.success("Profile image uploaded!");
    };

    const onUploadError = (err: unknown) => {
        setIsUploadingImage(false);
        const msg = err instanceof Error ? err.message : "Unknown upload error";
        console.error("Image upload failed", msg);
        toast.error("Failed to upload profile image");
    };

    const getInitials = (name: string) => {
        return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };

    return (
        <IKContext urlEndpoint={urlEndpoint} publicKey={publicKey} authenticator={authenticator}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h1 className="text-2xl font-bold tracking-tight mb-8">Edit Profile</h1>

                {/* Image Upload Section */}
                <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center gap-8">
                    <div className="h-28 w-28 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl shadow-sm relative overflow-hidden shrink-0">
                        {profileImageUrl ? (
                            <Image src={profileImageUrl} alt={user.name} fill className="object-cover" />
                        ) : (
                            getInitials(user.name)
                        )}
                        {isUploadingImage && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <Loader2 className="h-8 w-8 text-white animate-spin" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-3 text-center sm:text-left">
                        <h3 className="font-semibold text-gray-900">Profile Image</h3>
                        <p className="text-sm text-gray-500">Upload a professional photo to stand out. Max size 5MB.</p>

                        <div className="relative inline-block">
                            <Button
                                type="button"
                                variant="outline"
                                className="relative overflow-hidden cursor-pointer"
                                disabled={isUploadingImage}
                            >
                                <UploadCloud className="h-4 w-4 mr-2" />
                                {isUploadingImage ? "Uploading..." : "Click to Upload"}
                                <IKUpload
                                    fileName="profile-image.jpg"
                                    tags={["profile"]}
                                    useUniqueFileName={true}
                                    validateFile={(file: File) => file.size < 5000000} // 5MB limit
                                    onUploadStart={onUploadStart}
                                    onSuccess={onUploadSuccess}
                                    onError={onUploadError}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </Button>
                        </div>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                                    <User className="h-5 w-5 text-gray-400" />
                                    Basic Information
                                </h3>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            value={user.email}
                                            disabled
                                            className="bg-gray-100 text-gray-500 cursor-not-allowed"
                                        />
                                    </FormControl>
                                    <p className="text-xs text-gray-500">Email cannot be changed.</p>
                                    <FormMessage />
                                </FormItem>

                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 (555) 000-0000" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold border-b pb-2">Professional Details</h3>

                                <FormField
                                    control={form.control}
                                    name="company"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Company (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Acme Corp" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="designation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Designation (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Software Engineer" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Years of Experience (Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. 5 years" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="skills"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Skills (Comma separated, Optional)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="React, Node.js, Typescript" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4">About Me</h3>
                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio / Summary (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself and your professional background..."
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-6 border-t">
                            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading || isUploadingImage}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading || isUploadingImage}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </IKContext>
    );
}
