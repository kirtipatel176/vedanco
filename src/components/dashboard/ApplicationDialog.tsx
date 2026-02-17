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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    role: z.string().min(2, "Role must be at least 2 characters."),
    company: z.string().min(2, "Company must be at least 2 characters."),
    location: z.string().min(2, "Location must be at least 2 characters."),
    status: z.enum(["APPLIED", "INTERVIEW", "IN_REVIEW", "REJECTED", "OFFER"]),
    dateApplied: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
    }),
    salary: z.string().optional(),
    jobUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
    notes: z.string().optional(),
});

interface ApplicationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    initialValues?: z.infer<typeof formSchema> | null;
    mode: "add" | "edit";
}

export function ApplicationDialog({
    open,
    onOpenChange,
    onSubmit,
    initialValues,
    mode,
}: ApplicationDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "",
            company: "",
            location: "",
            status: "APPLIED",
            dateApplied: new Date().toISOString().split("T")[0],
            salary: "",
            jobUrl: "",
            notes: "",
        },
    });

    useEffect(() => {
        if (initialValues) {
            // Ensure date is truncated to YYYY-MM-DD for input type="date"
            const formattedValues = {
                ...initialValues,
                dateApplied: new Date(initialValues.dateApplied).toISOString().split("T")[0],
            };
            form.reset(formattedValues);
        } else {
            form.reset({
                role: "",
                company: "",
                location: "",
                status: "APPLIED",
                dateApplied: new Date().toISOString().split("T")[0],
                salary: "",
                jobUrl: "",
                notes: "",
            })
        }
    }, [initialValues, form, open]);

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        onSubmit(values);
        onOpenChange(false);
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle>{mode === "add" ? "Add Application" : "Edit Application"}</DialogTitle>
                    <DialogDescription>
                        {mode === "add"
                            ? "Add a new job application to your tracking list."
                            : "Update the details of your job application."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Frontend Developer" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Acme Corp" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Remote" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="APPLIED">Applied</SelectItem>
                                                <SelectItem value="INTERVIEW">Interview</SelectItem>
                                                <SelectItem value="IN_REVIEW">In Review</SelectItem>
                                                <SelectItem value="REJECTED">Rejected</SelectItem>
                                                <SelectItem value="OFFER">Offer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="dateApplied"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date Applied</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Salary (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="$120k / yr" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jobUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Job URL (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any additional notes..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" className="bg-black text-white hover:bg-zinc-800">
                                {mode === "add" ? "Add Application" : "Save Changes"}
                            </Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
