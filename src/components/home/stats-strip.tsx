"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const stats = [
    { label: "Global Brands", value: 50, suffix: "+" },
    { label: "Service Verticals", value: 3, suffix: "+" },
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Complete Projects", value: 100, suffix: "+" },
];

export function StatsStrip() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section ref={ref} className="bg-white border-y border-black/5 py-16">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center md:text-left relative group">
                            {index !== 0 && (
                                <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-black/10" />
                            )}
                            <div className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-black mb-2 group-hover:text-accent-gold transition-colors duration-300">
                                {inView ? (
                                    <CountUp end={stat.value} duration={2.5} separator="," />
                                ) : (
                                    "0"
                                )}
                                {stat.suffix}
                            </div>
                            <div className="font-space-mono text-xs md:text-sm text-zinc-500 tracking-widest uppercase">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
