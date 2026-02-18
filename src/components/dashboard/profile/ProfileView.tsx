import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfile } from "@/lib/actions/user.actions";
import {
    User,
    Mail,
    Phone,
    Building,
    Briefcase,
    Calendar,
    Edit2,
    Award
} from "lucide-react";

interface ProfileViewProps {
    user: UserProfile;
    onEdit: () => void;
}

export function ProfileView({ user, onEdit }: ProfileViewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20 border-4 border-background shadow-lg">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} />
                        <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="flex items-center gap-1">
                                {user.designation || "No designation"}
                            </span>
                            {user.company && (
                                <>
                                    <span>•</span>
                                    <span>{user.company}</span>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Badge variant="secondary" className="font-normal">
                                Member since {formatDate(user.createdAt)}
                            </Badge>
                        </div>
                    </div>
                </div>
                <Button onClick={onEdit} className="gap-2 shadow-sm">
                    <Edit2 className="h-4 w-4" />
                    Edit Profile
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Information */}
                <Card className="shadow-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-1">
                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                            <p className="text-sm font-medium">{user.name}</p>
                        </div>

                        <div className="grid gap-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Mail className="h-3.5 w-3.5" /> Email Address
                            </p>
                            <p className="text-sm">{user.email}</p>
                        </div>

                        <div className="grid gap-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Phone className="h-3.5 w-3.5" /> Phone Number
                            </p>
                            <p className="text-sm">{user.phone || "Not provided"}</p>
                        </div>

                        {user.bio && (
                            <div className="grid gap-1">
                                <p className="text-sm font-medium text-muted-foreground">Bio</p>
                                <p className="text-sm text-muted-foreground/90 leading-relaxed">{user.bio}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Professional Details */}
                <Card className="shadow-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            Professional Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-1">
                                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Building className="h-3.5 w-3.5" /> Company
                                </p>
                                <p className="text-sm">{user.company || "Not provided"}</p>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                    <Award className="h-3.5 w-3.5" /> Designation
                                </p>
                                <p className="text-sm">{user.designation || "Not provided"}</p>
                            </div>
                        </div>

                        <div className="grid gap-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5" /> Experience
                            </p>
                            <p className="text-sm">{user.experience || "Not provided"}</p>
                        </div>

                        <div className="grid gap-1">
                            <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                <Award className="h-3.5 w-3.5" /> Skills
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {user.skills ? (
                                    user.skills.split(",").map((skill, i) => (
                                        <Badge key={i} variant="outline" className="text-xs bg-muted/50">
                                            {skill.trim()}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-muted-foreground">No skills listed</span>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
