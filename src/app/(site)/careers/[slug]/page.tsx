import { getJobBySlug } from "@/lib/actions/job.actions";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Calendar, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import ApplicationForm from "@/components/careers/application-form";

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) {
        notFound();
    }

    return (
        <div className="bg-bg-light min-h-screen pb-24">
            {/* Header */}
            <div className="bg-bg-primary pt-32 pb-16 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto relative z-10">
                    <Link href="/careers" className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </Link>

                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-end">
                        <div>
                            <div className="flex flex-wrap gap-3 mb-4">
                                <Badge variant="outline" className="border-accent-gold/30 text-accent-gold uppercase tracking-wider">
                                    {job.department}
                                </Badge>
                                {job.status === 'closed' && (
                                    <Badge variant="destructive" className="uppercase tracking-wider">
                                        Closed
                                    </Badge>
                                )}
                            </div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                                {job.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent-gold" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-4 h-4 text-accent-gold" />
                                    {job.type}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-accent-gold" />
                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>

                        {job.status === 'active' && (
                            <Button size="lg" className="bg-accent-gold text-black hover:bg-accent-gold-hover font-bold shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                                Apply for this Position
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Job Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Description */}
                        <section>
                            <h2 className="font-display font-bold text-2xl text-bg-primary mb-6 flex items-center gap-3">
                                <span className="w-8 h-1 bg-accent-gold rounded-full" /> About the Role
                            </h2>
                            <div className="prose prose-lg text-gray-600 max-w-none whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </section>

                        {/* Requirements */}
                        {job.requirements && job.requirements.length > 0 && (
                            <section>
                                <h2 className="font-display font-bold text-2xl text-bg-primary mb-6 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-accent-gold rounded-full" /> Requirements
                                </h2>
                                <ul className="grid gap-4">
                                    {job.requirements.map((req: string, i: number) => (
                                        <li key={`${i}-${req.substring(0, 10)}`} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <CheckCircle2 className="w-6 h-6 text-accent-gold shrink-0 mt-0.5" />
                                            <span className="text-gray-700">{req}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl sticky top-28">
                            <h3 className="font-display font-bold text-xl text-bg-primary mb-2">
                                Apply Now
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">
                                Interested in this role? Scroll down to submit your application.
                            </p>
                            <Button asChild className="w-full bg-accent-gold text-black hover:bg-accent-gold-hover font-bold">
                                <Link href="#apply">Apply Now</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Form Section - Full Width */}
            <div id="apply" className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <Badge variant="outline" className="mb-4 border-black/10 text-gray-600 bg-gray-50 px-4 py-1 text-sm uppercase tracking-widest">
                                Application Process
                            </Badge>
                            <h2 className="font-display font-bold text-4xl md:text-5xl text-bg-primary mb-6 tracking-tight">
                                Ready to Join Us?
                            </h2>
                            <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                                Start your journey effectively. We can&apos;t wait to see what you bring to the table.
                            </p>
                        </div>
                        <ApplicationForm jobId={job._id} jobTitle={job.title} />
                    </div>
                </div>
            </div>
        </div>
    );
}
