"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from "framer-motion";
import { Users, Globe, BadgeCheck, Headphones, type LucideIcon } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface StatItem {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
  ariaLabel: string;
}

const STATS_DATA: StatItem[] = [
  {
    icon: Users,
    value: 15,
    suffix: "K+",
    label: "Happy Travelers",
    ariaLabel: "15 thousand plus happy travelers",
  },
  {
    icon: Globe,
    value: 40,
    suffix: "+",
    label: "Countries Covered",
    ariaLabel: "40 plus countries covered",
  },
  {
    icon: BadgeCheck,
    value: 98,
    suffix: "%",
    label: "Visa Success Rate",
    ariaLabel: "98 percent visa success rate",
  },
  {
    icon: Headphones,
    value: 24,
    suffix: "/7",
    label: "Expert Support",
    ariaLabel: "24 hours 7 days expert support",
  },
];

/**
 * Animated number counter that increments smoothly when scrolled into view
 */
function StatNumber({
  value,
  suffix,
  isInView,
}: {
  value: number;
  suffix: string;
  isInView: boolean;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: shouldReduceMotion ? 0.01 : 1.6,
      ease: [0.16, 1, 0.3, 1], // Smooth ease-out
      onUpdate(latest) {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span className="tabular-nums font-extrabold text-[40px] text-brand-blue leading-none">
      {displayValue}
      {suffix}
    </span>
  );
}

export function TrustedPartner() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sky relative z-10"
      aria-label="Who We Are - Your Trusted Travel Partner"
    >
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow="WHO WE ARE"
          title="YOUR TRUSTED TRAVEL PARTNER FOR EVERY JOURNEY"
          subtitle="From first-time travelers to global companies, Roadtrip handles flights, hotels, visas and local support so you can focus on the journey."
          align="center"
          theme="light"
          className="max-w-3xl"
        />

        {/* 4-Column Stats Row (2 columns on mobile) */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS_DATA.map((stat) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-md shadow-brand-blue/5 hover:shadow-xl hover:shadow-brand-blue/10 border border-slate-100 hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Pale blue circular icon container */}
                <div
                  className="w-12 h-12 rounded-full bg-brand-sky border border-brand-blue/15 flex items-center justify-center text-brand-blue mb-4 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Animated Stat Value */}
                <div className="mb-2" aria-label={stat.ariaLabel}>
                  <StatNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                </div>

                {/* Stat Label */}
                <span className="text-sm md:text-base font-semibold text-brand-ink leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default TrustedPartner;
