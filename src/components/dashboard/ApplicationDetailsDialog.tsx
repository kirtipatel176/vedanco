"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, DollarSign, ExternalLink, FileText } from "lucide-react";

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
}

interface ApplicationDetailsDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    application: Application | null;
}

export function ApplicationDetailsDialog({
    open,
    onOpenChange,
    application,
}: ApplicationDetailsDialogProps) {
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
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-white text-black p-0 overflow-hidden border-zinc-200 gap-0">
                <div className="bg-zinc-50 p-6 border-b border-zinc-100">
                    <DialogHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline" className={`${getStatusColor(application.status)} font-bold uppercase tracking-wider text-[10px]`}>
                                {application.status.replace("_", " ")}
                            </Badge>
                            <span className="text-xs font-mono text-zinc-400">
                                ID: {application._id.slice(-6).toUpperCase()}
                            </span>
                        </div>
                        <DialogTitle className="text-2xl font-display font-bold text-black">{application.role}</DialogTitle>
                        <DialogDescription className="text-zinc-500 flex items-center gap-2 mt-1">
                            <Building2 size={14} /> {application.company}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Location</div>
                            <div className="flex items-center gap-2 text-sm font-medium text-black">
                                <MapPin size={16} className="text-zinc-400" />
                                {application.location}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Date Applied</div>
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
                            <div className="space-y-1">
                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Salary</div>
                                <div className="flex items-center gap-2 text-sm font-medium text-black">
                                    <DollarSign size={16} className="text-zinc-400" />
                                    {application.salary}
                                </div>
                            </div>
                        )}
                        {application.jobUrl && (
                            <div className="space-y-1">
                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Job Posting</div>
                                <a
                                    href={application.jobUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                                >
                                    <ExternalLink size={16} />
                                    View Posting
                                </a>
                            </div>
                        )}
                    </div>

                    {application.notes && (
                        <div className="bg-zinc-50 p-4 rounded-lg border border-zinc-100">
                            <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                <FileText size={14} /> Notes
                            </div>
                            <p className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                                {application.notes}
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end pt-4">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="border-zinc-200">
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
