"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CMO, TechFlow Inc.",
        quote: "Vedanco transformed our digital presence completely. The AI automation they implemented saved us 40 hours per week.",
        service: "AI & Automation",
        image: null, // Placeholder
    },
    {
        name: "Michael Ross",
        role: "Founder, Peak Performance",
        quote: "Their personal branding strategy helped me secure 5 keynote speaking gigs in just two months. Exceptional work.",
        service: "Personal Branding",
        image: null,
    },
    {
        name: "Elena Rodriguez",
        role: "Director, Global Hiring",
        quote: "The recruitment team found us a CTO within 2 weeks. The quality of candidates was consistently improved.",
        service: "US Recruitment",
        image: null,
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white relative">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-accent-gold font-space-mono text-xs tracking-widest uppercase">
                        — Client Stories
                    </span>
                    <h2 className="font-display font-bold text-4xl text-bg-primary mt-4">
                        Trusted by Industry Leaders
                    </h2>
                </div>

                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    autoplay={{ delay: 5000 }}
                    pagination={{ clickable: true }}
                    className="pb-16"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i} className="pb-12">
                            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.06)] h-full flex flex-col">
                                <div className="flex-1">
                                    <p className="font-playfair italic text-lg text-gray-700 leading-relaxed mb-6">
                                        "{t.quote}"
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-6 border-t border-gray-100 pt-6">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                                    <div>
                                        <h4 className="font-dm-sans font-bold text-bg-primary">{t.name}</h4>
                                        <p className="text-xs text-text-muted">{t.role}</p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <Badge variant="outline" className="text-[10px] text-gray-400 border-gray-200">
                                        {t.service}
                                    </Badge>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
