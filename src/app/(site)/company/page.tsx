"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Globe, Users } from "lucide-react";
import Image from "next/image";

export default function CompanyPage() {
    return (
        <main className="bg-white min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6 md:px-12">

                {/* Hero */}
                <section className="mb-32 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge variant="outline" className="mb-6 border-black/20 text-black/60 uppercase tracking-widest px-4 py-1.5">
                            About Vedanco
                        </Badge>
                        <h1 className="font-display font-black text-6xl md:text-8xl tracking-tighter mb-8 leading-[0.9]">
                            We build digital <br /><span className="text-zinc-400">empires.</span>
                        </h1>
                        <p className="font-dm-sans text-xl md:text-2xl text-zinc-600 leading-relaxed max-w-2xl">
                            Vedanco is a global technology consultancy rooted in engineering excellence. We partner with visionaries to build products that define the future.
                        </p>
                    </motion.div>
                </section>

                {/* Our Story */}
                <section className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <div className="relative aspect-square rounded-3xl overflow-hidden bg-black">
                        {/* Placeholder for office/culture image */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
                            <span className="font-display font-black text-8xl text-zinc-800">VD</span>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-display font-bold text-4xl mb-6">Root Here, Rising Worldwide</h2>
                        <div className="prose prose-lg text-zinc-600 space-y-6">
                            <p>
                                Founded with a singular mission: to bridge the gap between complex engineering and elegant design. We believe that true innovation happens when technical rigor meets creative fluidity.
                            </p>
                            <p>
                                From our headquarters, we coordinate a distributed team of elite engineers, designers, and strategists. We don't just write code; we architect solutions that scale, perform, and endure.
                            </p>
                            <p>
                                Our clients range from seed-stage disruptors to Fortune 500 stalwarts, all unified by a desire to push boundaries.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="bg-black text-white rounded-3xl p-12 md:p-24 mb-32">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Badge className="bg-white/10 text-white border-none mb-4">Our DNA</Badge>
                        <h2 className="font-display font-bold text-4xl md:text-5xl">Principles that drive us</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: ShieldCheck, title: "Uncompromising Quality", desc: "We don't ship until it's perfect. Good enough is never enough." },
                            { icon: Zap, title: "Velocity & Precision", desc: "Speed matters, but not at the cost of stability. We move fast and break nothing." },
                            { icon: Globe, title: "Global Perspective", desc: "Our solutions are designed for a borderless world, compliant and culturally aware." },
                            { icon: Users, title: "Client Partnership", desc: "We aren't just vendors; we are an extension of your core team." },
                        ].map((v, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-4">
                                    <v.icon size={24} />
                                </div>
                                <h4 className="font-display font-bold text-xl">{v.title}</h4>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team (Simple placeholder) */}
                <section className="text-center">
                    <h2 className="font-display font-bold text-4xl mb-12">Leadership</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Placeholder Team Members */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="group">
                                <div className="relative aspect-[3/4] bg-zinc-100 rounded-2xl overflow-hidden mb-4">
                                    <div className="absolute inset-0 flex items-center justify-center text-zinc-300">
                                        <Users size={48} />
                                    </div>
                                </div>
                                <h4 className="font-display font-bold text-lg">Team Member {i}</h4>
                                <p className="text-zinc-500 text-sm">Executive Role</p>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </main>
    );
}
