"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/services-data";


const navLinks = [
    { name: "Services", href: "/services", hasDropdown: true },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Company", href: "/company" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredService, setHoveredService] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setHoveredService(null);
    }, [pathname]);

    const servicesList = Object.values(servicesData);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/0",
                isScrolled
                    ? "bg-black/50 backdrop-blur-md py-4 border-white/5"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between"
                onMouseLeave={() => setHoveredService(null)}
            >
                {/* Logo */}
                <Link href="/" className="relative z-50 group flex items-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="Vedanco Logo"
                        width={70}
                        height={70}
                        className="h-10 w-auto"
                        priority
                    />
                    <div className="flex flex-col">
                        <span className="font-display text-xl md:text-2xl font-black tracking-tighter text-white leading-none">
                            VEDANCO
                        </span>
                        <span className="text-[10px] md:text-xs font-dm-sans tracking-widest text-zinc-400 uppercase leading-none mt-1">
                            Root Here, Rising Worldwide
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav - Centered & Styled like Neno */}
                <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10">
                    {navLinks.map((link) => (
                        <div
                            key={link.name}
                            className="relative"
                            onMouseEnter={() => link.hasDropdown && setHoveredService("services")}
                        >
                            <Link
                                href={link.href}
                                className={cn(
                                    "text-[11px] font-dm-sans font-bold uppercase tracking-[0.2em] text-zinc-400 transition-all hover:text-white px-5 py-2 rounded-full flex items-center gap-1",
                                    pathname.startsWith(link.href) && "text-white bg-white/10"
                                )}
                            >
                                {link.name}
                                {link.hasDropdown && <ChevronDown size={10} className={cn("transition-transform", hoveredService === "services" ? "rotate-180" : "")} />}
                            </Link>
                        </div>
                    ))}
                </nav>

                {/* Services Dropdown Mega Menu */}
                <AnimatePresence>
                    {hoveredService === "services" && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 right-0 pt-4 px-6 md:px-12 z-40 hidden md:block"
                            onMouseEnter={() => setHoveredService("services")}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div className="mx-auto max-w-5xl bg-[#080C14]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/50 grid grid-cols-2 gap-x-8 gap-y-6">
                                {servicesList.map((service) => (
                                    <Link
                                        key={service.id}
                                        href={`/services/${service.id}`}
                                        className="group flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                                    >
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors"
                                            style={{ color: service.accent }}
                                        >
                                            <service.icon size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-display font-bold text-white text-base mb-1 group-hover:text-accent-blue transition-colors flex items-center gap-2">
                                                {service.title}
                                            </h4>
                                            <p className="text-xs text-zinc-400 font-dm-sans leading-relaxed line-clamp-2">
                                                {service.description}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/careers">
                        <Button
                            variant="outline"
                            className="h-9 px-5 rounded-full border-white/20 hover:border-white/40 bg-transparent text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/5"
                        >
                            Careers
                        </Button>
                    </Link>
                    <Link href="/signin">
                        <Button
                            variant="ghost"
                            className="h-9 px-5 rounded-full text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/5"
                        >
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/contact">
                        <Button
                            className="h-9 px-5 rounded-full bg-white hover:bg-zinc-200 text-black text-[10px] font-bold uppercase tracking-widest border border-white"
                        >
                            Hire Talent
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu */}
                <div
                    className={cn(
                        "fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ease-in-out md:hidden",
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {navLinks.map((link) => (
                        <div key={link.name} className="flex flex-col items-center">
                            <Link
                                href={link.href}
                                className="text-2xl font-display font-bold text-white/90 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                            {/* Mobile Services List */}
                            {link.hasDropdown && (
                                <div className="mt-4 flex flex-col items-center gap-3">
                                    {servicesList.slice(0, 3).map(service => (
                                        <Link key={service.id} href={`/services/${service.id}`} className="text-zinc-500 text-sm">{service.title}</Link>
                                    ))}
                                    <Link href="/services" className="text-accent-blue text-sm mt-2">View All Services</Link>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex flex-col space-y-4 mt-8 w-full px-12">
                        <Link href="/contact" className="w-full">
                            <Button className="w-full rounded-full bg-white text-black h-12 text-xs uppercase tracking-widest font-bold">
                                Hire Talent
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
