"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Map,
  Wallet,
  FileCheck,
  Headphones,
  Handshake,
  Armchair,
  LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Feature data ─────────────────────────────────────────────────── */
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Map,
    title: "Expert Planning",
    description:
      "Our seasoned travel experts craft every detail of your itinerary so nothing is left to chance.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden fees, ever. You see the full breakdown before you commit — what you see is what you pay.",
  },
  {
    icon: FileCheck,
    title: "Visa Assistance",
    description:
      "We handle the paperwork maze: applications, document checks, and embassy follow-ups end-to-end.",
  },
  {
    icon: Headphones,
    title: "24 / 7 Support",
    description:
      "Day or night, wherever you are in the world, a real person is always one call or message away.",
  },
  {
    icon: Handshake,
    title: "Trusted Partners",
    description:
      "We work only with vetted airlines, hotels, and operators that meet our strict quality standards.",
  },
  {
    icon: Armchair,
    title: "Comfort First",
    description:
      "From premium seats to hand-picked accommodations, your comfort is the baseline — not the upgrade.",
  },
];

/* ── Animation variants ───────────────────────────────────────────── */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ── FeatureCard ──────────────────────────────────────────────────── */
function FeatureCard({
  feature,
  reduced,
}: {
  feature: Feature;
  reduced: boolean;
}) {
  const Icon = feature.icon;

  return (
    <motion.article
      variants={reduced ? undefined : cardVariants}
      whileHover={reduced ? undefined : { y: -6, transition: { duration: 0.25 } }}
      className="group relative flex flex-col gap-5 rounded-2xl bg-white p-7 shadow-sm
                 border border-transparent hover:border-brand-blue/20
                 hover:shadow-[0_12px_40px_-8px_rgba(10,123,219,0.18)]
                 transition-[border-color,box-shadow] duration-300 cursor-default"
    >
      {/* Icon container */}
      <div
        className="relative flex h-12 w-12 items-center justify-center rounded-xl
                   bg-brand-gradient text-white flex-shrink-0
                   transition-transform duration-300
                   group-hover:rotate-6 group-hover:scale-105"
      >
        <Icon size={22} strokeWidth={2} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold text-brand-ink leading-snug">
          {feature.title}
        </h3>
        <p className="text-sm text-brand-muted leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.article>
  );
}

/* ── WhyChooseUs ─────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="bg-brand-sky py-20 md:py-28">
      <Container>
        {/* Heading */}
        <SectionHeading
          eyebrow="WHY CHOOSE US"
          title="WHY TRAVELERS CHOOSE ROADTRIP"
          subtitle="Six reasons why thousands of travelers and companies trust us to handle every step of their journey."
          centered
        />

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={reduced ? undefined : containerVariants}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : inView ? "visible" : "hidden"}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} reduced={reduced} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
