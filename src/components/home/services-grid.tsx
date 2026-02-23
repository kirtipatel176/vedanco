"use client";


import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const services = [
    {
        title: "AI Automation",
        link: "/services/ai-automation",
        capabilities: "LLM Integration • Process Automation • Chatbots",
        description: "Deploying intelligent agents to autonomous workflows."
    },
    {
        title: "IT Services",
        link: "/services/it-services",
        capabilities: "Cloud Infra • Cybersecurity • Enterprise Dev",
        description: "Scalable infrastructure for global operations."
    },
    {
        title: "Personal Branding",
        link: "/services/personal-branding",
        capabilities: "Strategy • Content • Reputation Management",
        description: "Crafting digital identities for industry leaders."
    },
    {
        title: "US IT Recruitment",
        link: "/services/us-recruitment",
        capabilities: "Tech Staffing • Executive Search • RPO",
        description: "Connecting top-tier talent with innovative firms."
    },
    {
        title: "Podcast Production",
        link: "/services/podcast-production",
        capabilities: "Audio Engineering • Video • Distribution",
        description: "Studio-quality production for thought leaders."
    },
    {
        title: "Digital Marketing",
        link: "/services/digital-marketing",
        capabilities: "SEO • Paid Media • Growth Hacking",
        description: "Data-driven strategies for maximum ROI."
    },
    {
        title: "Real Estate",
        link: "/services/real-estate",
        capabilities: "Property Advisory • Market Analysis • Portfolio Management",
        description: "Strategic real estate solutions for modern investments."
    }
];

export function ServicesGrid() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent-blue/5 rounded-full blur-[150px] opacity-30 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-end border-b border-black/5 pb-8">
                    <div className="space-y-4">
                        <span className="text-zinc-500 font-space-mono text-xs tracking-widest uppercase">
                            — Capabilities
                        </span>
                        <h2 className="font-display font-black text-5xl md:text-6xl text-black tracking-tight">
                            Expertise
                        </h2>
                    </div>
                    <div className="hidden md:block text-zinc-500 font-dm-sans text-sm max-w-xs text-right">
                        Comprehensive solutions for the modern digital enterprise.
                    </div>
                </div>

                <div className="flex flex-col">
                    {services.map((service, index) => (
                        <Link
                            key={service.link}
                            href={service.link}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative border-b border-black/5 py-12 transition-all duration-300 hover:border-black/20"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-center z-10 relative">
                                {/* Title */}
                                <h3 className={cn(
                                    "font-display font-bold text-3xl md:text-5xl transition-all duration-300 md:w-1/3",
                                    hoveredIndex === index ? "translate-x-4 text-black" : "text-zinc-400"
                                )}>
                                    {service.title}
                                </h3>

                                {/* Description / Capabilities */}
                                <div className="mt-4 md:mt-0 md:w-1/3 text-center md:text-left">
                                    <span className="font-space-mono text-xs uppercase tracking-widest text-zinc-500 group-hover:text-accent-blue transition-colors">
                                        {service.capabilities}
                                    </span>
                                </div>

                                {/* Icon / CTA */}
                                <div className="mt-4 md:mt-0 md:w-1/3 flex justify-end">
                                    <div className={cn(
                                        "w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300",
                                        hoveredIndex === index
                                            ? "bg-black border-black rotate-45"
                                            : "bg-transparent border-black/10"
                                    )}>
                                        <ArrowUpRight
                                            className={cn(
                                                "transition-colors duration-300",
                                                hoveredIndex === index ? "text-white" : "text-black"
                                            )}
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Hover Gradient Background */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-gradient-to-r from-accent-blue/5 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none",
                                    hoveredIndex === index && "opacity-100"
                                )}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
