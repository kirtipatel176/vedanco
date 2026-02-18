"use client";

import { useRef } from "react";

import { motion } from "framer-motion";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);



    return (
        <section
            ref={containerRef}
            className="relative h-[100svh] w-full overflow-hidden bg-bg-primary flex flex-col justify-end pb-12 md:pb-24"
        >
            {/* Cosmic Background - CSS Composition */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                {/* 1. Starfield / Noise Texture */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay" />

                {/* 2. Central Flash (The Star) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-white rounded-full blur-[120px] opacity-20 animate-pulse-fast" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-accent-blue/40 rounded-full blur-[80px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10vw] h-[10vw] max-w-[150px] max-h-[150px] bg-white rounded-full blur-[40px] z-10 animate-pulse" />

                {/* 3. The Asteroid Ring (Simulated with Borders & Gradients) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] border border-white/10 rounded-full animate-spin-slow opacity-60">
                    {/* Particles on the ring (simulated) */}
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/40 rounded-full blur-[1px]" />
                    <div className="absolute bottom-1/4 right-[10%] w-3 h-3 bg-accent-blue/30 rounded-full blur-[2px]" />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] border border-dashed border-white/5 rounded-full animate-spin-reverse-slow opacity-40" />

                {/* 4. Vignette / Depth Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 h-full flex flex-col">
                {/* Top Content (Quote/Tagline) - Positioned absolutely or flex-start */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-32 md:mt-48 max-w-sm"
                >
                    <p className="font-dm-sans text-sm md:text-base text-zinc-400 leading-relaxed">
                        &quot;Vedanco isn&apos;t just an agency. It&apos;s an <span className="text-white italic font-playfair">intelligence engine</span> designed to scale global enterprises through precision automation and strategic branding.&quot;
                    </p>
                </motion.div>

                {/* Bottom Content (Headline & CTA) */}
                <div className="mt-auto flex flex-col md:flex-row items-end justify-between gap-12">
                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter text-white uppercase max-w-4xl"
                    >
                        Intelligent <br />
                        <span className="text-zinc-500">Future</span> <br />
                        Scaling
                    </motion.h1>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mb-2 md:mb-4"
                    >
                        <Link href="/contact">
                            <button className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center transition-transform hover:scale-105">
                                <span className="absolute text-[10px] font-bold uppercase tracking-widest text-black top-8">
                                    Start Build
                                </span>
                                <ArrowUpRight
                                    size={48}
                                    className="text-black transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    strokeWidth={1.5}
                                />
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </motion.div>
        </section>
    );
}
