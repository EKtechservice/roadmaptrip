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
  CalendarDays,
  Users,
  Video,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: CalendarDays,
    title: "Weekly meetups",
    description:
      "Casual coffee circles, conversation tables, and weekend language cafes.",
  },
  {
    icon: Users,
    title: "Native partners",
    description:
      "1-on-1 tandem matching paired by your shared hobbies, goals, and fluency.",
  },
  {
    icon: Video,
    title: "Online sessions",
    description:
      "Interactive virtual tables and breakout rooms to practice anytime, anywhere.",
  },
  {
    icon: Sparkles,
    title: "Cultural events",
    description:
      "Japanese cooking nights, calligraphy workshops, festival trips, and city walks.",
  },
];

const LANGUAGES = ["English", "日本語", "Français", "Español", "中文"];

const AVATARS = [
  { name: "Kenji", color: "bg-blue-600", initial: "K" },
  { name: "Sarah", color: "bg-emerald-600", initial: "S" },
  { name: "Mateo", color: "bg-amber-600", initial: "M" },
  { name: "Yuki", color: "bg-rose-600", initial: "Y" },
];

export default function LanguageExchange() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const shouldReduceMotion = useReducedMotion();

  const slideLeftVariant: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideRightVariant: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="language-exchange"
      className="py-20 md:py-28 bg-white relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN: Photo Collage & Floating Badge (lg:col-span-6) */}
          <motion.div
            className="lg:col-span-6 relative pb-8 pr-2"
            variants={slideLeftVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Soft decorative background glow */}
            <div
              className="absolute -top-10 -left-10 w-72 h-72 bg-brand-sky rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Collage Container */}
            <div className="relative">
              {/* Photo 1: Primary - Chatting in café */}
              <div className="relative w-[85%] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 z-10">
                <Image
                  src="/images/language/cafe-chat.jpg"
                  alt="People chatting in a café during a language exchange meetup"
                  fill
                  sizes="(max-width: 1024px) 85vw, 40vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Photo 2: Accent top right - Tandem meetup */}
              <div className="hidden sm:block absolute -top-4 right-0 w-36 h-36 rounded-3xl overflow-hidden shadow-lg border-4 border-white bg-slate-100 z-15">
                <Image
                  src="/images/language/tandem-meetup.jpg"
                  alt="Tandem conversation partners practicing languages"
                  fill
                  sizes="144px"
                  className="object-cover"
                />
              </div>

              {/* Photo 3: Overlapping bottom right - Cultural event */}
              <div className="absolute -bottom-6 right-0 sm:right-4 w-[60%] aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 z-20">
                <Image
                  src="/images/language/cultural-event.jpg"
                  alt="Group enjoying a cultural event and workshop together"
                  fill
                  sizes="(max-width: 1024px) 55vw, 28vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Glass Card: 500+ Active Members */}
              <div className="absolute -bottom-2 -left-2 sm:left-4 z-30 bg-white/85 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/60 flex items-center gap-3.5 select-none">
                {/* 4 Overlapping Circular Avatars */}
                <div className="flex -space-x-2.5 overflow-hidden py-0.5">
                  {AVATARS.map((avatar) => (
                    <div
                      key={avatar.name}
                      title={avatar.name}
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full ring-2 ring-white text-white text-xs font-bold shadow-sm ${avatar.color}`}
                    >
                      {avatar.initial}
                    </div>
                  ))}
                </div>

                {/* Badge text */}
                <div className="pr-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs sm:text-sm font-bold text-brand-ink">
                      500+ active members
                    </span>
                  </div>
                  <p className="text-[11px] text-brand-muted font-medium">
                    Practicing this week
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Content, Feature Grid, CTA & Languages (lg:col-span-6) */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            variants={slideRightVariant}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Header Content */}
            <div className="space-y-3">
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-blue">
                LANGUAGE EXCHANGE
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-brand-ink leading-[1.1]">
                LEARN BY TALKING WITH REAL PEOPLE
              </h2>

              <p className="text-base md:text-lg text-brand-muted leading-relaxed">
                Break through the textbook barrier. Connect directly with native
                Japanese speakers and fellow language lovers in friendly,
                structured conversational settings designed to build genuine
                fluency and lasting friendships.
              </p>
            </div>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="p-4 rounded-xl bg-brand-sky/60 border border-brand-blue/10 hover:border-brand-blue/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-brand-blue mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-brand-ink mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Buttons: Primary CTA + Text Link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="md"
                href="#join-community"
                className="font-bold tracking-wider"
              >
                JOIN THE COMMUNITY
              </Button>

              <Link
                href="#events"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-blue hover:text-brand-blueDark transition-colors group px-2 py-2"
              >
                <span>See upcoming events</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Small Languages Chip Row Beneath */}
            <div className="pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider mr-1">
                  Languages:
                </span>
                {LANGUAGES.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-sky text-brand-blue border border-brand-blue/20 shadow-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
