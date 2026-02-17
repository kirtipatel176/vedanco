"use client";

import { servicesData } from "@/lib/services-data";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, ArrowUpRight, Plus, Minus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { use, useState } from "react";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const service = servicesData[slug];
    const [openOffering, setOpenOffering] = useState<number | null>(0);

    if (!service) {
        notFound();
    }

    return (
        <main className="bg-black min-h-screen">
            {/* 1. Hero Section (Black) */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-black">
                {/* Dynamic Accent Glow */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: service.accent }}
                />

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge
                            variant="outline"
                            className="mb-8 border-white/10 text-white/60 uppercase tracking-widest px-4 py-1.5 backdrop-blur-sm"
                            style={{ borderColor: `${service.accent}40`, color: service.accent }}
                        >
                            {service.title}
                        </Badge>
                        <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white tracking-tighter mb-8 leading-[1.1]">
                            {service.description.split(" ").slice(0, 3).join(" ")} <br className="hidden md:block" />
                            <span style={{ color: service.accent }}>{service.description.split(" ").slice(3).join(" ")}</span>
                        </h1>
                        <p className="font-dm-sans text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
                            Partner with Vedanco to deploy enterprise-grade {service.title.toLowerCase()} solutions that drive measurable growth.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                className="h-14 px-8 rounded-full text-white font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
                                style={{ backgroundColor: service.accent }}
                            >
                                Start Project
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 px-8 rounded-full border-white/10 text-white hover:bg-white/5 font-bold text-sm uppercase tracking-widest"
                            >
                                View Case Studies
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Stats & Trust Strip (White) */}
            <section className="py-16 bg-white border-b border-black/5">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-black/5">
                        <div className="py-4 md:py-0 md:pr-8 text-center md:text-left">
                            <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-2">Powered By</span>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <span className="font-display font-black text-xl text-black">{service.partner}</span>
                            </div>
                        </div>
                        {service.stats.map((stat, i) => (
                            <div key={i} className="py-4 md:py-0 md:px-8 text-center md:text-left">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest block mb-1">{stat.label}</span>
                                    <span className="font-display font-black text-3xl md:text-4xl text-black">{stat.value}</span>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Offerings List (White - Interactive) */}
            <section className="py-24 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <span className="text-accent-blue font-space-mono text-xs tracking-widest uppercase mb-4 block">
                                — Capabilities
                            </span>
                            <h2 className="font-display font-black text-4xl md:text-5xl text-black">
                                Specialized <span className="text-zinc-400">Offerings</span>
                            </h2>
                        </div>
                        <p className="font-dm-sans text-zinc-500 max-w-sm text-right hidden md:block">
                            Click to explore our tailored solutions designed for your specific business challenges.
                        </p>
                    </div>

                    <div className="flex flex-col">
                        {service.offerings.map((offering, index) => {
                            const isOpen = openOffering === index;
                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        "border-b border-black/5 transition-all duration-500 cursor-pointer group",
                                        isOpen ? "border-black/20 pb-8" : "hover:border-black/20"
                                    )}
                                    onClick={() => setOpenOffering(isOpen ? null : index)}
                                >
                                    <div className="py-8 flex justify-between items-center">
                                        <div className="flex items-center gap-6 md:gap-12">
                                            <span
                                                className={cn(
                                                    "font-space-mono text-xs font-bold tracking-widest transition-colors duration-300",
                                                    isOpen ? "opacity-100" : "text-zinc-400 group-hover:text-black opacity-60"
                                                )}
                                                style={{ color: isOpen ? service.accent : undefined }}
                                            >
                                                0{index + 1}
                                            </span>
                                            <h3
                                                className={cn(
                                                    "font-display font-bold text-2xl md:text-4xl transition-all duration-300",
                                                    isOpen ? "text-black translate-x-4" : "text-zinc-400 group-hover:text-black"
                                                )}
                                            >
                                                {offering.title}
                                            </h3>
                                        </div>
                                        <div
                                            className={cn(
                                                "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                                                isOpen ? "bg-black text-white" : "text-black/20 group-hover:bg-black/5 group-hover:text-black"
                                            )}
                                        >
                                            <Plus
                                                size={20}
                                                className={cn(
                                                    "transition-transform duration-300",
                                                    isOpen ? "rotate-45" : "rotate-0"
                                                )}
                                            />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-0 md:pl-20 pr-0 md:pr-32 grid md:grid-cols-2 gap-8 pb-4">
                                                    <p className="text-zinc-500 text-lg leading-relaxed">
                                                        {offering.description}
                                                        <br /><br />
                                                        We deploy {offering.title} frameworks to ensure rapid scalability and security.
                                                    </p>
                                                    <div className="bg-zinc-50 rounded-xl p-6 border border-black/5">
                                                        <h4 className="font-bold text-black mb-4">Key Benefits</h4>
                                                        <ul className="space-y-3">
                                                            <li className="flex items-center gap-3 text-sm text-zinc-600">
                                                                <CheckCircle2 size={16} style={{ color: service.accent }} />
                                                                Enterprise-grade implementation
                                                            </li>
                                                            <li className="flex items-center gap-3 text-sm text-zinc-600">
                                                                <CheckCircle2 size={16} style={{ color: service.accent }} />
                                                                24/7 dedicated support
                                                            </li>
                                                            <li className="flex items-center gap-3 text-sm text-zinc-600">
                                                                <CheckCircle2 size={16} style={{ color: service.accent }} />
                                                                Seamless integration
                                                            </li>
                                                        </ul>
                                                        <Button
                                                            variant="ghost"
                                                            className="mt-6 p-0 h-auto font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:no-underline"
                                                            style={{ color: service.accent }}
                                                        >
                                                            Discover More <ArrowRight size={14} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. Process Section (Black) */}
            <section className="py-24 md:py-32 bg-black relative overflow-hidden">
                {/* Background Noise/Gradient */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
                <div
                    className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-10 pointer-events-none"
                    style={{ backgroundColor: service.accent }}
                />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">
                        <div className="md:w-1/3">
                            <span
                                className="font-space-mono text-xs tracking-widest uppercase mb-4 block"
                                style={{ color: service.accent }}
                            >
                                — Methodology
                            </span>
                            <h2 className="font-display font-black text-4xl md:text-5xl text-white mb-6 leading-tight">
                                Systematic <br /> <span className="text-zinc-500">Execution</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                                Our proven process ensures transparency, efficiency, and exceptional results from day one.
                            </p>
                            <Button variant="outline" className="rounded-full border-white/10 text-white hover:bg-white/5">
                                Download Process Guide
                            </Button>
                        </div>

                        <div className="md:w-2/3 space-y-8">
                            {service.process.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 md:gap-8 group"
                                >
                                    <div className="flex flex-col items-center">
                                        <div
                                            className="w-12 h-12 rounded-full border flex items-center justify-center shrink-0 font-space-mono font-bold z-10 bg-black"
                                            style={{ borderColor: service.accent, color: service.accent }}
                                        >
                                            {step.step}
                                        </div>
                                        {i !== service.process.length - 1 && (
                                            <div className="w-[1px] h-full bg-white/10 my-2 group-hover:bg-white/20 transition-colors" />
                                        )}
                                    </div>
                                    <div className="pb-12 group-hover:translate-x-2 transition-transform duration-300">
                                        <h3 className="text-white font-bold text-2xl mb-2">{step.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed max-w-lg">{step.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA Section (Black with distinct border) */}
            <section className="py-24 border-t border-white/10 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8">
                        Ready to elevate your {service.title}?
                    </h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="h-16 px-10 text-lg rounded-full font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-transform text-white"
                                style={{
                                    backgroundColor: service.accent,
                                    boxShadow: `0 10px 30px -10px ${service.accent}66`
                                }}
                            >
                                Schedule Strategy Call
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
