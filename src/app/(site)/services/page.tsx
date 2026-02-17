"use client";

import { servicesData } from "@/lib/services-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ServicesPage() {
    const services = Object.values(servicesData);

    return (
        <main className="bg-black min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-6 border-white/20 text-white/60 uppercase tracking-widest px-4 py-1.5">
                            Our Expertise
                        </Badge>
                        <h1 className="font-display font-black text-6xl md:text-8xl text-white tracking-tighter mb-6">
                            Constructing <br className="hidden md:block" />
                            <span className="text-zinc-500">Digital Empires</span>
                        </h1>
                        <p className="font-dm-sans text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Comprehensive solutions specifically designed to scale global enterprises through precision automation, strategic branding, and elite talent acquisition.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services List - Alternating Layout */}
            <div className="flex flex-col">
                {services.map((service, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <section
                            key={service.id}
                            className={cn(
                                "py-24 md:py-32 relative overflow-hidden",
                                isEven ? "bg-black text-white" : "bg-white text-black"
                            )}
                        >
                            {/* Background Elements */}
                            {isEven ? (
                                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent opacity-50 pointer-events-none" />
                            ) : (
                                <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/5 to-transparent opacity-50 pointer-events-none" />
                            )}

                            <div className="container mx-auto px-6 md:px-12 relative z-10">
                                <div className={cn(
                                    "flex flex-col md:flex-row gap-16 md:gap-24 items-center",
                                    !isEven && "md:flex-row-reverse" // Alternate content direction
                                )}>

                                    {/* Visual Side */}
                                    <motion.div
                                        className="w-full md:w-1/2"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <div className={cn(
                                            "relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group",
                                            isEven ? "bg-zinc-900 border border-white/10" : "bg-zinc-100 border border-black/5"
                                        )}>
                                            {/* Placeholder for Service Image */}
                                            <div className={cn(
                                                "absolute inset-0 flex items-center justify-center",
                                                isEven ? "bg-gradient-to-br from-white/5 to-black" : "bg-gradient-to-br from-black/5 to-white"
                                            )}>
                                                <service.icon
                                                    size={80}
                                                    className={cn(
                                                        "opacity-20 transition-transform duration-700 group-hover:scale-110",
                                                        isEven ? "text-white" : "text-black"
                                                    )}
                                                />
                                            </div>

                                            {/* Overlay Stats/Badge */}
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <div className={cn(
                                                    "backdrop-blur-md rounded-xl p-4 flex justify-between items-center border",
                                                    isEven ? "bg-black/60 border-white/10" : "bg-white/80 border-black/5"
                                                )}>
                                                    <div>
                                                        <p className={cn("text-xs font-bold uppercase tracking-wider", isEven ? "text-zinc-400" : "text-zinc-500")}>
                                                            Key Metric
                                                        </p>
                                                        <p className={cn("font-display font-bold text-xl", isEven ? "text-white" : "text-black")}>
                                                            {service.stats[0]?.value} {service.stats[0]?.label}
                                                        </p>
                                                    </div>
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-full flex items-center justify-center",
                                                        isEven ? "bg-white text-black" : "bg-black text-white"
                                                    )}>
                                                        <ArrowUpRight size={20} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Content Side */}
                                    <motion.div
                                        className="w-full md:w-1/2 space-y-8"
                                        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        <div>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className={cn(
                                                    "h-[1px] w-12",
                                                    isEven ? "bg-white/30" : "bg-black/20"
                                                )} />
                                                <span className={cn(
                                                    "font-space-mono text-xs uppercase tracking-widest font-bold",
                                                    isEven ? "text-accent-blue" : "text-zinc-500"
                                                )}>
                                                    Service 0{index + 1}
                                                </span>
                                            </div>
                                            <h2 className={cn(
                                                "font-display font-black text-4xl md:text-6xl mb-4",
                                                isEven ? "text-white" : "text-black"
                                            )}>
                                                {service.title}
                                            </h2>
                                            <p className={cn(
                                                "font-dm-sans text-lg leading-relaxed",
                                                isEven ? "text-zinc-400" : "text-zinc-600"
                                            )}>
                                                {service.description}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.offerings.slice(0, 4).map((offering, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircle2
                                                        size={18}
                                                        className={cn(
                                                            "mt-1 shrink-0",
                                                            isEven ? "text-white/40" : "text-black/40"
                                                        )}
                                                    />
                                                    <div>
                                                        <h4 className={cn("font-bold text-sm mb-1", isEven ? "text-white" : "text-black")}>
                                                            {offering.title}
                                                        </h4>
                                                        <p className={cn("text-xs leading-relaxed", isEven ? "text-zinc-500" : "text-zinc-500")}>
                                                            {offering.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-4">
                                            <Link href={`/services/${service.id}`}>
                                                <Button
                                                    className={cn(
                                                        "h-12 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105",
                                                        isEven
                                                            ? "bg-white text-black hover:bg-zinc-200"
                                                            : "bg-black text-white hover:bg-zinc-800"
                                                    )}
                                                >
                                                    Explore Solution
                                                </Button>
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* Bottom CTA */}
            <section className="bg-black py-24 border-t border-white/10">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-8">
                        Ready to scale your vision?
                    </h2>
                    <Link href="/contact">
                        <Button className="h-14 px-10 rounded-full bg-accent-blue text-white text-sm font-bold uppercase tracking-widest hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/20">
                            Start a Project
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
