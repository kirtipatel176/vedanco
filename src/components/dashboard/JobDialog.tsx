"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { IJob } from "@/models/Job";

const formSchema = z.object({
    title: z.string().min(2, "Title is required"),
    department: z.string().min(2, "Department is required"),
    location: z.string().min(2, "Location is required"),
    type: z.enum(["Full-time", "Part-time", "Contract", "Remote", "Internship"]),
    description: z.string().min(10, "Description is required"),
    requirements: z.string().optional(), // Will be split by newline
    salaryRange: z.string().optional(),
    experienceRequired: z.string().optional(),
    status: z.enum(["active", "closed", "draft"]),
});

interface JobDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
    initialValues?: Partial<IJob> | null;
    mode: "add" | "edit";
}

export function JobDialog({
    open,
    onOpenChange,
    onSubmit,
    initialValues,
    mode,
}: JobDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            department: "",
            location: "",
            type: "Full-time",
            description: "",
            requirements: "",
            salaryRange: "",
            experienceRequired: "",
            status: "draft",
        },
    });

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.reset({
                    title: initialValues.title || "",
                    department: initialValues.department || "",
                    location: initialValues.location || "",
                    type: (initialValues.type as "Full-time" | "Part-time" | "Contract" | "Internship") || "Full-time",
                    description: initialValues.description || "",
                    requirements: initialValues.requirements?.join("\n") || "",
                    salaryRange: initialValues.salaryRange || "",
                    experienceRequired: initialValues.experienceRequired || "",
                    status: (initialValues.status as "draft" | "active" | "closed") || "draft",
                });
            } else {
                form.reset({
                    title: "",
                    department: "",
                    location: "",
                    type: "Full-time",
                    description: "",
                    requirements: "",
                    salaryRange: "",
                    experienceRequired: "",
                    status: "draft",
                });
            }
        }
    }, [initialValues, form, open]);

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        try {
            await onSubmit(values);
            // onOpenChange(false); // Handled by parent
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] bg-white text-black max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{mode === "add" ? "Create New Job" : "Edit Job Position"}</DialogTitle>
                    <DialogDescription>
                        {mode === "add"
                            ? "Fill in the details to post a new job opening."
                            : "Update the job details below."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="title" render={({ field }) => (
                                <FormItem><FormLabel>Job Title *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="department" render={({ field }) => (
                                <FormItem><FormLabel>Department *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="location" render={({ field }) => (
                                <FormItem><FormLabel>Location *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="type" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Job Type *</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Full-time">Full-time</SelectItem>
                                            <SelectItem value="Part-time">Part-time</SelectItem>
                                            <SelectItem value="Contract">Contract</SelectItem>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                            <SelectItem value="Internship">Internship</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description *</FormLabel><FormControl><Textarea className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <FormField control={form.control} name="requirements" render={({ field }) => (
                            <FormItem><FormLabel>Requirements (One per line)</FormLabel><FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <FormField control={form.control} name="salaryRange" render={({ field }) => (
                                <FormItem><FormLabel>Salary Range</FormLabel><FormControl><Input placeholder="e.g. $80k - $120k" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="experienceRequired" render={({ field }) => (
                                <FormItem><FormLabel>Exp. Required</FormLabel><FormControl><Input placeholder="e.g. 3+ years" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="status" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                            <SelectItem value="draft">Draft</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>

                        <DialogFooter className="mt-6">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-black text-white hover:bg-zinc-800" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {mode === "add" ? "Create Job" : "Update Job"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
