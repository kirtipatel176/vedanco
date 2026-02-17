import Link from "next/link";
import Image from "next/image";
import { MoveLeft, Quote } from "lucide-react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 text-white bg-black overflow-hidden h-screen sticky top-0">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/portfolio/fintech.png"
                        alt="Auth Background"
                        fill
                        className="object-cover opacity-60 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
                </div>

                {/* Logo */}
                <Link href="/" className="relative z-10 flex items-center gap-2 group w-fit">
                    <MoveLeft className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                    <span className="font-display font-black text-2xl tracking-tighter">VEDANCO</span>
                </Link>

                {/* Testimonial */}
                <div className="relative z-10 max-w-xl">
                    <Quote className="w-10 h-10 text-white/30 mb-6" />
                    <blockquote className="font-display font-bold text-3xl md:text-4xl leading-tight mb-8">
                        "Vedanco transformed our digital presence. The attention to detail and engineering quality is unmatched in the industry."
                    </blockquote>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black font-bold">
                            AK
                        </div>
                        <div>
                            <div className="font-bold font-dm-sans">Alexander Kay</div>
                            <div className="text-white/60 text-sm">CTO, NeoBank Corp</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 text-white/40 text-sm font-dm-sans flex justify-between w-full">
                    <span>© 2026 Vedanco Group Inc.</span>
                    <span>Privacy & Terms</span>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 bg-white text-black min-h-screen">
                <div className="w-full max-w-[400px] space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    {children}
                </div>
            </div>
        </div>
    );
}
