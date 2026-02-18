"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Building2,
    MapPin,
    Calendar,
    DollarSign,
    ExternalLink,
    FileText,
    Briefcase,
    Paperclip,
    Globe,
    HelpCircle
} from "lucide-react";

interface Application {
    _id: string;
    role: string;
    company: string;
    location: string;
    dateApplied: string;
    status: "APPLIED" | "INTERVIEW" | "IN_REVIEW" | "REJECTED" | "OFFER";
    salary?: string;
    jobUrl?: string;
    notes?: string;
    // New fields
    experienceYears?: string;
    resumeUrl?: string;
    coverLetterUrl?: string;
    portfolioUrl?: string;
    reasonForApplying?: string;
    skillExperience?: string;
}

interface ApplicationDetailsSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    application: Application | null;
}

export function ApplicationDetailsSheet({
    open,
    onOpenChange,
    application,
}: ApplicationDetailsSheetProps) {
    if (!application) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case "INTERVIEW": return "bg-emerald-100 text-emerald-800 border-emerald-200";
            case "IN_REVIEW": return "bg-amber-100 text-amber-800 border-amber-200";
            case "REJECTED": return "bg-zinc-100 text-zinc-500 border-zinc-200";
            case "OFFER": return "bg-purple-100 text-purple-800 border-purple-200";
            default: return "bg-blue-100 text-blue-800 border-blue-200";
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-lg w-full p-0 gap-0 border-l border-zinc-200 bg-white shadow-2xl">
                <div className="h-full flex flex-col">
                    {/* Header Section */}
                    <div className="bg-zinc-50 p-6 border-b border-zinc-100">
                        <SheetHeader className="text-left space-y-4">
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className={`${getStatusColor(application.status)} font-bold uppercase tracking-wider text-[10px] px-2 py-1`}>
                                    {application.status.replace("_", " ")}
                                </Badge>
                                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                    APPL-{application._id.slice(-6).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <SheetTitle className="text-2xl font-display font-black text-black leading-tight tracking-tight">
                                    {application.role}
                                </SheetTitle>
                                <SheetDescription className="text-zinc-500 flex items-center gap-2 mt-2 font-medium">
                                    <Building2 size={16} className="text-zinc-400" />
                                    {application.company}
                                </SheetDescription>
                            </div>
                        </SheetHeader>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Key Details Grid */}
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div className="space-y-1.5">
                                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Location</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-black">
                                    <MapPin size={16} className="text-zinc-400" />
                                    {application.location}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Applied On</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-black">
                                    <Calendar size={16} className="text-zinc-400" />
                                    {new Date(application.dateApplied).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </div>
                            </div>

                            {application.salary && (
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Salary Expectation</div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-black">
                                        <DollarSign size={16} className="text-zinc-400" />
                                        {application.salary}
                                    </div>
                                </div>
                            )}

                            {application.experienceYears && (
                                <div className="space-y-1.5">
                                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Experience</div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-black">
                                        <Briefcase size={16} className="text-zinc-400" />
                                        {application.experienceYears} Years
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Documents Section */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 pb-2">
                                <Paperclip size={14} /> Documents
                            </div>
                            <div className="grid gap-2">
                                {application.resumeUrl ? (
                                    <a href={application.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                        <div className="bg-white p-2 rounded-md border border-zinc-200 mr-3">
                                            <FileText size={16} className="text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-black">Resume</div>
                                            <div className="text-xs text-zinc-500">Click to view/download</div>
                                        </div>
                                        <ExternalLink size={14} className="text-zinc-400" />
                                    </a>
                                ) : (
                                    <div className="text-sm text-zinc-400 italic">No resume attached</div>
                                )}

                                {application.coverLetterUrl && (
                                    <a href={application.coverLetterUrl} target="_blank" rel="noreferrer" className="flex items-center p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                        <div className="bg-white p-2 rounded-md border border-zinc-200 mr-3">
                                            <FileText size={16} className="text-blue-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-black">Cover Letter</div>
                                        </div>
                                        <ExternalLink size={14} className="text-zinc-400" />
                                    </a>
                                )}

                                {application.portfolioUrl && (
                                    <a href={application.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center p-3 rounded-lg border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 transition-colors">
                                        <div className="bg-white p-2 rounded-md border border-zinc-200 mr-3">
                                            <Globe size={16} className="text-purple-500" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-black">Portfolio</div>
                                        </div>
                                        <ExternalLink size={14} className="text-zinc-400" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Screening Questions */}
                        {(application.reasonForApplying || application.skillExperience) && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-100 pb-2">
                                    <HelpCircle size={14} /> Screening Questions
                                </div>

                                {application.reasonForApplying && (
                                    <div className="space-y-1">
                                        <div className="text-xs font-semibold text-zinc-700">Why are you applying for this position?</div>
                                        <div className="text-sm text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                                            {application.reasonForApplying}
                                        </div>
                                    </div>
                                )}

                                {application.skillExperience && (
                                    <div className="space-y-1">
                                        <div className="text-xs font-semibold text-zinc-700">Relevant Experience/Skills</div>
                                        <div className="text-sm text-zinc-600 bg-zinc-50 p-3 rounded-lg border border-zinc-100">
                                            {application.skillExperience}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Notes Section */}
                        {/* Job Link */}
                        {application.jobUrl && (
                            <div className="p-4 rounded-xl border border-zinc-100 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-200 transition-all group cursor-pointer group">
                                <a
                                    href={application.jobUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between w-full"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white rounded-lg border border-zinc-200 text-zinc-500 group-hover:text-blue-600 transition-colors">
                                            <ExternalLink size={16} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-black">Job Posting</div>
                                            <div className="text-xs text-zinc-500 truncate max-w-[200px]">{application.jobUrl}</div>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-zinc-300 group-hover:text-black transition-colors" />
                                </a>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-zinc-100 bg-zinc-50/50">
                        <Button className="w-full bg-black text-white hover:bg-zinc-800 font-bold h-12 rounded-xl" onClick={() => onOpenChange(false)}>
                            Close Details
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
