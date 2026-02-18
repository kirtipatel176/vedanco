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
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Michael Ross",
        role: "Founder, Peak Performance",
        quote: "Their personal branding strategy helped me secure 5 keynote speaking gigs in just two months. Exceptional work.",
        service: "Personal Branding",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Elena Rodriguez",
        role: "Director, Global Hiring",
        quote: "The recruitment team found us a CTO within 2 weeks. The quality of candidates was consistently improved.",
        service: "US Recruitment",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 bg-zinc-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-gold/5 rounded-full blur-3xl translate-y-1/3"></div>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-accent-gold font-space-mono text-xs tracking-widest uppercase">
                        — Real Results, Real People
                    </span>
                    <h2 className="font-display font-black text-4xl md:text-5xl text-bg-primary mt-4 tracking-tight">
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
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    className="pb-16 testimonials-swiper"
                >
                    {testimonials.map((t, i) => (
                        <SwiperSlide key={i} className="pb-12 h-auto">
                            <div className="bg-white rounded-3xl p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full flex flex-col hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0 bg-zinc-100">
                                        {t.image ? (
                                            <Image
                                                src={t.image}
                                                alt={t.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-zinc-200" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-display font-bold text-lg text-bg-primary leading-tight">{t.name}</h4>
                                        <p className="font-dm-sans text-xs text-zinc-500 uppercase tracking-wide">{t.role}</p>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <svg className="w-8 h-8 text-accent-gold/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.096 14.017 14.742 14.453 13.939C14.889 13.136 15.659 12.392 16.763 11.706C17.867 11.02 18.971 10.607 20.075 10.467V2.5C17.653 2.5 15.541 3.5 13.985 5.5C12.429 7.5 11.651 9.774 11.651 12.322V21H14.017ZM6.649 21L6.649 18C6.649 16.096 6.649 14.742 7.085 13.939C7.521 13.136 8.291 12.392 9.395 11.706C10.499 11.02 11.603 10.607 12.707 10.467V2.5C10.285 2.5 8.173 3.5 6.617 5.5C5.061 7.5 4.283 9.774 4.283 12.322V21H6.649Z" />
                                    </svg>
                                    <p className="font-dm-sans text-base text-zinc-600 leading-relaxed italic relative z-10">
                                        &ldquo;{t.quote}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border-zinc-200 bg-zinc-50/50">
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
