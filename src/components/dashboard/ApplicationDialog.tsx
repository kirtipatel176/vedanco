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
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

// Define schema to match Application model
const formSchema = z.object({
    // Personal
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),

    // Professional
    experienceYears: z.string().min(1, "Experience is required"),
    currentTitle: z.string().optional(),
    currentCompany: z.string().optional(),
    expectedSalary: z.string().optional(),
    startDate: z.string().optional(),

    // Documents
    resumeUrl: z.string().min(1, "Resume is required"),
    coverLetterUrl: z.string().optional(),
    portfolioUrl: z.string().optional(), // URL validation optional for flexibility

    // Screening
    reasonForApplying: z.string().optional(),
    skillExperience: z.string().optional(),

    // Metadata (hidden or derived)
    role: z.string().optional(), // Job Title
    company: z.string().optional(), // Job Company
    status: z.enum(["APPLIED", "INTERVIEW", "IN_REVIEW", "REJECTED", "OFFER"]).default("APPLIED"),
    dateApplied: z.string().optional(),
    notes: z.string().optional(),
});

interface ApplicationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    initialValues?: Partial<z.infer<typeof formSchema>> | null;
    mode: "add" | "edit";
}

const STEPS = [
    { id: 'personal', title: 'Personal Details' },
    { id: 'professional', title: 'Professional Info' },
    { id: 'documents', title: 'Documents' },
    { id: 'screening', title: 'Screening' }
];

