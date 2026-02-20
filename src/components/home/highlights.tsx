"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  {
    title: "AI Operations Suite",
    description: "Autonomous agents that reduce ops costs and accelerate decision-making.",
    image: "/images/portfolio/ai-agent.png",
    href: "/services/ai-automation",
    badge: "New",
  },
  {
    title: "Digital Growth Engine",
    description: "Full-funnel performance marketing with measurable revenue impact.",
    image: "/images/portfolio/marketing.png",
    href: "/services/digital-marketing",
    badge: "Top Pick",
  },
  {
    title: "Executive Branding",
    description: "Position leadership teams as category-defining voices.",
    image: "/images/portfolio/fashion.png",
    href: "/services/personal-branding",
    badge: "Featured",
  },
  {
    title: "Global Talent Network",
    description: "Specialized hiring and onboarding for mission-critical roles.",
    image: "/images/portfolio/recruitment.png",
    href: "/services/us-recruitment",
    badge: "Fast Fill",
  },
];

export function Highlights() {
  return (
    <section className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(0,0,0,0.08),_transparent_60%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div className="space-y-4">
            <Badge variant="outline" className="border-black/10 text-black/60 uppercase tracking-widest px-4 py-1.5">
              Product Highlights
            </Badge>
            <h2 className="font-display font-black text-4xl md:text-6xl text-black tracking-tighter">
              Flagship solutions for <span className="text-zinc-400">modern enterprises</span>
            </h2>
          </div>
          <p className="font-dm-sans text-sm text-zinc-500 max-w-sm">
            Curated offerings that blend automation, talent, and brand execution under one platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-3xl border border-black/10 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)] overflow-hidden"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-6 left-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black bg-white/90 rounded-full px-3 py-1">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-black mb-3">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.description}</p>
                  </div>
                  <Link
                    href={item.href}
                    className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-colors"
                  >
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
                <div className="mt-6">
                  <Link
                    href={item.href}
                    className="text-xs font-space-mono uppercase tracking-[0.2em] text-zinc-500 group-hover:text-black transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
