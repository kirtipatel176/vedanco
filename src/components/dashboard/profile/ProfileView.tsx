"use client";

import { UserProfile } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import {
    User,
    Mail,
    Phone,
    Briefcase,
    Award,
    Clock,
    FileText,
    Pencil
} from "lucide-react";
import Image from "next/image";

interface ProfileViewProps {
    user: UserProfile;
    onEdit: () => void;
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
    // Helper to get initials if no profile picture
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-6">
                    <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl shadow-sm border border-primary/20 overflow-hidden relative">
                        {user.profileImage ? (
                            <Image
                                src={user.profileImage}
                                alt={user.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            getInitials(user.name)
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{user.name}</h1>
                        <p className="text-gray-500 mt-1 flex items-center gap-2">
                            <Mail className="h-4 w-4" /> {user.email}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Button onClick={onEdit} className="flex-1 md:flex-none gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-400" />
                            Contact Information
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Phone className="h-4 w-4" /> Phone Number
                                </p>
                                <p className="font-medium">{user.phone || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Mail className="h-4 w-4" /> Email Address
                                </p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-gray-400" />
                            Professional Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Company</p>
                                <p className="font-medium">{user.company || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Designation / Job Title</p>
                                <p className="font-medium">{user.designation || "Not provided"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                            <Award className="h-5 w-5 text-gray-400" />
                            Experience & Skills
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
                                    <Clock className="h-4 w-4" /> Years of Experience
                                </p>
                                <p className="font-medium">{user.experience || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Top Skills</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user.skills ? (
                                        user.skills.split(",").map((skill, index) => (
                                            <span
                                                key={`skill-${index}-${skill.trim()}`}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="font-medium text-gray-900">Not provided</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full max-h-[250px] overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-gray-400" />
                            About Me / Bio
                        </h3>
                        <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {user.bio || "No bio provided. Click edit to add a little about yourself!"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
