"use client";

import { useState } from "react";
import { jobsData, JobBox } from "@/lib/jobs-data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Calendar } from "lucide-react";
import { ApplicationDialog } from "@/components/dashboard/ApplicationDialog";
// import { toast } from "sonner"; // If you have sonner installed, otherwise usage of alert is fine for now

export default function DashboardOverview() {
    const [selectedJob, setSelectedJob] = useState<JobBox | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleApply = (job: JobBox) => {
        setSelectedJob(job);
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="font-display font-bold text-3xl text-dashboard-text-primary tracking-tight">
                    Open Positions
                </h1>
                <p className="text-dashboard-text-secondary mt-2">
                    Explore and apply for open roles at Vedanco.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobsData.map((job) => (
                    <Card key={job.id} className="flex flex-col border-dashboard-border/50 shadow-sm hover:shadow-md transition-all">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-xl mb-1 text-dashboard-text-primary">{job.title}</CardTitle>
                                    <CardDescription className="text-dashboard-text-secondary">{job.department}</CardDescription>
                                </div>
                                <Badge variant="outline" className="text-dashboard-text-secondary border-dashboard-border bg-dashboard-surface">{job.type}</Badge>
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
                                    <span>{job.salaryRange || "Competitive"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                                </div>
                            </div>
                            <p className="text-sm line-clamp-3 text-dashboard-text-secondary">
                                {job.description}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-dashboard-accent text-white hover:bg-dashboard-accent-hover font-bold" onClick={() => handleApply(job)}>
                                Apply Now
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            <ApplicationDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                mode="add"
                initialValues={selectedJob ? {
                    role: selectedJob.title,
                    company: "Vedanco - " + selectedJob.department,
                    location: selectedJob.location,
                    salary: selectedJob.salaryRange || "",
                    status: "APPLIED",
                    dateApplied: new Date().toISOString().split("T")[0],
                    jobUrl: "",
                    notes: ""
                } : undefined}
                onSubmit={async (data) => {
                    try {
                        const payload = { ...data, jobId: selectedJob?.id };
                        const response = await fetch("/api/applications", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(payload),
                        });

                        const result = await response.json();

                        if (!response.ok) {
                            alert(result.error || "Failed to submit application");
                            return;
                        }

                        setIsDialogOpen(false);
                        alert("Application submitted successfully!");
                    } catch (error) {
                        console.error(error);
                        alert("Failed to submit application.");
                    }
                }}
            />
        </div>
    );
}
