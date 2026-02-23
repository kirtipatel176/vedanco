"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import { ApplicationDialog } from "@/components/dashboard/ApplicationDialog";
import { JobDialog } from "@/components/dashboard/JobDialog";
import { IJob } from "@/models/Job";
import { createApplication } from "@/lib/actions/application.actions";
import { toast } from "sonner"; // Assuming toast is from sonner, as it's used in the onSubmit

interface JobItem {
    _id?: string;
    id?: string;
    title: string;
    department: string;
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Remote" | "Internship";
    status: "active" | "closed" | "draft";
    salaryRange?: string | { min: number; max?: number; currency: string };
    description: string;
    createdAt: string;
    requirements?: string[];
}

interface DashboardClientProps {
    initialJobs: JobItem[];
}

export default function DashboardClient({ initialJobs }: Readonly<DashboardClientProps>) {
    const jobs = initialJobs;

    // Application State
    const [selectedJobForApp, setSelectedJobForApp] = useState<JobItem | null>(null);
    const [isAppDialogOpen, setIsAppDialogOpen] = useState(false);

    // Job Management State (dialogs kept for future use)
    const [selectedJobForEdit] = useState<JobItem | null>(null);
    const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
    const [jobDialogMode] = useState<"add" | "edit">("add");

    const handleApply = (job: JobItem) => {
        setSelectedJobForApp(job);
        setIsAppDialogOpen(true);
    };

    const handleJobSubmit = async (values: Record<string, string | string[]>) => {
        try {
            // Process requirements string to array
            const requirementsRaw = typeof values.requirements === "string" ? values.requirements : "";
            const jobData = {
                ...values,
                requirements: requirementsRaw
                    ? requirementsRaw.split('\n').filter((req: string) => req.trim() !== '')
                    : []
            };

            // Job management is reserved for admin users
            console.log("Job data prepared:", jobData);
            setIsJobDialogOpen(false);
        } catch (error) {
            console.error("Error saving job:", error);
            alert("Failed to save job details.");
        }
    };

    const getBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
        if (status === "active") return "default";
        if (status === "draft") return "secondary";
        return "destructive";
    };

    const getSalaryDisplay = (salaryRange: JobItem['salaryRange']) => {
        if (!salaryRange) return "Competitive";
        if (typeof salaryRange === 'string') return salaryRange;
        if (typeof salaryRange === 'object' && salaryRange !== null) {
            let display = `${salaryRange.currency} ${salaryRange.min}`;
            if (salaryRange.max) {
                display += ` - ${salaryRange.max}`;
            } else {
                display += '+';
            }
            return display;
        }
        return "Competitive";
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <Card key={job._id || job.id} className="flex flex-col border-dashboard-border/50 shadow-sm hover:shadow-md transition-all relative group">
                        <CardHeader>
                            <div className="flex justify-between items-start pr-8">
                                <div>
                                    <CardTitle className="text-xl mb-1 text-dashboard-text-primary">{job.title}</CardTitle>
                                    <CardDescription className="text-dashboard-text-secondary">{job.department}</CardDescription>
                                </div>
                            </div>
                            <div className="mt-2 flex gap-2">
                                <Badge variant="outline" className="text-dashboard-text-secondary border-dashboard-border bg-dashboard-surface">{job.type}</Badge>
                                <Badge
                                    variant={getBadgeVariant(job.status)}
                                    className={job.status === 'active' ? 'bg-green-100 text-green-800 border-green-200' : ''}
                                >
                                    {job.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-4">
                            <div className="flex flex-col space-y-2 text-sm text-dashboard-text-muted">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>{getSalaryDisplay(job.salaryRange)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span suppressHydrationWarning>Posted: {new Date(job.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-sm line-clamp-3 text-dashboard-text-secondary">
                                {job.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" onClick={() => handleApply(job)}>
                                Preview Application
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Application Dialog (Preview/Test) */}
            <ApplicationDialog
                open={isAppDialogOpen}
                onOpenChange={setIsAppDialogOpen}
                mode="add"
                jobId={selectedJobForApp?._id as string | undefined}
                isJobClosed={selectedJobForApp?.status === "closed"}
                initialValues={selectedJobForApp ? {
                    role: selectedJobForApp.title,
                    company: "Vedanco - " + selectedJobForApp.department,
                    status: "APPLIED",
                    dateApplied: new Date().toISOString().split("T")[0],
                    notes: ""
                } : undefined}
                onSubmit={async (values) => {
                    try {
                        const result = await createApplication({
                            ...values,
                            jobId: selectedJobForApp?._id as string,
                            jobTitle: selectedJobForApp?.title,
                            status: 'APPLIED'
                        });

                        if (result.success) {
                            toast.success(result.message || "Application submitted successfully");
                            setIsAppDialogOpen(false);
                            // Ensure the dashboard data refreshes if needed, 
                            // though Next.js Server Actions with revalidatePath usually handle this.
                        } else {
                            toast.error(result.message || "Failed to submit application");
                        }
                    } catch (error) {
                        console.error("Submission error:", error);
                        toast.error("An unexpected error occurred. Please try again.");
                    }
                }}
            />

            {/* Job Management Dialog */}
            <JobDialog
                open={isJobDialogOpen}
                onOpenChange={setIsJobDialogOpen}
                mode={jobDialogMode}
                initialValues={selectedJobForEdit as Partial<IJob> | null}
                onSubmit={handleJobSubmit}
            />
        </>
    );
}
