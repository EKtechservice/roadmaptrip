"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  Briefcase,
  Palmtree,
  Landmark,
  Languages,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  image: string;
  imageAlt: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    slug: "corporate-travel",
    title: "Corporate Travel",
    description:
      "Seamless business trips, group bookings and visa assistance for teams on the move.",
    href: "/corporate-travel",
    icon: Briefcase,
    image: "/images/services/corporate-travel.jpg",
    imageAlt: "Corporate business team traveling together on an international trip",
  },
  {
    slug: "leisure",
    title: "Leisure",
    description:
      "Customized vacations and curated tours to destinations you'll never forget.",
    href: "/leisure",
    icon: Palmtree,
    image: "/images/services/leisure.jpg",
    imageAlt: "Tropical luxury getaway and curated leisure tour destination",
  },
  {
    slug: "employment-in-japan",
    title: "Employment in Japan",
    description:
      "Find verified jobs in Japan with full support for visas, relocation and settling in.",
    href: "/employment-in-japan",
    icon: Landmark,
    image: "/images/services/employment-in-japan.jpg",
    imageAlt: "Professional working in Japan with Tokyo city skyline in background",
  },
  {
    slug: "language-exchange",
    title: "Language Exchange",
    description:
      "Practice Japanese and English with native speakers and join cultural meetups.",
    href: "/language-exchange",
    icon: Languages,
    image: "/images/services/language-exchange.jpg",
    imageAlt: "Students having a conversational language exchange session",
  },
];

export function Services() {
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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-white relative z-10"
      aria-label="What We Do - Services"
      id="services"
    >
      <Container>
        {/* Section Heading */}
        <SectionHeading
          eyebrow="WHAT WE DO"
          title="EVERYTHING YOU NEED TO GO ABROAD"
          subtitle="Comprehensive solutions for corporate missions, dream getaways, career opportunities in Japan, and global language exchange."
          align="center"
          theme="light"
          className="max-w-3xl"
        />

        {/* 4 Cards Grid (1 on mobile, 2 on tablet, 4 on desktop) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 md:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.slug}
                variants={cardVariants}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-blue/30 shadow-sm hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                {/* Full-bleed Top Image (aspect 4/3) */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* Padded Body */}
                <div className="p-6 flex flex-col flex-1">
                  {/* 44px Rounded Square Icon with Brand Gradient */}
                  <div
                    className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-white mb-4 shadow-sm shadow-brand-blue/20 shrink-0 group-hover:scale-105 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Card Title */}
                  <h3 className="text-[20px] font-bold text-brand-ink leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200">
                    <Link
                      href={service.href}
                      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                    >
                      {service.title}
                    </Link>
                  </h3>

                  {/* 2-line Description */}
                  <p className="text-sm text-brand-muted leading-relaxed line-clamp-2 mb-5 flex-1">
                    {service.description}
                  </p>

                  {/* "Learn more →" Link */}
                  <div className="pt-2 border-t border-slate-100/80">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:text-brand-blueDark transition-colors"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

export default Services;
