"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check } from "lucide-react";

interface SaaSHeroProps {
    title: string;
    description: string;
    accentColor: string;
    partner: string;
    stats: { label: string; value: string }[];
}

export function SaaSHero({ title, description, accentColor, partner, stats }: SaaSHeroProps) {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
            {/* Background Glows */}
            <div
                className="absolute top-0 center w-full h-[500px] opacity-10 blur-[120px] pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${accentColor}, transparent 70%)` }}
            />

            <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <Badge variant="outline" className="mb-8 border-white/10 bg-white/5 backdrop-blur-md px-4 py-2 text-zinc-300 uppercase tracking-widest text-xs font-bold">
                        Powered by {partner}
                    </Badge>

                    <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white tracking-tight mb-8 leading-[1.1] max-w-5xl">
                        Transform your business with <br />
                        <span style={{ color: accentColor }}>{title}</span>
                    </h1>

                    <p className="font-dm-sans text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <Button
                            className="h-14 px-8 rounded-full text-base font-bold tracking-wide transition-transform hover:scale-105"
                            style={{
                                background: `linear-gradient(to right, ${accentColor}, ${accentColor}CC)`
                            }}
                        >
                            Schedule Demo <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-14 px-8 rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold"
                        >
                            View Case Studies
                        </Button>
                    </div>

                    {/* Stats Strip */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-white/10 pt-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</span>
                                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
