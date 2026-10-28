"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Container from "@/components/ui/Container";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Staggered fade-up variants for typography & CTA
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUpVariant: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className="relative w-full min-h-[560px] h-[85vh] max-h-[760px] flex items-end overflow-hidden bg-[#1a1410]"
      aria-label="Hero - Roadtrip"
    >
      {/* 
        BACKGROUND IMAGE
        - Ideal asset specifications: 2400 x 1350 px (16:9), optimized JPEG/WebP.
        - Fallback bg color #1a1410 matches the dark tone of the airplane cabin while loading.
        - Animated slow scale from 1.05 to 1.0 on mount (reduced motion respected).
      */}
      <motion.div
        className="absolute inset-0 z-0 select-none pointer-events-none"
        initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <Image
          src="/images/hero.jpg"
          alt="Woman traveler enjoying coffee and tablet next to bright airplane window"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_right]"
        />
      </motion.div>

      {/* 
        MULTI-LAYER DARK GRADIENT OVERLAYS:
        1. Left-to-right black/60% fading to transparent around 65% for left-aligned text legibility.
        2. Bottom-to-top black/70% fading to transparent across lower 50% for baseline contrast.
        3. Top vignette black/50% behind fixed navbar.
      */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.65)_0%,rgba(0,0,0,0.50)_35%,rgba(0,0,0,0)_65%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_top,rgba(0,0,0,0.70)_0%,rgba(0,0,0,0.35)_25%,rgba(0,0,0,0)_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.20)_12%,rgba(0,0,0,0)_25%)]"
        aria-hidden="true"
      />

      {/* HERO CONTENT: Bottom-aligned to left, ~64px from the bottom */}
      <Container className="relative z-10 w-full pb-16 pt-24">
        <motion.div
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text Block */}
          <div className="max-w-[700px] text-left">
            {/* 1. Eyebrow */}
            <motion.p
              variants={fadeUpVariant}
              className="text-[13px] md:text-[14px] font-semibold uppercase tracking-[0.12em] text-white"
            >
              EXPLORE THE WORLD WITH CONFIDENCE
            </motion.p>

            {/* 2. H1 Headline (Two lines) */}
            <motion.h1
              variants={fadeUpVariant}
              className="mt-3 text-3xl sm:text-4xl md:text-[50px] lg:text-[56px] font-extrabold uppercase tracking-tight text-white leading-[1.1]"
            >
              DISCOVER EXTRAORDINARY
              <br />
              JOURNEYS WITH ROADTRIP
            </motion.h1>

            {/* 3. Subtitle Paragraph */}
            <motion.p
              variants={fadeUpVariant}
              className="mt-4 text-[16px] leading-[1.6] text-white/90 max-w-[480px]"
            >
              From unforgettable vacations and customized tours to business travel and visa assistance, Roadtrip helps you explore the world with confidence, comfort, and expert planning.
            </motion.p>
          </div>

          {/* 4. Bottom-Right CTA: Baseline aligned on desktop, stacked on mobile */}
          <motion.div
            variants={fadeUpVariant}
            className="w-full sm:w-auto flex justify-start lg:justify-end shrink-0"
          >
            <Link
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-navy font-bold uppercase text-[13px] md:text-[14px] tracking-wider rounded-md shadow-lg hover:shadow-xl hover:bg-slate-50 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              PLAN YOUR TRIP
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;
