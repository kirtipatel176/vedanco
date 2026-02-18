"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Job {
    _id?: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    [key: string]: unknown;
}

interface FeaturedJobsProps {
    jobs?: Job[];
}

export function FeaturedJobs({ jobs = [] }: FeaturedJobsProps) {
    if (!jobs || jobs.length === 0) return null;

    return (
        <section className="bg-white py-24 md:py-32 relative overflow-hidden">
            {/* Background Elements - Subtle Gradient for Light Theme */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-accent-violet/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="space-y-4">
                        <span className="text-accent-blue font-space-mono text-xs tracking-widest uppercase">
                            — Join The Team
                        </span>
                        <h2 className="font-display font-bold text-4xl md:text-5xl text-black">
                            Featured <span className="text-zinc-400">Opportunities</span>
                        </h2>
                    </div>
                    <Link href="/careers">
                        <Button
                            variant="outline"
                            className="border-black/10 text-black hover:bg-black/5 hover:border-black/20 h-10 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
                        >
                            View All Positions
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {jobs.map((job, index) => (
                        <motion.div
                            key={job._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={`/careers/${job.slug}`} className="block h-full">
                                <div className={cn(
                                    "bg-white rounded-2xl border border-black/5 p-8",
                                    "hover:border-accent-blue/30 transition-all duration-300 group h-full flex flex-col justify-between",
                                    "hover:shadow-xl hover:shadow-accent-blue/5 shadow-sm"
                                )}>
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="uppercase tracking-wider text-[10px] bg-black/5 border-black/5 text-black/70">
                                                {job.department}
                                            </Badge>
                                            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-zinc-400 group-hover:text-accent-blue group-hover:bg-accent-blue/10 transition-colors">
                                                <ExternalLink size={14} />
                                            </div>
                                        </div>

                                        <h3 className="font-display font-bold text-2xl text-black group-hover:text-accent-blue transition-colors line-clamp-2">
                                            {job.title}
                                        </h3>

                                        <div className="flex flex-col gap-3 text-zinc-500 text-xs font-space-mono uppercase tracking-wide">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={14} className="text-zinc-400" />
                                                <span>{job.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={14} className="text-zinc-400" />
                                                <span>{job.type}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-black/5 flex items-center justify-between">
                                        <span className="text-sm font-bold text-black group-hover:text-accent-blue transition-colors">
                                            View & Apply
                                        </span>
                                        <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center group-hover:border-accent-blue/50 group-hover:bg-accent-blue/10 transition-colors">
                                            <ArrowRight size={14} className="text-black group-hover:text-accent-blue transition-colors -rotate-45 group-hover:rotate-0 transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
