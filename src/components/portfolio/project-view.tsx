"use client";

import { ProjectData } from "@/lib/portfolio-data";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface ProjectViewProps {
    project: ProjectData;
}

export default function ProjectView({ project }: ProjectViewProps) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    return (
        <div ref={containerRef} className="bg-black min-h-screen text-white selection:bg-white selection:text-black font-sans">
            {/* Navigation */}
            <nav className="fixed top-24 left-0 w-full z-40 mix-blend-difference px-6 md:px-12 flex justify-between items-center pointer-events-none">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-white hover:opacity-70 transition-opacity uppercase tracking-widest text-xs font-bold pointer-events-auto"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
                <div className="text-white uppercase tracking-widest text-xs font-bold hidden md:block">
                    {project.category}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-screen flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden">
                <motion.div
                    style={{ y }}
                    className="absolute inset-0 z-0 opacity-40"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </motion.div>

                <div className="relative z-10 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="font-display font-black text-6xl md:text-9xl tracking-tighter mb-8 leading-[0.9]">
                            {project.title}
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/20 pt-8 mt-12"
                    >
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Client</span>
                            <span className="text-xl font-medium">{project.client}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Year</span>
                            <span className="text-xl font-medium">{project.year}</span>
                        </div>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">Services</span>
                            <div className="flex flex-wrap gap-2">
                                {project.services.map((s) => (
                                    <Badge key={s} variant="outline" className="border-white/20 text-white rounded-full">
                                        {s}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            <div className="bg-white text-black py-32 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-display font-medium leading-tight mb-24"
                    >
                        "{project.description}"
                    </motion.p>

                    <div className="grid md:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="font-display font-bold text-2xl mb-6 uppercase tracking-widest">The Challenge</h3>
                            <p className="text-lg text-zinc-600 leading-relaxed text-justify">
                                {project.challenge}
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="font-display font-bold text-2xl mb-6 uppercase tracking-widest">The Solution</h3>
                            <p className="text-lg text-zinc-600 leading-relaxed text-justify">
                                {project.solution}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Visual Break / Image */}
            <div className="h-[60vh] relative overflow-hidden">
                <Image
                    src={project.image}
                    alt="Process"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>

            <div className="bg-white text-black py-32 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="font-display font-black text-4xl md:text-6xl mb-12">
                            The Result
                        </h3>
                        <div className="p-12 border border-black/10 rounded-3xl bg-black/5 backdrop-blur-sm">
                            <p className="text-2xl md:text-3xl font-light leading-relaxed">
                                {project.result}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="bg-black py-32 px-6 md:px-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
                    <div>
                        <h4 className="text-white/40 uppercase tracking-widest font-bold mb-4">Next Project</h4>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Let's create something together.</h2>
                    </div>
                    <Link
                        href="/contact"
                        className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-zinc-200 transition-colors"
                    >
                        Start a Project <ArrowUpRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
