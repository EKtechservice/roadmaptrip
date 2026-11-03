"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  BadgeCheck,
  ChevronRight,
  CheckCircle2,
  ShieldCheck,
  Home as HomeIcon,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";

interface TimelineStep {
  number: number;
  title: string;
  description: string;
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    number: 1,
    title: "Create your profile",
    description: "Submit your CV, skill background, and Japanese language level (JLPT).",
  },
  {
    number: 2,
    title: "Get matched with employers",
    description: "Interview directly with pre-screened Japanese corporations and hospitality groups.",
  },
  {
    number: 3,
    title: "Visa & documents handled",
    description: "Our certified immigration team secures your Certificate of Eligibility (COE) and visa.",
  },
  {
    number: 4,
    title: "Fly and start working",
    description: "Relocation assistance, airport pickup, housing support, and bilingual onboarding.",
  },
];

interface JobOpening {
  id: string;
  initial: string;
  bgColor: string;
  title: string;
  company: string;
  city: string;
  type: string;
  salary: string;
  href: string;
}

const LATEST_JOBS: JobOpening[] = [
  {
    id: "job-1",
    initial: "R",
    bgColor: "bg-red-500/20 text-red-300 border-red-500/30",
    title: "Bilingual Frontend Engineer",
    company: "Rakuten Group",
    city: "Tokyo",
    type: "Full-time",
    salary: "¥5.5M – ¥7.8M / yr",
    href: "#job-rakuten",
  },
  {
    id: "job-2",
    initial: "H",
    bgColor: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    title: "Hospitality Guest Lead (SSW)",
    company: "Hilton International",
    city: "Kyoto",
    type: "Full-time",
    salary: "¥3.4M – ¥4.2M / yr",
    href: "#job-hilton",
  },
  {
    id: "job-3",
    initial: "S",
    bgColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Operations & Logistics Associate",
    company: "Sony Interactive",
    city: "Osaka",
    type: "Contract",
    salary: "¥4.0M – ¥5.2M / yr",
    href: "#job-sony",
  },
  {
    id: "job-4",
    initial: "N",
    bgColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    title: "Mechanical / CAD Technician",
    company: "Nagoya Auto Tech",
    city: "Nagoya",
    type: "Full-time",
    salary: "¥3.6M – ¥4.8M / yr",
    href: "#job-nagoya",
  },
];

export function EmploymentJapan() {
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

  const itemVariants: Variants = {
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
      className="relative py-20 md:py-28 bg-gradient-to-br from-[#0B3B6E] via-[#09325D] to-[#07264A] text-white overflow-hidden z-10"
      aria-label="Employment in Japan - Build Your Career"
      id="employment-in-japan"
    >
      {/* Subtle Japan-inspired Seigaiha wave pattern overlay at 5% opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-5 pointer-events-none select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="seigaiha"
            width="60"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 30 A30 30 0 0 1 60 30 M10 30 A20 20 0 0 1 50 30 M20 30 A10 10 0 0 1 40 30 M-30 15 A30 30 0 0 1 30 15 M-20 15 A20 20 0 0 1 20 15 M-10 15 A10 10 0 0 1 10 15 M30 15 A30 30 0 0 1 90 15 M40 15 A20 20 0 0 1 80 15 M50 15 A10 10 0 0 1 70 15"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#seigaiha)" />
      </svg>

      {/* Ambient background glow */}
      <div
        className="absolute -top-32 right-10 w-96 h-96 bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* LEFT COLUMN: Headings, Timeline & CTAs (col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-blueLight flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                EMPLOYMENT IN JAPAN
              </span>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-[1.1]">
                BUILD YOUR CAREER IN JAPAN
              </h2>

              <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl">
                We connect skilled professionals with verified employers across Japan and guide you through every step: visa, flights, housing and settling in.
              </p>
            </motion.div>

            {/* Vertical 4-Step Timeline */}
            <motion.div variants={itemVariants} className="relative pt-2">
              {/* Continuous vertical connecting line */}
              <div
                className="absolute left-[18px] top-6 bottom-6 w-[2px] bg-white/20"
                aria-hidden="true"
              />

              <div className="space-y-6 relative">
                {TIMELINE_STEPS.map((step) => (
                  <div key={step.number} className="flex items-start gap-4 group">
                    {/* Numbered circle */}
                    <div
                      className="w-9 h-9 rounded-full bg-brand-blue text-white font-extrabold text-sm flex items-center justify-center shrink-0 border-2 border-[#0B3B6E] shadow-md group-hover:scale-105 transition-transform duration-200 z-10"
                      aria-hidden="true"
                    >
                      {step.number}
                    </div>

                    {/* Step Content */}
                    <div className="pt-0.5">
                      <h3 className="text-base font-bold text-white tracking-wide group-hover:text-brand-blueLight transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-sm text-white/75 leading-relaxed mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <Link
                href="#browse-jobs"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-brand-navy font-bold uppercase text-xs md:text-sm tracking-wider rounded-md shadow-lg hover:bg-slate-100 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
              >
                BROWSE JOBS
              </Link>

              <Link
                href="#advisor"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-transparent border-2 border-white text-white font-bold uppercase text-xs md:text-sm tracking-wider rounded-md hover:bg-white/10 hover:border-white transition-all duration-200 text-center"
              >
                TALK TO AN ADVISOR
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Glassmorphism Openings Card (col-span-5) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            {/* Floating Top Badge */}
            <div className="flex justify-end -mb-3.5 mr-6 relative z-20">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold backdrop-blur-md shadow-lg -rotate-2 select-none">
                <BadgeCheck className="w-4 h-4 text-emerald-400" />
                <span>Visa sponsorship available</span>
              </div>
            </div>

            {/* Glass-morphism Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl relative z-10">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-5 border-b border-white/15">
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Latest Openings
                  </h3>
                  <p className="text-xs text-white/60 mt-0.5">Updated daily with verified employers</p>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-400/30">
                  40+ Roles
                </span>
              </div>

              {/* Job Rows */}
              <div className="divide-y divide-white/10 mt-2">
                {LATEST_JOBS.map((job) => (
                  <Link
                    key={job.id}
                    href={job.href}
                    className="group block p-3.5 -mx-1.5 rounded-xl hover:bg-white/15 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blueLight"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Company Initial Avatar */}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${job.bgColor}`}
                          aria-hidden="true"
                        >
                          {job.initial}
                        </div>

                        {/* Title & Company */}
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white truncate group-hover:text-brand-blueLight transition-colors">
                            {job.title}
                          </h4>
                          <p className="text-xs text-white/70 truncate mt-0.5">
                            {job.company} • <span className="text-white/90 font-medium">{job.city}</span>
                          </p>
                        </div>
                      </div>

                      {/* Chevron */}
                      <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                    </div>

                    {/* Bottom Metadata: Tag & Salary */}
                    <div className="mt-2.5 flex items-center justify-between text-xs pl-[52px]">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/10">
                        {job.type}
                      </span>
                      <span className="text-emerald-400 font-bold text-xs">
                        {job.salary}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Three Trust Badges Beneath Card */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/75 px-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified employers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Visa support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HomeIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Relocation help</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default EmploymentJapan;
