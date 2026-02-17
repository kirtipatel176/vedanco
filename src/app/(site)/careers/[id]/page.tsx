import { jobsData } from "@/lib/jobs-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Briefcase, Calendar, DollarSign, Share2, Upload } from "lucide-react";
import ApplicationForm from "@/components/careers/application-form";
import ShareButton from "@/components/careers/share-button";

export async function generateStaticParams() {
    return jobsData.map((job) => ({
        id: job.id,
    }));
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const job = jobsData.find((j) => j.id === id);

    if (!job) {
        notFound();
    }

    return (
        <div className="bg-bg-light min-h-screen pb-24">
            {/* Hero */}
            <section className="bg-bg-primary pt-32 pb-20 px-6 relative">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="space-y-4">
                            <Badge variant="outline" className="border-accent-gold/30 text-accent-gold font-space-mono text-xs tracking-widest uppercase py-1.5 px-3">
                                {job.department}
                            </Badge>
                            <h1 className="font-display font-black text-4xl md:text-5xl text-white leading-tight">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-white/60 font-space-mono text-sm">
                                <div className="flex items-center gap-2"><MapPin size={14} /> {job.location}</div>
                                <div className="flex items-center gap-2"><Briefcase size={14} /> {job.type}</div>
                                <div className="flex items-center gap-2"><Calendar size={14} /> Posted {job.postedDate}</div>
                            </div>
                        </div>
                        <Button size="lg" className="bg-accent-gold hover:bg-accent-gold/90 text-black font-bold rounded-full px-8">
                            Apply Now
                        </Button>
                    </div>
                </div>
            </section>

            <div className="container mx-auto max-w-5xl px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <h2 className="font-display font-bold text-2xl mb-6 text-bg-primary">About the Role</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {job.description}
                            </p>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-xl mb-6 text-bg-primary">Key Responsibilities</h3>
                            <ul className="space-y-4">
                                {job.responsibilities.map((resp, i) => (
                                    <li key={i} className="flex gap-4 items-start text-gray-600">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0" />
                                        <span className="leading-relaxed">{resp}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-xl mb-6 text-bg-primary">Requirements</h3>
                            <ul className="space-y-4">
                                {job.requirements.map((req, i) => (
                                    <li key={i} className="flex gap-4 items-start text-gray-600">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-gold flex-shrink-0" />
                                        <span className="leading-relaxed">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h3 className="font-display font-bold text-xl mb-6 text-bg-primary">Nice to Have</h3>
                            <ul className="space-y-4">
                                {job.niceToHave.map((item, i) => (
                                    <li key={i} className="flex gap-4 items-start text-gray-600">
                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Application Form */}
                        <ApplicationForm />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                                <h4 className="font-bold text-bg-primary mb-4">Job Overview</h4>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
                                        <Calendar size={16} className="text-accent-gold" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-400 uppercase font-bold">Posted</p>
                                            <p>{job.postedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
                                        <Briefcase size={16} className="text-accent-gold" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-400 uppercase font-bold">Type</p>
                                            <p>{job.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
                                        <MapPin size={16} className="text-accent-gold" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-400 uppercase font-bold">Location</p>
                                            <p>{job.location}</p>
                                        </div>
                                    </div>
                                    {job.salaryRange && (
                                        <div className="flex items-center gap-3 text-sm text-gray-600 pb-3 border-b border-gray-100">
                                            <DollarSign size={16} className="text-accent-gold" />
                                            <div className="flex-1">
                                                <p className="text-xs text-gray-400 uppercase font-bold">Salary Estimate</p>
                                                <p>{job.salaryRange}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="mt-6 pt-2">
                                    <ShareButton title={`Job Opportunity: ${job.title} at Vedanco`} />
                                </div>
                            </div>

                            <div className="bg-bg-primary rounded-xl p-6 text-white text-center">
                                <h4 className="font-bold mb-2">Have Questions?</h4>
                                <p className="text-sm text-white/60 mb-4">Contact our recruitment team for more information.</p>
                                <a href="mailto:careers@vedanco.com" className="text-accent-gold text-sm font-bold hover:underline">
                                    careers@vedanco.com
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
