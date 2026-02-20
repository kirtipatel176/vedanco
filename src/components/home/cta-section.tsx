"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = /\S+@\S+\.\S+/.test(email);

    if (!isValid) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 md:p-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs font-space-mono uppercase tracking-[0.3em] text-zinc-400">Call To Action</p>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white">
              Build your next chapter with Vedanco.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed">
              Share your goals and we will map the path, from strategy to execution. Expect a tailored response within 24 hours.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <Button className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest">
                  Request a Proposal
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="h-12 px-8 rounded-full border-white/20 text-white hover:bg-white/10 text-xs font-bold uppercase tracking-widest">
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="newsletter" className="text-xs uppercase tracking-[0.3em] text-zinc-400">
                Newsletter Signup
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                id="newsletter"
                name="newsletter"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your work email"
                className="bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-white/30 h-12 rounded-full"
              />
              <Button
                type="submit"
                className="h-12 px-8 rounded-full bg-white text-black hover:bg-zinc-200 text-xs font-bold uppercase tracking-widest"
              >
                Subscribe
              </Button>
            </div>
            {status === "success" && (
              <p className="text-xs text-emerald-300">Thanks for subscribing. We will be in touch soon.</p>
            )}
            {status === "error" && (
              <p className="text-xs text-rose-300">Please enter a valid email address.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
