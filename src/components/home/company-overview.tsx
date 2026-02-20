"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Globe2, Target, Award } from "lucide-react";

const milestones = [
  { year: "2012", title: "Vedanco founded", detail: "Started as a boutique engineering studio." },
  { year: "2017", title: "Global expansion", detail: "Established cross-continental delivery teams." },
  { year: "2021", title: "Six expert agencies", detail: "Unified portfolio under one platform." },
  { year: "2025", title: "AI-led delivery", detail: "Scaled automation and intelligence services." },
];

const principles = [
  { icon: Target, title: "Mission", description: "Build durable systems and brands that compound value." },
  { icon: Globe2, title: "Vision", description: "Be the most trusted partner for global, AI-driven growth." },
  { icon: ShieldCheck, title: "Values", description: "Integrity, rigor, speed, and client-first execution." },
  { icon: Award, title: "Recognition", description: "Awarded for innovation across engineering and media." },
];

export function CompanyOverview() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_55%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Badge variant="outline" className="border-white/20 text-white/70 uppercase tracking-widest px-4 py-1.5">
              About Vedanco
            </Badge>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white tracking-tighter">
              A modern company building <span className="text-zinc-500">global operating systems</span>.
            </h2>
            <p className="font-dm-sans text-lg text-zinc-400 leading-relaxed max-w-2xl">
              Vedanco combines engineering, AI automation, and media into one integrated platform. We align strategy,
              execution, and growth so ambitious companies can scale with precision and speed.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {principles.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-4">
                    <item.icon size={18} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8"
          >
            <h3 className="font-display font-bold text-2xl text-white mb-8">Company milestones</h3>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                    {index !== milestones.length - 1 && (
                      <div className="w-px flex-1 bg-white/20 mt-2" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-space-mono uppercase tracking-[0.3em] text-zinc-400">
                      {milestone.year}
                    </p>
                    <h4 className="font-display font-bold text-lg text-white">{milestone.title}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed">{milestone.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
