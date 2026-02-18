"use client";

import { portfolioData } from "@/data/portfolio-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const projects = Object.values(portfolioData);
const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

export default function PortfolioPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(p => p.category === selectedCategory);

    return (
        <main className="bg-black min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-20 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-6 border-white/20 text-white/60 uppercase tracking-widest px-4 py-1.5">
                            Our Work
                        </Badge>
                        <h1 className="font-display font-black text-5xl md:text-7xl text-white tracking-tighter mb-6">
                            Selected <span className="text-zinc-500">Case Studies</span>
                        </h1>
                        <p className="font-dm-sans text-lg text-zinc-400">
                            A curated collection of projects where we helped ambitious brands build their digital future.
                        </p>
                    </motion.div>
                </div>

                {/* Filters */}
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={cn(
                                "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border",
                                selectedCategory === category
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link href={`/portfolio/${project.id}`} className="block h-full">
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-zinc-900">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                                    <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <ArrowUpRight className="text-white" size={20} />
                                    </div>

                                    <div className="absolute bottom-6 left-6">
                                        <Badge className="bg-white/10 hover:bg-white/20 text-white border-none mb-2">
                                            {project.year}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-display font-bold text-2xl text-white group-hover:text-zinc-300 transition-colors">
                                            {project.title}
                                        </h3>
                                        <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-1.5">
                                            {project.client}
                                        </span>
                                    </div>
                                    <p className="text-zinc-400 text-sm line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
