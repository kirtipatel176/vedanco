"use client";

import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
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
import { Upload, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { trackUpload } from "@/lib/actions/upload.actions";
import { checkApplicationExists } from "@/lib/actions/application.actions";
import { IKContext, IKUpload } from "imagekitio-react";
import Link from "next/link";

// Define schema to match Application model
const formSchema = z.object({
    // Personal
    fullName: z.string().min(2, "Full Name is required"),
    email: z.email("Invalid email address"),
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

    profileImageUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ApplicationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: FormValues) => void;
    initialValues?: Partial<FormValues> | null;
    mode: "add" | "edit";
    jobId?: string;
    isJobClosed?: boolean;
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
    jobId,
    isJobClosed = false,
}: Readonly<ApplicationDialogProps>) {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema) as Resolver<FormValues>,
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
            notes: "",
            profileImageUrl: "",
        },
    });

    const [hasAppliedAlready, setHasAppliedAlready] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [uploadingResume, setUploadingResume] = useState(false);
    const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);
    const [uploadingProfileImage, setUploadingProfileImage] = useState(false);

    // ImageKit Authenticator
    const authenticator = async () => {
        try {
            const response = await fetch("/api/upload/auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
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
        setUploadingProfileImage(false);
        toast.error("File upload failed. Please try again.");
    };

    const onSuccessResume = async (res: { url: string; fileId: string; filePath: string }) => {
        setUploadingResume(false);
        form.setValue("resumeUrl", res.url);
        form.trigger("resumeUrl");
        toast.success("Resume uploaded successfully!");
        try { await trackUpload(res.fileId, res.url, res.filePath, 'resume'); } catch (e) { console.error(e); }
    };

    const onSuccessCoverLetter = async (res: { url: string; fileId: string; filePath: string }) => {
        setUploadingCoverLetter(false);
        form.setValue("coverLetterUrl", res.url);
        toast.success("Cover letter uploaded successfully!");
        try { await trackUpload(res.fileId, res.url, res.filePath, 'cover_letter'); } catch (e) { console.error(e); }
    };

    const onSuccessProfileImage = async (res: { url: string; fileId: string; filePath: string }) => {
        setUploadingProfileImage(false);
        form.setValue("profileImageUrl", res.url);
        toast.success("Profile image uploaded successfully!");
        try { await trackUpload(res.fileId, res.url, res.filePath, 'profile_image'); } catch (e) { console.error(e); }
    };

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
                    profileImageUrl: "",
                });
            }
            setCurrentStep(0);

            // Check if application exists
            if (user?.email && jobId) {
                setCheckingStatus(true);
                checkApplicationExists(jobId, user.email).then((res) => {
                    if (res.success && res.exists) {
                        setHasAppliedAlready(true);
                    } else {
                        setHasAppliedAlready(false);
                    }
                    setCheckingStatus(false);
                });
            } else {
                setHasAppliedAlready(false);
                setCheckingStatus(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, user, jobId]);

    // Validation for steps
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


    const handleSubmit = async (values: FormValues) => {
        try {
            await onSubmit(values);
            // Success handling is done in parent or onSubmit prop
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit application. Please try again.");
        }
    };

    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/demo";
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "public_key_test";

    return (
        <IKContext publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[700px] bg-white text-gray-900 max-h-[90vh] overflow-y-auto font-sans p-0 gap-0 rounded-xl shadow-2xl border border-gray-100">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                        <DialogHeader>
                            <DialogTitle className="text-2xl tracking-tight text-gray-900 font-bold mb-1">
                                {mode === "add" ? "Submit Application" : "Edit Application"}
                            </DialogTitle>
                            <DialogDescription className="text-gray-500 text-sm mt-1 mb-4">
                                {checkingStatus ? "Checking application status..." : hasAppliedAlready ? "You have already applied for this position." : isJobClosed ? "This position is no longer accepting applications." : "Please fill out the form below."}
                            </DialogDescription>
                        </DialogHeader>

                        {checkingStatus ? (
                            <div className="py-12 flex flex-col items-center justify-center space-y-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                                <p className="text-gray-500 text-sm">Checking status...</p>
                            </div>
                        ) : hasAppliedAlready ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                    <CheckCircle className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Application Submitted</h3>
                                <p className="text-gray-500 max-w-sm">
                                    You have already applied for this position. We will be in touch soon regarding the next steps.
                                </p>
                                <Button className="mt-4 bg-black text-white px-8 rounded-full hover:bg-gray-800" asChild>
                                    <Link href="/dashboard/applications" onClick={() => onOpenChange(false)}>View My Applications</Link>
                                </Button>
                            </div>
                        ) : isJobClosed ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">Position Closed</h3>
                                <p className="text-gray-500 max-w-sm">
                                    This position is no longer accepting new applications.
                                </p>
                                <Button variant="outline" className="mt-4" onClick={() => onOpenChange(false)}>
                                    Close
                                </Button>
                            </div>
                        ) : (
                            <>
                                {/* Modern Steps Indicator */}
                                <div className="mt-6 flex items-center justify-between relative">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2" />
                                    {STEPS.map((step, index) => {
                                        const isCompleted = index < currentStep;
                                        const isCurrent = index === currentStep;

                                        let stepClassName = 'bg-white border-2 border-gray-200 text-gray-400';
                                        if (isCompleted) {
                                            stepClassName = 'bg-black text-white ring-4 ring-white';
                                        } else if (isCurrent) {
                                            stepClassName = 'bg-white border-2 border-black text-black ring-4 ring-black/5 shadow-lg scale-110';
                                        }

                                        return (
                                            <div key={step.id} className="flex flex-col items-center bg-white px-2 z-10">
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${stepClassName}`}
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
                            </>
                        )}
                    </div>

                    <div className="p-6">
                        {checkingStatus || hasAppliedAlready || isJobClosed ? null : (
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
                                                        <div className="relative">
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
                                                                <div className="relative">
                                                                    {uploadingResume ? (
                                                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-gray-50 flex items-center justify-center">
                                                                            <p className="text-sm font-medium text-gray-600">Uploading...</p>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <label htmlFor="dashboard-resume" className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:bg-gray-50 hover:border-black/20 cursor-pointer transition-all duration-300 group block">
                                                                                <div className="w-12 h-12 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                                                    <Upload className="w-6 h-6 text-gray-400 group-hover:text-black transition-colors" />
                                                                                </div>
                                                                                <h3 className="text-sm font-semibold text-gray-900">Upload your Resume</h3>
                                                                                <p className="text-xs text-gray-500 mt-1">PDF, DOCX up to 5MB</p>
                                                                            </label>
                                                                            <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                                                                                <IKUpload
                                                                                    id="dashboard-resume"
                                                                                    fileName="resume.pdf"
                                                                                    validateFile={(file: File) => file.size < 5000000}
                                                                                    useUniqueFileName={true}
                                                                                    onError={onError}
                                                                                    onSuccess={onSuccessResume}
                                                                                    onUploadStart={() => setUploadingResume(true)}
                                                                                />
                                                                            </div>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <FormField control={form.control} name="coverLetterUrl" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Cover Letter (Optional)</FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                {field.value ? (
                                                                    <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                                        <span className="text-sm text-gray-700 truncate ml-2">cover_letter.pdf</span>
                                                                        <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange("")} className="text-red-500 h-8 w-8 p-0"><span className="sr-only">Remove</span>×</Button>
                                                                    </div>
                                                                ) : (
                                                                    <div className="relative">
                                                                        {uploadingCoverLetter ? (
                                                                            <div className="border rounded-lg p-4 text-center bg-gray-50 text-gray-500 text-sm">Uploading...</div>
                                                                        ) : (
                                                                            <>
                                                                                <label htmlFor="dashboard-cover-letter" className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer block bg-white hover:border-black/20 transition-all">
                                                                                    <p className="text-sm text-gray-600 font-medium">+ Upload Cover Letter</p>
                                                                                </label>
                                                                                <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                                                                                    <IKUpload
                                                                                        id="dashboard-cover-letter"
                                                                                        fileName="cover_letter.pdf"
                                                                                        validateFile={(file: File) => file.size < 5000000}
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
                                                        <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Portfolio Link (Optional)</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="https://dribbble.com/..." {...field} className="h-[58px] bg-white border-dashed border-gray-300 focus:border-solid focus:ring-0 focus:border-black transition-all" />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>

                                            <FormField control={form.control} name="profileImageUrl" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Profile Image (Optional)</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            {field.value ? (
                                                                <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                                                    <div className="flex items-center gap-2">
                                                                        <img src={field.value} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                                                                        <span className="text-sm text-gray-700 truncate ml-2">Image Uploaded</span>
                                                                    </div>
                                                                    <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange("")} className="text-red-500 h-8 w-8 p-0"><span className="sr-only">Remove</span>×</Button>
                                                                </div>
                                                            ) : (
                                                                <div className="relative">
                                                                    {uploadingProfileImage ? (
                                                                        <div className="border rounded-lg p-4 text-center bg-gray-50 text-gray-500 text-sm">Uploading...</div>
                                                                    ) : (
                                                                        <>
                                                                            <label htmlFor="dashboard-profile-image" className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 cursor-pointer block bg-white hover:border-black/20 transition-all">
                                                                                <p className="text-sm text-gray-600 font-medium">+ Upload Profile Image</p>
                                                                            </label>
                                                                            <div className="absolute opacity-0 w-0 h-0 overflow-hidden">
                                                                                <IKUpload
                                                                                    id="dashboard-profile-image"
                                                                                    fileName="profile_image.jpg"
                                                                                    validateFile={(file: File) => file.size < 5000000}
                                                                                    useUniqueFileName={true}
                                                                                    onError={onError}
                                                                                    onSuccess={onSuccessProfileImage}
                                                                                    onUploadStart={() => setUploadingProfileImage(true)}
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
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </IKContext>
    );
}
