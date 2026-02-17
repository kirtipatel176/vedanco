"use client";

import { portfolioData } from "@/lib/portfolio-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const projects = Object.values(portfolioData).slice(0, 10);

export function PortfolioSection() {
    return (
        <section className="bg-black py-24 md:py-32">
            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-20 text-center max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-6 border-white/20 text-white/60 uppercase tracking-widest px-4 py-1.5">
                            Our Work
                        </Badge>
                        <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tighter mb-6">
                            Selected <span className="text-zinc-500">Case Studies</span>
                        </h2>
                        <p className="font-dm-sans text-lg text-zinc-400">
                            A curated collection of projects where we helped ambitious brands build their digital future.
                        </p>
                    </motion.div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <Link
                                href={project.website || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block h-full"
                            >
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

                {/* View All Button */}
                <div className="flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                        >
                            View All Projects <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
