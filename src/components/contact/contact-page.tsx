"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.email({ message: "Please enter a valid email address." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = form;

    async function onSubmit(data: ContactFormValues) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to send message");
            }

            toast.success("Message sent successfully!", {
                description: "We'll get back to you as soon as possible.",
            });
            reset();
        } catch (error: unknown) {
            console.error("Error sending message:", error);
            toast.error("Failed to send message", {
                description: error instanceof Error ? error.message : "Please try again later.",
            });
        }
    }

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                {/* Left Column: Contact Info */}
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={staggerChildren}
                    className="space-y-12"
                >
                    <motion.div variants={fadeInUp} className="space-y-6">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            Let&apos;s talk
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-lg leading-relaxed">
                            Have a project in mind or just want to explore what&apos;s possible? We&apos;re here to help you build the extraordinary.
                        </p>
                    </motion.div>

                    {/* Contact Details */}
                    <motion.div variants={fadeInUp} className="space-y-8">
                        <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-1">Email Us</h3>
                                <a href="mailto:hello@vedanco.com" className="text-zinc-400 hover:text-white transition-colors">
                                    hello@vedanco.com
                                </a>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-1">Visit Us</h3>
                                <p className="text-zinc-400">
                                    Global Headquarters<br />
                                    San Francisco, CA
                                </p>
                            </div>
                        </div>

                        <div className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/5 transition-colors duration-300">
                            <div className="p-3 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                <ExternalLink className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white mb-1">Socials</h3>
                                <div className="flex space-x-4 mt-2">
                                    <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Twitter</Link>
                                    <Link href="#" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</Link>
                                    <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Instagram</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
                        {/* Decorative glint */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <h2 className="text-2xl font-semibold text-white mb-6">Send us a message</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
                                    <Input
                                        {...register("name")}
                                        id="name"
                                        placeholder="John Doe"
                                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-1 focus:ring-white/30 h-12 rounded-xl"
                                    />
                                    {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
                                    <Input
                                        {...register("email")}
                                        id="email"
                                        type="email"
                                        placeholder="john@example.com"
                                        className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-1 focus:ring-white/30 h-12 rounded-xl"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-zinc-400">Subject</label>
                                <Input
                                    {...register("subject")}
                                    id="subject"
                                    placeholder="How can we help?"
                                    className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-1 focus:ring-white/30 h-12 rounded-xl"
                                />
                                {errors.subject && <p className="text-red-400 text-xs">{errors.subject.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
                                <Textarea
                                    {...register("message")}
                                    id="message"
                                    placeholder="Tell us about your project..."
                                    className="bg-zinc-800/50 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 focus:ring-1 focus:ring-white/30 min-h-[150px] resize-none rounded-xl"
                                />
                                {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full h-12 bg-white text-black hover:bg-zinc-200 rounded-xl font-medium text-base transition-all duration-300 group"
                            >
                                {isSubmitting ? (
                                    "Sending..."
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        Send Message
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
