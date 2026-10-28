"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { CheckCircle2, ArrowRight, Plane } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const bannerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(bannerRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // TODO: Connect to /api/quote route for backend persistence
    setError("");
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="my-20 md:my-28">
      <Container>
        <motion.div
          ref={bannerRef}
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 40 }
          }
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden shadow-2xl bg-brand-navy"
        >
          {/* Background Image */}
          <Image
            src="/images/cta.jpg"
            alt="Scenic aerial view of clouds and travel horizons"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-center"
            priority={false}
          />

          {/* Blue Gradient Overlay (echoing brand button gradient: #0A57A3 to #0A94F0) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0A57A3]/92 via-[#0A7BDB]/80 to-[#0A94F0]/65 backdrop-brightness-95"
            aria-hidden="true"
          />

          {/* Decorative Dotted Plane Flight Path SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M-50,420 C180,440 320,180 580,240 C780,290 880,100 1050,60"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle cx="580" cy="240" r="4" fill="white" />
            <circle cx="320" cy="300" r="3" fill="white" opacity="0.6" />
          </svg>

          {/* Decorative Floating Glow Circles */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-brand-blueLight/25 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Content Container */}
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-20 md:py-24 max-w-3xl mx-auto text-center flex flex-col items-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-6">
              <Plane className="w-3.5 h-3.5 text-brand-sky" />
              <span>READY WHEN YOU ARE</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-white leading-[1.08] mb-5">
              YOUR NEXT JOURNEY STARTS HERE
            </h2>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal max-w-2xl mb-10">
              Whether it’s a bespoke holiday, a seamless corporate trip, or
              taking the leap into a new career in Japan — our travel experts
              are here to guide every step.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10">
              <Button
                variant="white"
                size="lg"
                href="#tours"
                className="w-full sm:w-auto font-bold tracking-wider"
              >
                PLAN YOUR TRIP
              </Button>

              <Link
                href="#consultation"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-bold uppercase tracking-wider rounded-lg border-2 border-white text-white hover:bg-white/15 transition-all hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
              >
                TALK TO AN EXPERT
              </Link>
            </div>

            {/* Compact Inline Contact Form */}
            <div className="w-full max-w-lg">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
                  <span>
                    Thank you! Our travel expert will contact you within 24 hours.
                  </span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="w-full"
                >
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl sm:rounded-full p-1.5 shadow-xl transition-all focus-within:border-white/60 focus-within:ring-2 focus-within:ring-white/30">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Enter your email address..."
                      aria-label="Email address for a free quote"
                      className="w-full bg-transparent px-5 py-3 text-sm text-white placeholder-white/75 focus:outline-none"
                    />

                    <button
                      type="submit"
                      className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl sm:rounded-full bg-white text-brand-navy font-bold text-xs uppercase tracking-wider shadow-md hover:bg-slate-100 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer mt-2 sm:mt-0"
                    >
                      <span>Get a free quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {error && (
                    <p className="mt-2 text-xs text-rose-200 font-medium text-center">
                      {error}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
