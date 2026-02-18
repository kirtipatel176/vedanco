"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, CheckCircle, Loader2, AlertCircle, FileText, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import { useState, useEffect, useTransition, useRef } from "react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createApplication } from "@/lib/actions/application.actions";
import { trackUpload } from "@/lib/actions/upload.actions";
import { IKContext, IKUpload } from "imagekitio-react";
import { apiFetch } from "@/services/api";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Define schema
const formSchema = z.object({
    fullName: z.string().min(2, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(5, "Phone number is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    experienceYears: z.string().min(1, "Experience is required"),
    currentTitle: z.string().optional(),
    currentCompany: z.string().optional(),
    expectedSalary: z.string().optional(),
    startDate: z.string().optional(),
    resumeUrl: z.string().min(1, "Resume is required"),
    coverLetterUrl: z.string().optional(),
    portfolioUrl: z.string().optional(),
    reasonForApplying: z.string().optional(),
    skillExperience: z.string().optional(),
});

// Define form steps
const STEPS = [
    { id: 'personal', title: 'Personal Details' },
    { id: 'professional', title: 'Professional Info' },
    { id: 'documents', title: 'Documents' },
    { id: 'screening', title: 'Screening' }
];

interface ApplicationFormProps {
    jobId?: string;
    jobTitle?: string;
}

export default function ApplicationForm({ jobId: propJobId, jobTitle }: ApplicationFormProps) {
    const { isAuthenticated, user, isLoading: authLoading } = useAuth();
    const pathname = usePathname();

    const [currentStep, setCurrentStep] = useState(0);
    const [hasApplied, setHasApplied] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);

    // Refs for file inputs
    const resumeInputRef = useRef<HTMLInputElement>(null);
    const coverLetterInputRef = useRef<HTMLInputElement>(null);

    // Determine Job ID safely
    const jobId = propJobId || (pathname?.split('/').filter(Boolean).pop()) || "general-application";

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
        },
    });

    // ImageKit Authenticator
    const authenticator = async () => {
        try {
            const data = await apiFetch("/api/uploads/auth");
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error: unknown) {
            console.error("ImageKit Auth Error:", error);
            const message = error instanceof Error ? error.message : "Authentication failed";
            throw new Error(`Authentication request failed: ${message}`);
        }
    };

    const onError = (err: { message?: string }) => {
        console.error("Upload Error:", err);
        setUploadingResume(false);
        setUploadingCoverLetter(false);
        toast.error("File upload failed. Please try again.");
    };

    const onSuccessResume = async (res: { url: string; fileId: string; filePath: string }) => {
        console.log("Upload Success:", res);
        setUploadingResume(false);
        form.setValue("resumeUrl", res.url);
        form.trigger("resumeUrl");
        toast.success("Resume uploaded successfully!");

        // Track for cleanup
        try {
            await trackUpload(res.fileId, res.url, res.filePath, 'resume');
        } catch (e) {
            console.error("Failed to track resume upload", e);
        }
    };

    const onSuccessCoverLetter = async (res: { url: string; fileId: string; filePath: string }) => {
        console.log("Upload Success:", res);
        setUploadingCoverLetter(false);
        form.setValue("coverLetterUrl", res.url);
        toast.success("Cover letter uploaded successfully!");

        // Track for cleanup
        try {
            await trackUpload(res.fileId, res.url, res.filePath, 'cover_letter');
        } catch (e) {
            console.error("Failed to track cover letter upload", e);
        }
    };

    // Determine default values from user
    useEffect(() => {
        if (isAuthenticated && user) {
            form.reset({
                fullName: user.name || "",
                email: user.email || "",
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
            });
        }
    }, [isAuthenticated, user, form]);

    const validateStep = async (stepIndex: number) => {
        const fields = getFieldsForStep(stepIndex);
        const result = await form.trigger(fields as Parameters<typeof form.trigger>[0]);
        return result;
    };

    const getFieldsForStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0: return ['fullName', 'email', 'phone', 'city', 'country'];
            case 1: return ['experienceYears'];
            case 2: return ['resumeUrl'];
            case 3: return [];
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

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        startTransition(async () => {
            try {
                console.log("Submitting application with values:", values);
                const result = await createApplication({
                    ...values,
                    jobId,
                    jobTitle,
                    status: 'APPLIED'
                });

                if (result.success) {
                    setHasApplied(true);
                    toast.success(result.message);
                } else {
                    if (result.error === "Duplicate") {
                        // Show success state but with duplicate message
                        toast.error(result.message);
                        setHasApplied(true);
                    } else {
                        toast.error(result.message || "Failed to submit application. Please try again.");
                    }
                }
            } catch (error: unknown) {
                console.error("Submission error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        });
    };

    const onInvalid = (errors: Record<string, unknown>) => {
        console.error("Form validation errors:", errors);
        const errorFields = Object.keys(errors);
        if (errorFields.length > 0) {
            toast.error(`Please check the following fields: ${errorFields.join(", ")}`);
        }
    };

    if (authLoading) {
        return <div className="p-12 text-center text-gray-400 flex items-center justify-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Loading application form...</div>;
    }

    if (!isAuthenticated) {
        return (
            <section className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm mt-12 scroll-mt-32 text-center" id="apply">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-display font-bold text-2xl mb-3 text-gray-900">Sign in to Apply</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                    You must be signed in to submit an application for this position. Please sign in or create an account to continue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-black text-white hover:bg-zinc-800 font-medium h-12 rounded-lg px-8 shadow-lg shadow-black/10 transition-transform hover:-translate-y-0.5">
                        <Link href={`/signin?redirect=${encodeURIComponent(pathname)}`}>
                            Sign In
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border-gray-200 text-gray-700 hover:bg-gray-50 font-medium h-12 rounded-lg px-8 transition-transform hover:-translate-y-0.5">
                        <Link href={`/signup?redirect=${encodeURIComponent(pathname)}`}>
                            Create Account
                        </Link>
                    </Button>
                </div>
            </section>
        );
    }

    if (hasApplied) {
        return (
            <section className="bg-green-50/50 rounded-2xl p-12 border border-green-100 mt-12 scroll-mt-32 text-center relative overflow-hidden" id="apply">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-3 text-gray-900">Application Submitted</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    You have successfully applied for {jobTitle ? <span className="font-semibold text-gray-900">{jobTitle}</span> : "this role"}. We will review your application and get back to you soon.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild variant="outline" className="border-gray-200 text-gray-700 hover:bg-white hover:border-gray-300 hover:text-black font-medium px-8 h-11">
                        <Link href="/dashboard/applications">View My Applications</Link>
                    </Button>
                    <Button asChild className="bg-black text-white hover:bg-zinc-800 px-8 h-11">
                        <Link href="/careers">Browse More Jobs</Link>
                    </Button>
                </div>
            </section>
        );
    }

    // Default ImageKit config placeholders if env vars are missing to prevent crash
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/demo";
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "public_key_test";

    return (
        <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <section className="bg-white rounded-3xl border border-gray-100 shadow-2xl overflow-hidden mt-12 scroll-mt-32 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]" id="apply">
                <div className="bg-gray-50/80 px-10 py-10 border-b border-gray-100 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display font-bold text-3xl text-gray-900 tracking-tight">Apply for this Position</h3>
                        <span className="text-sm font-semibold text-gray-600 bg-white px-4 py-1.5 rounded-full border border-gray-200 shadow-sm">
                            Step {currentStep + 1} of {STEPS.length}
                        </span>
                    </div>
                    <p className="text-gray-500 text-lg">Please fill out the form below to submit your application.</p>

                    {/* Modern Steps Indicator */}
                    <div className="mt-10 flex items-center justify-between relative max-w-3xl mx-auto">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 rounded-full" />
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-black -z-10 transform -translate-y-1/2 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                        />
                        {STEPS.map((step, index) => {
                            const isCompleted = index < currentStep;
                            const isCurrent = index === currentStep;

                            return (
                                <div key={step.id} className="flex flex-col items-center bg-gray-50 px-2 z-10">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-500 ${isCompleted
                                            ? 'bg-black text-white ring-4 ring-white shadow-md'
                                            : isCurrent
                                                ? 'bg-white border-2 border-black text-black ring-4 ring-black/5 shadow-lg scale-110'
                                                : 'bg-white border-2 border-gray-200 text-gray-400'
                                            }`}
                                    >
                                        {isCompleted ? <CheckCircle className="w-4 h-4" /> : index + 1}
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-wider font-semibold mt-2 transition-colors duration-300 hidden sm:block ${isCurrent ? 'text-black translate-y-0' : 'text-gray-400 translate-y-0.5'}`}>
                                        {step.title}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-10 bg-white min-h-[400px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-10">
                            {/* Step 1: Personal Details */}
                            {currentStep === 0 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 ease-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Full Name <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="John Doe" {...field} className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="john@example.com" {...field} className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 (555) 000-0000" {...field} className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="city" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">City <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="New York" {...field} className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="country" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Country <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="USA" {...field} className="h-12 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Professional Info */}
                            {currentStep === 1 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 ease-out">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="experienceYears" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Years of Experience <span className="text-red-500">*</span></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="e.g. 5" type="number" {...field} className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="currentTitle" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Current Job Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Product Manager" {...field} className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <FormField control={form.control} name="currentCompany" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Current Company</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Acme Inc" {...field} className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="expectedSalary" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Expected Salary</FormLabel>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                        <span className="text-gray-500 font-medium text-lg">₹</span>
                                                    </div>
                                                    <FormControl>
                                                        <Input placeholder="e.g. 12,00,000" {...field} className="h-14 pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                    </FormControl>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="startDate" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Available Start Date</FormLabel>
                                                <FormControl>
                                                    <Input type="date" {...field} className="h-14 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black hover:border-gray-300 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Documents */}
                            {currentStep === 2 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 ease-out">
                                    <FormField control={form.control} name="resumeUrl" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Upload Resume (Required) <span className="text-red-500">*</span></FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    {field.value ? (
                                                        <div className="flex items-center justify-between p-6 bg-green-50/50 border border-green-200 rounded-xl group transition-all hover:border-green-300 hover:shadow-sm">
                                                            <div className="flex items-center gap-4 overflow-hidden">
                                                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                                                                    <FileText className="w-6 h-6" />
                                                                </div>
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="text-base font-semibold text-gray-900 truncate">Resume Uploaded</span>
                                                                    <span className="text-sm text-green-600 flex items-center gap-1 font-medium">
                                                                        <CheckCircle className="w-4 h-4" /> Ready for submission
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        field.onChange("");
                                                                        if (resumeInputRef.current) resumeInputRef.current.value = "";
                                                                    }}
                                                                    className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-10 w-10 p-0"
                                                                >
                                                                    <X className="w-5 h-5" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="relative group">
                                                            <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${uploadingResume ? 'bg-gray-50 border-gray-300 opacity-70' : 'border-gray-200 hover:bg-gray-50 hover:border-black/20 cursor-pointer'}`}>
                                                                {uploadingResume ? (
                                                                    <div className="flex flex-col items-center justify-center py-4">
                                                                        <Loader2 className="w-10 h-10 text-black/50 animate-spin mb-4" />
                                                                        <p className="text-base font-medium text-gray-600">Uploading your resume...</p>
                                                                    </div>
                                                                ) : (
                                                                    <label htmlFor="resume-upload" className="cursor-pointer block">
                                                                        <div className="w-16 h-16 rounded-full bg-gray-100 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                                                                            <Upload className="w-7 h-7 text-gray-400 group-hover:text-black transition-colors" />
                                                                        </div>
                                                                        <h3 className="text-lg font-bold text-gray-900 mb-2">Click to upload your Resume</h3>
                                                                        <p className="text-sm text-gray-500">PDF, DOCX up to 5MB</p>
                                                                    </label>
                                                                )}
                                                            </div>
                                                            <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                                                                <IKUpload
                                                                    id="resume-upload"
                                                                    fileName="resume.pdf"
                                                                    validateFile={(file: File) => file.size < 5000000} // 5MB
                                                                    tags={["resume", "application"]}
                                                                    useUniqueFileName={true}
                                                                    responseFields={["tags"]}
                                                                    onError={onError}
                                                                    onSuccess={onSuccessResume}
                                                                    onUploadStart={() => setUploadingResume(true)}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <FormField control={form.control} name="coverLetterUrl" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Upload Cover Letter (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        {field.value ? (
                                                            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl group hover:border-gray-300 transition-colors">
                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                    <FileText className="w-5 h-5 text-gray-500" />
                                                                    <span className="text-sm text-gray-700 truncate font-medium">Cover Letter Uploaded</span>
                                                                </div>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        field.onChange("");
                                                                        if (coverLetterInputRef.current) coverLetterInputRef.current.value = "";
                                                                    }}
                                                                    className="text-red-500 h-8 w-8 p-0 rounded-full hover:bg-red-50"
                                                                >
                                                                    <X className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div className="relative">
                                                                {uploadingCoverLetter ? (
                                                                    <div className="h-20 border rounded-xl flex items-center justify-center gap-3 bg-gray-50 text-gray-500 text-sm font-medium">
                                                                        <Loader2 className="w-5 h-5 animate-spin" /> Uploading...
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <label
                                                                            htmlFor="cover-letter-upload"
                                                                            className="border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50 cursor-pointer transition-all bg-white flex items-center justify-center gap-3 group h-20 hover:border-gray-400"
                                                                        >
                                                                            <Upload className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                                                                            <p className="text-sm text-gray-600 font-bold group-hover:text-black transition-colors">Upload Cover Letter</p>
                                                                        </label>
                                                                        <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                                                                            <IKUpload
                                                                                id="cover-letter-upload"
                                                                                fileName="cover_letter.pdf"
                                                                                validateFile={(file: File) => file.size < 5000000} // 5MB
                                                                                tags={["cover_letter", "application"]}
                                                                                useUniqueFileName={true}
                                                                                onError={onError}
                                                                                onSuccess={onSuccessCoverLetter}
                                                                                onUploadStart={() => setUploadingCoverLetter(true)}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                            </FormItem>
                                        )} />

                                        <FormField control={form.control} name="portfolioUrl" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Portfolio Link (Optional)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="https://dribbble.com/..." {...field} className="h-20 bg-white border-dashed border-gray-300 focus:border-solid focus:ring-0 focus:border-black transition-all text-black hover:border-gray-400 rounded-xl text-base px-5" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Screening */}
                            {currentStep === 3 && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500 ease-out">
                                    <FormField control={form.control} name="reasonForApplying" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Why are you applying for this role?</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Tell us what motivates you..." {...field} className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 resize-none transition-all text-black p-5 hover:border-gray-300 rounded-xl text-base" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="skillExperience" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 block">Relevant Skills & Experience</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Highlight your key skills..." {...field} className="min-h-[150px] bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 resize-none transition-all text-black p-5 hover:border-gray-300 rounded-xl text-base" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            )}

                            <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={handlePrev}
                                    disabled={currentStep === 0}
                                    className={`text-gray-500 hover:text-black hover:bg-gray-100 px-6 gap-2 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : ''}`}
                                >
                                    <ChevronLeft className="w-4 h-4" /> Previous Step
                                </Button>

                                {currentStep < STEPS.length - 1 ? (
                                    <Button type="button" onClick={handleNext} className="bg-black text-white hover:bg-zinc-800 px-8 h-12 rounded-lg shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 font-medium flex items-center gap-2">
                                        Next Step <ChevronRight className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={isPending} className="bg-black text-white hover:bg-zinc-800 px-8 h-12 rounded-lg shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95 font-medium min-w-[200px]">
                                        {isPending ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : "Submit Application"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </section>
        </IKContext>
    );
}
