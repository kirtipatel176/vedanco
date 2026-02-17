"use client";

import { motion } from "framer-motion";

interface SaaSTrustStripProps {
    partnerName: string;
}

const companies = [
    "TechGlobal", "InnovateX", "DataFlow Corp", "ScaleUp Inc", "FutureVision", "Streamline Systems"
];

export function SaaSTrustStrip({ partnerName }: SaaSTrustStripProps) {
    return (
        <section className="py-12 border-y border-white/5 bg-[#050505]">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-space-mono text-zinc-500 uppercase tracking-widest mb-8">
                    Trusted by industry leaders in partnership with <span className="text-white">{partnerName}</span>
                </p>
                <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-50">
                    {companies.map((company, i) => (
                        <div key={i} className="text-xl font-display font-bold text-white/40">
                            {company}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
