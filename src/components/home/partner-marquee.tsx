"use client";



const partners = [
    "DEMAZE", "NENO", "SOARBEAM", "SAI BRANDING", "MSPIRE", "THE FOUNDER'S DREAM"
];

export function PartnerMarquee() {
    return (
        <section className="bg-white border-y border-black/5 py-4 overflow-hidden relative z-20">
            <div className="flex w-max items-center animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] group">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {partners.map((partner, index) => (
                            <div key={`${i}-${index}`} className="flex items-center mx-8">
                                <span className="text-zinc-400 font-space-mono text-sm tracking-[0.2em] font-bold uppercase whitespace-nowrap group-hover:text-black transition-colors">
                                    {partner}
                                </span>
                                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold ml-16" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