export function ApplicationDialog({
    open,
    onOpenChange,
    onSubmit,
    initialValues,
    mode,
}: ApplicationDialogProps) {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            city: "",
            country: "",
            experienceYears: "",
            currentTitle: "",
            currentCompany: "",
            expectedSalary: "",
            startDate: "",
            resumeUrl: "",
            coverLetterUrl: "",
            portfolioUrl: "",
            reasonForApplying: "",
            skillExperience: "",
            status: "APPLIED",
            notes: ""
        },
    });

    useEffect(() => {
        if (open) {
            if (initialValues) {
                form.reset({
                    fullName: initialValues.fullName || user?.name || "",
                    email: initialValues.email || user?.email || "",
                    phone: initialValues.phone || "",
                    city: initialValues.city || "",
                    country: initialValues.country || "",
                    experienceYears: initialValues.experienceYears || "",
                    currentTitle: initialValues.currentTitle || "",
                    currentCompany: initialValues.currentCompany || "",
                    expectedSalary: initialValues.expectedSalary || "",
                    startDate: initialValues.startDate || "",
                    resumeUrl: initialValues.resumeUrl || "",
                    coverLetterUrl: initialValues.coverLetterUrl || "",
                    portfolioUrl: initialValues.portfolioUrl || "",
                    reasonForApplying: initialValues.reasonForApplying || "",
                    skillExperience: initialValues.skillExperience || "",
                    status: initialValues.status || "APPLIED",
                    notes: initialValues.notes || "",
                });
            } else {
                form.reset({
                    fullName: user?.name || "",
                    email: user?.email || "",
                    phone: "",
                    city: "",
                    country: "",
                    experienceYears: "",
                    currentTitle: "",
                    currentCompany: "",
                    expectedSalary: "",
                    startDate: "",
                    resumeUrl: "",
                    coverLetterUrl: "",
                    portfolioUrl: "",
                    reasonForApplying: "",
                    skillExperience: "",
                    status: "APPLIED",
                    notes: "",
                });
            }
            setCurrentStep(0);
        }
    }, [initialValues, form, open, user]);

    // Validation for steps
    const validateStep = async (stepIndex: number) => {
        const fields = getFieldsForStep(stepIndex);
        const result = await form.trigger(fields as any);
        return result;
    };

    const getFieldsForStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0: return ['fullName', 'email', 'phone', 'city', 'country'];
            case 1: return ['experienceYears'];
            case 2: return ['resumeUrl'];
            case 3: return []; // Screening optional?
            default: return [];
        }
    };

    const handleNext = async () => {
        const isValid = await validateStep(currentStep);
        if (isValid) {
            setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => Math.max(prev - 1, 0));
    };

    // Mock file upload
    const handleFileUpload = (field: any) => {
        toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
            loading: 'Uploading...',
            success: () => {
                form.setValue(field, "https://example.com/resume.pdf");
                return 'File uploaded successfully';
            },
            error: 'Upload failed'
        });
    };

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await onSubmit(values);
            // Success handling is done in parent or onSubmit prop
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit application. Please try again.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] bg-white text-gray-900 max-h-[90vh] overflow-y-auto font-sans p-0 gap-0 rounded-xl shadow-2xl border border-gray-100">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold tracking-tight text-gray-900 font-display">
                            {mode === "add" ? "Start Your Journey" : "Edit Application"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 text-sm mt-1.5">
                            {mode === "add"
                                ? "Join our team and help shape the future. Complete the form below."
                                : "Update your application details accurately."}
                        </DialogDescription>
                    </DialogHeader>

                    {/* Modern Steps Indicator */}
                    <div className="mt-6 flex items-center justify-between relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
                        {STEPS.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center bg-white px-2 z-10">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${isCompleted
                                                ? 'bg-black text-white ring-4 ring-white'
                                                : isCurrent
                                                    ? 'bg-white border-2 border-black text-black ring-4 ring-black/5 shadow-lg scale-110'
                                                    : 'bg-white border-2 border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wider font-semibold mt-2 transition-colors duration-300 ${isCurrent ? 'text-black' : 'text-gray-400'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                            {/* Step 1: Personal */}
                            {currentStep === 0 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@example.com" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 000-0000" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="city" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="New York" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="country" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Country</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="USA" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Professional */}
                            {currentStep === 1 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField control={form.control} name="experienceYears" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Years of Experience</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. 5" type="number" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="currentTitle" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Current Job Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Senior Developer" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                        <FormField control={form.control} name="currentCompany" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Current Company</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Acme Inc." {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="expectedSalary" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Expected Salary</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="$120k" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="startDate" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Available Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} className="h-11 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Documents */}
                            {currentStep === 2 && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                                    <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Resume (Required)</FormLabel>
                                            <FormControl>
                                                {field.value ? (
                                                    <div className="flex items-center justify-between p-4 bg-green-50/50 border border-green-200 rounded-lg group transition-all hover:border-green-300">
                                                        <div className="flex items-center gap-3 overflow-hidden">
                                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                                                <CheckCircle className="w-5 h-5" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-sm font-medium text-gray-900 truncate">resume.pdf</span>
                                                                <span className="text-xs text-green-600">Ready for submission</span>
                                                            </div>
                                                        </div>
                                                        <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange("")} className="text-red-500 hover:text-red-600 hover:bg-red-50">Remove</Button>
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => handleFileUpload('resumeUrl')}
                                                        className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-black/20 cursor-pointer transition-all duration-300 group"
                                                    >
                                                        <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                            <Upload className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                                                        </div>
                                                        <h3 className="text-sm font-semibold text-gray-900">Upload your Resume</h3>
                                                        <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
                                                    </div>
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <FormField control={form.control} name="coverLetterUrl" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Cover Letter (Optional)</FormLabel>
                                                <FormControl>
                                                    {field.value ? (
                                                        <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                            <span className="text-sm text-gray-700 truncate ml-2">cover_letter.pdf</span>
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange("")} className="text-red-500 h-8 w-8 p-0"><span className="sr-only">Remove</span>×</Button>
                                                        </div>
                                                    ) : (
                                                        <div onClick={() => handleFileUpload('coverLetterUrl')} className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer transition-colors bg-white">
                                                            <p className="text-sm text-gray-600 font-medium">+ Upload Cover Letter</p>
                                                        </div>
                                                    )}
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="portfolioUrl" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Portfolio Link (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://dribbble.com/..." {...field} className="h-[58px] bg-white border-dashed border-gray-300 focus:border-solid focus:ring-0 focus:border-black transition-all" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Screening */}
                            {currentStep === 3 && (
                                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                                    <FormField control={form.control} name="reasonForApplying" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Why are you applying for this role?</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us what motivates you..." {...field} className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 resize-none transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="skillExperience" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Relevant Skills & Experience</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Highlight your key skills..." {...field} className="min-h-[100px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 resize-none transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="notes" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Additional Notes</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Anything else we should know?" {...field} className="min-h-[80px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 resize-none transition-all" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            )}

                            {/* Footer Actions */}
                            <div className="flex justify-between items-center pt-6 border-t border-gray-100 mt-8">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={currentStep === 0 ? () => onOpenChange(false) : handlePrev}
                                    className="text-gray-500 hover:text-black hover:bg-gray-100"
                                >
                                    {currentStep === 0 ? "Cancel" : "Back"}
                                </Button>

                                {currentStep < STEPS.length - 1 ? (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-black text-white hover:bg-zinc-800 px-8 h-11 rounded-lg shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 font-medium"
                                    >
                                        Next Step
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="bg-black text-white hover:bg-zinc-800 px-8 h-11 rounded-lg shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 font-medium"
                                    >
                                        {mode === "add" ? "Submit Application" : "Save Changes"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
