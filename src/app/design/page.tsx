"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ValidationDemo } from "@/components/demos/validation-demo";
import { toast } from "sonner";
import { Check, AlertTriangle, X, Info, ArrowRight, Zap, Star } from "lucide-react";

export default function DesignSystemPage() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };



    return (
        <div className="min-h-screen bg-bg-primary text-text-primary p-8 md:p-12 space-y-20">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 max-w-4xl"
            >
                <Badge variant="glass" className="mb-4">Design System v1.0</Badge>
                <h1 className="text-5xl md:text-7xl font-playfair font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    Visual Language
                </h1>
                <p className="text-xl text-text-muted max-w-2xl">
                    The core design principles, color palettes, and component library driving the Vedanco application interface.
                </p>
            </motion.div>

            {/* Colors Section */}
            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <h2 className="text-2xl font-space-grotesk tracking-wide uppercase text-white/40">Color Palette</h2>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ColorCard name="Background Primary" hex="#000000" className="bg-bg-primary border border-white/10" />
                    <ColorCard name="Background Secondary" hex="#050505" className="bg-bg-secondary border border-white/10" />
                    <ColorCard name="Surface" hex="#0A0A0A" className="bg-bg-surface border border-white/10" />
                    <ColorCard name="Accent Gold (White)" hex="#FFFFFF" className="bg-accent-gold text-black" />

                    <ColorCard name="Accent Blue" hex="#0000FF" className="bg-accent-blue" />
                    <ColorCard name="Accent Cyan" hex="#00FFFF" className="bg-accent-cyan text-black" />
                    <ColorCard name="Accent Rose" hex="#FF0055" className="bg-accent-rose" />
                    <ColorCard name="Accent Violet" hex="#8B5CF6" className="bg-accent-violet" />
                </div>
            </motion.section>

            {/* Typography Section */}
            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <h2 className="text-2xl font-space-grotesk tracking-wide uppercase text-white/40">Typography</h2>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-8">
                        <div className="text-text-muted">Display / Playfair Display</div>
                        <div className="md:col-span-2 space-y-4">
                            <h1 className="text-6xl font-playfair">Headline Display</h1>
                            <p className="text-text-muted">Used for major section headers and hero text.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-8">
                        <div className="text-text-muted">Headings / DM Sans</div>
                        <div className="md:col-span-2 space-y-4">
                            <h2 className="text-4xl font-dm-sans font-bold">Heading Level 2</h2>
                            <h3 className="text-3xl font-dm-sans font-bold">Heading Level 3</h3>
                            <h4 className="text-2xl font-dm-sans font-bold">Heading Level 4</h4>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-text-muted">Mono / Space Mono</div>
                        <div className="md:col-span-2 space-y-4">
                            <p className="font-space-mono text-sm">const vedanco = &quot;Future of Work&quot;;</p>
                            <p className="font-space-mono text-xs text-text-muted">Used for code snippets, technical data, and badges.</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Components Section */}
            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <h2 className="text-2xl font-space-grotesk tracking-wide uppercase text-white/40">Components & Elements</h2>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                {/* Badges */}
                <div className="space-y-6">
                    <h3 className="text-xl font-dm-sans text-white/80">Badges</h3>
                    <div className="flex flex-wrap gap-4">
                        <Badge>Default</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <Badge variant="glass">Glass</Badge>
                        <Badge variant="it">IT / Tech</Badge>
                        <Badge variant="ai">AI / ML</Badge>
                        <Badge variant="marketing">Marketing</Badge>
                        <Badge variant="branding">Branding</Badge>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        <Badge variant="success"><Check size={12} className="mr-1" /> Success</Badge>
                        <Badge variant="warning"><AlertTriangle size={12} className="mr-1" /> Warning</Badge>
                        <Badge variant="error"><X size={12} className="mr-1" /> Error</Badge>
                        <Badge variant="info"><Info size={12} className="mr-1" /> Info</Badge>
                    </div>
                </div>

                {/* Buttons */}
                <div className="space-y-6 pt-8">
                    <h3 className="text-xl font-dm-sans text-white/80">Buttons</h3>
                    <div className="flex flex-wrap gap-4 items-center">
                        <Button>Default Button</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="secondary" className="bg-red-500 hover:bg-red-600 text-white border-none">Destructive</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="ghost" className="underline">Link</Button>

                        <Button className="rounded-full gap-2">
                            Start Project <ArrowRight size={16} />
                        </Button>

                        <Button size="icon" variant="outline" className="rounded-full">
                            <Zap size={18} />
                        </Button>
                    </div>
                </div>

                {/* Glassmorphism Cards */}
                <div className="space-y-6 pt-8">
                    <h3 className="text-xl font-dm-sans text-white/80">Glassmorphism & Cards</h3>

                    <div className="relative p-8 rounded-3xl overflow-hidden min-h-[400px] flex items-center justify-center">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-bg-surface">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.05),transparent_50%)]" />
                            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-violet/20 rounded-full blur-[100px]" />
                            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-blue/20 rounded-full blur-[100px]" />
                        </div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                            <GlassCard>
                                <CardHeader>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                                        <Zap className="text-accent-gold" size={20} />
                                    </div>
                                    <CardTitle className="text-white">Glass Card</CardTitle>
                                    <CardDescription>Using backdrop-blur and border transparency.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm">
                                        This card sits on top of a vibrant background, picking up subtle hues while maintaining readability through blur.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/10 group">
                                        Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </CardFooter>
                            </GlassCard>

                            <GlassCard>
                                <CardHeader>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                                        <Star className="text-accent-cyan" size={20} />
                                    </div>
                                    <CardTitle className="text-white">Premium Effect</CardTitle>
                                    <CardDescription>Interactive hover states.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 text-sm">
                                        Hover over this card to see the subtle lift and enhanced glow effect, creating a tactile feel.
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <div className="flex gap-2">
                                        <Badge variant="glass">Premium</Badge>
                                        <Badge variant="ai">AI Powered</Badge>
                                    </div>
                                </CardFooter>
                            </GlassCard>
                        </div>
                    </div>
                </div>

            </motion.section>

            {/* Validation & Feedback Section */}
            <motion.section
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <div className="h-px bg-white/10 flex-1" />
                    <h2 className="text-2xl font-space-grotesk tracking-wide uppercase text-white/40">Validation & Feedback</h2>
                    <div className="h-px bg-white/10 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div>
                        <h3 className="text-xl font-dm-sans text-white/80 mb-6">Form Validation</h3>
                        <ValidationDemo />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-dm-sans text-white/80 mb-6">Toast Notifications</h3>
                        <div className="flex flex-col gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => toast.success("Success Notification", { description: "Operation completed successfully." })}
                                className="justify-start hover:bg-green-500/10 hover:border-green-500/30 transition-all group"
                            >
                                <Check className="mr-2 h-4 w-4 text-green-500 group-hover:scale-110 transition-transform" /> Trigger Success Toast
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => toast.error("Error Notification", { description: "Something went wrong. Please try again." })}
                                className="justify-start hover:bg-red-500/10 hover:border-red-500/30 transition-all group"
                            >
                                <X className="mr-2 h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" /> Trigger Error Toast
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => toast.info("Info Notification", { description: "Here is some useful information." })}
                                className="justify-start hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group"
                            >
                                <Info className="mr-2 h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform" /> Trigger Info Toast
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => toast.warning("Warning Notification", { description: "Please be careful with this action." })}
                                className="justify-start hover:bg-yellow-500/10 hover:border-yellow-500/30 transition-all group"
                            >
                                <AlertTriangle className="mr-2 h-4 w-4 text-yellow-500 group-hover:scale-110 transition-transform" /> Trigger Warning Toast
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

function ColorCard({ name, hex, className }: Readonly<{ name: string, hex: string, className?: string }>) {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            className={`p-6 rounded-2xl h-40 flex flex-col justify-between shadow-lg ${className}`}
        >
            <div className="flex justify-between items-start">
                <span className="font-space-mono text-xs opacity-60 uppercase">{hex}</span>
            </div>
            <div className="font-dm-sans font-medium">{name}</div>
        </motion.div>
    )
}

function GlassCard({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
    return (
        <Card className={`bg-white/5 backdrop-blur-xl border-white/10 text-white shadow-2xl hover:bg-white/10 transition-all duration-300 ${className}`}>
            {children}
        </Card>
    )
}
