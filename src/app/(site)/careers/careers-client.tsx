"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Search, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


const departments = ["All", "IT Services", "AI & Automation", "Digital Marketing", "Personal Branding", "US Recruitment", "Podcast Production"];


interface Job {
    _id?: string;
    id?: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    type: string;
    status?: string;
    description?: string;
    createdAt?: string | Date;
}

interface CareersClientProps {
    initialJobs: Job[];
}

export default function CareersClient({ initialJobs }: CareersClientProps) {
    const [selectedDept, setSelectedDept] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedLocation, setSelectedLocation] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredJobs = initialJobs.filter((job) => {
        const matchDept = selectedDept === "All" || job.department === selectedDept;
        const matchType = selectedType === "All" || job.type === selectedType;
        const matchLoc = selectedLocation === "All" || job.location.includes(selectedLocation);
        const matchSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchDept && matchType && matchLoc && matchSearch;
    });

    return (
        <div className="bg-bg-light min-h-screen pb-24">
            {/* Hero */}
            <section className="bg-bg-primary pt-32 pb-24 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                <div className="container mx-auto relative z-10">
                    <Badge variant="outline" className="border-accent-gold/30 text-accent-gold font-space-mono text-xs tracking-widest uppercase mb-6 py-1.5 px-3">
                        — We&apos;re Hiring
                    </Badge>
                    <h1 className="font-display font-black text-5xl md:text-7xl text-white mb-6">
                        Work With The Best. <br />
                        <span className="text-accent-gold">Grow With Vedanco.</span>
                    </h1>
                    <p className="font-dm-sans text-text-muted text-lg max-w-2xl mx-auto">
                        Join a team of innovators, creators, and problem solvers building the future of digital services.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-[80px] z-30 bg-bg-primary/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDept(dept)}
                                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold font-space-mono tracking-wide transition-all ${selectedDept === dept
                                        ? "bg-accent-gold text-black"
                                        : "bg-white/5 text-white/60 hover:bg-white/10"
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="relative group flex-1 lg:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-accent-gold transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search roles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-bg-surface border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent-gold/50 transition-colors"
                                />
                            </div>
                            <span className="font-space-mono text-xs text-white/40 whitespace-nowrap">
                                {filteredJobs.length} Positions
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="container mx-auto px-6 py-16">
                {filteredJobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job._id || job.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Link href={`/careers/${job.slug}`}>
                                        <div className="bg-white rounded-xl border border-[#EEEEEE] p-6 hover:-translate-y-1 hover:border-t-4 hover:border-t-accent-gold hover:shadow-xl transition-all duration-300 group h-full flex flex-col justify-between relative overflow-hidden">
                                            <div className="space-y-4 relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <Badge variant="outline" className="bg-bg-primary/5 hover:bg-bg-primary/10 text-bg-primary text-[10px] uppercase tracking-wider">
                                                        {job.department}
                                                    </Badge>
                                                    <span className="text-[10px] font-space-mono text-gray-400 flex items-center gap-1">
                                                        <Clock size={10} /> {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : ""}
                                                    </span>
                                                </div>

                                                <h3 className="font-display font-bold text-xl text-bg-primary group-hover:text-accent-gold transition-colors line-clamp-2">
                                                    {job.title}
                                                </h3>

                                                <p className="text-gray-500 text-sm line-clamp-3">
                                                    {job.description}
                                                </p>

                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                                        <MapPin size={12} /> {job.location}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                                                        <Briefcase size={12} /> {job.type}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center text-sm font-bold text-bg-primary group-hover:text-accent-gold transition-colors border-t border-gray-100 pt-4">
                                                View & Apply <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Search size={24} />
                        </div>
                        <h3 className="font-display font-bold text-xl text-gray-800">No positions found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                        <Button
                            variant="ghost"
                            className="mt-4 text-accent-gold"
                            onClick={() => {
                                setSelectedDept("All");
                                setSelectedType("All");
                                setSelectedLocation("All");
                                setSearchQuery("");
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
