import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export function Footer() {
    return (
        <footer className="bg-bg-primary pt-24 pb-12 overflow-hidden relative border-t border-white/10">
            {/* Background "VEDANCO" Large Text */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-none select-none overflow-hidden">
                <h1 className="font-display font-black text-[15vw] leading-[0.8] text-white/5 text-center whitespace-nowrap tracking-tighter">
                    VEDANCO
                </h1>
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
                    {/* Brand / Contact Info */}
                    <div className="md:col-span-4 space-y-8">
                        <Link href="/" className="inline-block mb-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/logo.png"
                                    alt="Vedanco Logo"
                                    width={48}
                                    height={48}
                                    className="h-12 w-auto"
                                />
                                <div className="flex flex-col">
                                    <span className="font-display text-2xl font-black tracking-tighter text-white leading-none">
                                        VEDANCO
                                    </span>
                                    <span className="font-space-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                                        Root Here, Rising Worldwide
                                    </span>
                                </div>
                            </div>
                        </Link>



                        <div className="space-y-6">
                            <div>
                                <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest mb-3">📍 Address</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    InfoCity, Super Mall 1, Office No. 421/C,<br />
                                    Gandhinagar, Gujarat – India
                                </p>
                            </div>

                            <div>
                                <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest mb-3">📞 Phone</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    +91 6353 097 642
                                </p>
                            </div>

                            <div>
                                <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest mb-3">✉️ Email</h4>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    vedanco.official@vedanco.com
                                </p>
                            </div>
                        </div>

                        <div className="pt-4">
                            <h4 className="font-space-mono text-xs uppercase tracking-widest text-white mb-4">Get in Touch</h4>
                            <div className="flex gap-2 max-w-sm">
                                <Input
                                    placeholder="Email Address"
                                    className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 transition-colors h-10 text-xs font-space-mono"
                                />
                                <Button className="bg-white text-black hover:bg-zinc-200 h-10 px-6 text-xs font-bold uppercase tracking-wider">
                                    Join
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Links - Services */}
                    <div className="md:col-span-2 md:col-start-6 space-y-6">
                        <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest">expertise</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/services/ai-automation">AI Automation</FooterLink>
                            <FooterLink href="/services/it-services">IT Infrastructure</FooterLink>
                            <FooterLink href="/services/personal-branding">Personal Branding</FooterLink>
                            <FooterLink href="/services/us-recruitment">Global Recruitment</FooterLink>
                            <FooterLink href="/services/podcast-production">Media Production</FooterLink>
                            <FooterLink href="/services/digital-marketing">Growth Marketing</FooterLink>
                            <FooterLink href="/services/real-estate">Real Estate</FooterLink>
                        </ul>
                    </div>

                    {/* Links - Company */}
                    <div className="md:col-span-2 space-y-6">
                        <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest">company</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/company">About</FooterLink>
                            <FooterLink href="/portfolio">Case Studies</FooterLink>
                            <FooterLink href="/careers">Careers</FooterLink>
                            <FooterLink href="/contact">Contact</FooterLink>
                        </ul>
                    </div>

                    {/* Links - Social */}
                    <div className="md:col-span-2 space-y-6">
                        <h4 className="font-space-mono text-xs font-bold text-white uppercase tracking-widest">social</h4>
                        <ul className="space-y-3">
                            <FooterLink href="#">LinkedIn</FooterLink>
                            <FooterLink href="#">Twitter</FooterLink>
                            <FooterLink href="#">Instagram</FooterLink>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-space-mono tracking-widest text-zinc-500 border-t border-white/5 pt-8">
                    <p>&copy; {new Date().getFullYear()} Vedanco Group.</p>
                    <div className="flex space-x-8 mt-4 md:mt-0">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
    return (
        <li>
            <Link href={href} className="text-sm text-zinc-400 hover:text-white transition-colors block w-fit font-dm-sans">
                {children}
            </Link>
        </li>
    );
}
