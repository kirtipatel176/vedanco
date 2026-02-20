"use client";

import { servicesData } from "@/data/services-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ServiceItem = (typeof servicesData)[keyof typeof servicesData];

interface ServiceTheme {
  sectionBg: string;
  bgOverlay: string;
  cardBg: string;
  iconOverlayBg: string;
  iconColor: string;
  statsBg: string;
  statsLabelColor: string;
  statsValueColor: string;
  statsIconBg: string;
  labelColor: string;
  dividerColor: string;
  titleColor: string;
  descColor: string;
  checkColor: string;
  offeringTitleColor: string;
  btnClass: string;
}

const categoryMap: Record<string, string> = {
  "ai-automation": "Automation",
  "it-services": "Technology",
  "digital-marketing": "Growth",
  "personal-branding": "Brand",
  "us-recruitment": "Talent",
  "podcast-production": "Media",
};

const categories = ["All", ...Array.from(new Set(Object.values(categoryMap)))];

// ─── Theme Helper ─────────────────────────────────────────────────────────────
function getServiceTheme(isEven: boolean): ServiceTheme {
  if (isEven) {
    return {
      sectionBg: "bg-black text-white",
      bgOverlay: "absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent opacity-50 pointer-events-none",
      cardBg: "bg-zinc-900 border border-white/10",
      iconOverlayBg: "bg-gradient-to-br from-white/5 to-black",
      iconColor: "text-white",
      statsBg: "bg-black/60 border-white/10",
      statsLabelColor: "text-zinc-400",
      statsValueColor: "text-white",
      statsIconBg: "bg-white text-black",
      labelColor: "text-accent-blue",
      dividerColor: "bg-white/30",
      titleColor: "text-white",
      descColor: "text-zinc-400",
      checkColor: "text-white/40",
      offeringTitleColor: "text-white",
      btnClass: "bg-white text-black hover:bg-zinc-200",
    };
  }
  return {
    sectionBg: "bg-white text-black",
    bgOverlay: "absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-black/5 to-transparent opacity-50 pointer-events-none",
    cardBg: "bg-zinc-100 border border-black/5",
    iconOverlayBg: "bg-gradient-to-br from-black/5 to-white",
    iconColor: "text-black",
    statsBg: "bg-white/80 border-black/5",
    statsLabelColor: "text-zinc-500",
    statsValueColor: "text-black",
    statsIconBg: "bg-black text-white",
    labelColor: "text-zinc-500",
    dividerColor: "bg-black/20",
    titleColor: "text-black",
    descColor: "text-zinc-600",
    checkColor: "text-black/40",
    offeringTitleColor: "text-black",
    btnClass: "bg-black text-white hover:bg-zinc-800",
  };
}

// ─── ServiceSection Component ─────────────────────────────────────────────────
interface ServiceSectionProps {
  service: ServiceItem;
  index: number;
}

function ServiceSection({ service, index }: Readonly<ServiceSectionProps>) {
  const isEven = index % 2 === 0;
  const t = getServiceTheme(isEven);

  return (
    <section className={cn("py-24 md:py-32 relative overflow-hidden", t.sectionBg)}>
      <div className={t.bgOverlay} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div
          className={cn(
            "flex flex-col md:flex-row gap-16 md:gap-24 items-center",
            !isEven && "md:flex-row-reverse"
          )}
        >
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn("relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group", t.cardBg)}>
              <div className={cn("absolute inset-0 flex items-center justify-center", t.iconOverlayBg)}>
                <service.icon
                  size={80}
                  className={cn("opacity-20 transition-transform duration-700 group-hover:scale-110", t.iconColor)}
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className={cn("backdrop-blur-md rounded-xl p-4 flex justify-between items-center border", t.statsBg)}>
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-wider", t.statsLabelColor)}>Key Metric</p>
                    <p className={cn("font-display font-bold text-xl", t.statsValueColor)}>
                      {service.stats[0]?.value} {service.stats[0]?.label}
                    </p>
                  </div>
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", t.statsIconBg)}>
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 space-y-8"
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className={cn("h-[1px] w-12", t.dividerColor)} />
                <span className={cn("font-space-mono text-xs uppercase tracking-widest font-bold", t.labelColor)}>
                  Service 0{index + 1}
                </span>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className={cn("font-display font-black text-4xl md:text-6xl mb-4", t.titleColor)}>
                  {service.title}
                </h2>
                <span className={cn("text-[10px] uppercase tracking-[0.2em] font-space-mono px-3 py-1 rounded-full border", t.descColor)}>
                  {categoryMap[service.id] || "Core"}
                </span>
              </div>
              <p className={cn("font-dm-sans text-lg leading-relaxed", t.descColor)}>
                {service.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.offerings.slice(0, 4).map((offering) => (
                <div key={offering.title} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className={cn("mt-1 shrink-0", t.checkColor)} />
                  <div>
                    <h4 className={cn("font-bold text-sm mb-1", t.offeringTitleColor)}>{offering.title}</h4>
                    <p className="text-xs leading-relaxed text-zinc-500">{offering.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href={`/services/${service.id}`}>
                <Button
                  className={cn(
                    "h-12 px-8 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105",
                    t.btnClass
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
}

export function ServicesPage() {
  const services = Object.values(servicesData);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return services;
    return services.filter((service) => categoryMap[service.id] === activeCategory);
  }, [activeCategory, services]);

  return (
    <main className="bg-black min-h-screen">
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
              Real Growth. <br className="hidden md:block" />
              <span className="text-zinc-500">No Fluff.</span>
            </h1>
            <p className="font-dm-sans text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We don&apos;t sell &ldquo;digital transformation.&rdquo; We build the systems, brands, and teams that actually make your business money.
            </p>
          </motion.div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "text-xs uppercase tracking-[0.2em] font-space-mono px-4 py-2 rounded-full border transition-colors",
                  activeCategory === category
                    ? "bg-white text-black border-white"
                    : "border-white/20 text-white/60 hover:text-white hover:border-white/50"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col">
        {filteredServices.map((service, index) => (
          <ServiceSection key={service.id} service={service} index={index} />
        ))}
      </div>

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
