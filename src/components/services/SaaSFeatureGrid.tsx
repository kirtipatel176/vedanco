"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, BarChart3, ShieldCheck, Layers, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feature {
    title: string;
    description: string;
    icon?: any;
}

interface SizedBoxProps {
    features: Feature[];
    accentColor: string;
}

// Map generic icons if specific ones aren't provided
const iconMap = [Zap, BarChart3, ShieldCheck, Layers, Globe, CheckCircle2];

export function SaaSFeatureGrid({ features, accentColor }: SizedBoxProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
                const Icon = feature.icon || iconMap[index % iconMap.length];

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative p-8 rounded-2xl bg-[#0F1623] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                        style={{
                            boxShadow: `0 0 0 0 ${accentColor}00` // clearer generic shadow
                        }}
                    >
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-white/5"
                            style={{
                                backgroundColor: `${accentColor}10`,
                                color: accentColor
                            }}
                        >
                            <Icon size={24} />
                        </div>

                        <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-white/90">
                            {feature.title}
                        </h3>

                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {feature.description}
                        </p>

                        {/* Hover Gradient Overlay */}
                        <div
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                            style={{
                                background: `radial-gradient(circle at top right, ${accentColor}, transparent 70%)`
                            }}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}
