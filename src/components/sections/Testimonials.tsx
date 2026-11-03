"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
} from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/* ── Data ────────────────────────────────────────────────────────── */
interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  initials: string;
  accent: string; // tailwind bg class for avatar
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Roadtrip made my entire Japan relocation feel effortless. Visa sorted, flights booked, housing arranged — I just had to show up. Genuinely the smoothest move I've ever made.",
    name: "Amara Osei",
    role: "Software Engineer, relocated to Tokyo",
    initials: "AO",
    accent: "bg-brand-blue",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "The Santorini package was absolutely dreamy. Every detail was personalised — from the cliff-side dinner to the private catamaran. Worth every cent and then some.",
    name: "Sophie Laurent",
    role: "Marketing Director, Paris",
    initials: "SL",
    accent: "bg-emerald-500",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "We sent a 20-person corporate team to Singapore and the logistics were flawless. Group visas, hotel blocks, airport transfers — all handled without us lifting a finger.",
    name: "Rajiv Menon",
    role: "Operations Manager, Bengaluru",
    initials: "RM",
    accent: "bg-violet-500",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "I joined the Language Exchange programme and met my current best friends. Weekly meetups with native Japanese speakers gave me confidence I couldn't get from any app.",
    name: "Elena Vasquez",
    role: "Graduate Student, Buenos Aires",
    initials: "EV",
    accent: "bg-rose-500",
    rating: 5,
  },
  {
    id: 5,
    quote:
      "From the first enquiry to landing back home, 24/7 support was real — I had a question at 2 am and someone answered within minutes. That kind of care is rare.",
    name: "David Kimani",
    role: "Freelance Photographer, Nairobi",
    initials: "DK",
    accent: "bg-amber-500",
    rating: 5,
  },
];

/* ── Helpers ─────────────────────────────────────────────────────── */
const AUTOPLAY_MS = 6000;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={15}
          className="fill-amber-400 text-amber-400"
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

/* ── TestimonialCard ─────────────────────────────────────────────── */
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className="relative flex flex-col justify-between gap-6 rounded-2xl bg-white
                 border border-slate-100 shadow-sm p-8 h-full select-none"
    >
      {/* Quote icon */}
      <Quote
        size={32}
        className="absolute top-6 right-6 text-brand-blue/20 fill-brand-blue/10"
        strokeWidth={1}
      />

      {/* Stars + quote */}
      <div className="flex flex-col gap-4">
        <StarRow count={t.rating} />
        <p className="text-[15px] leading-relaxed text-brand-muted italic">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center
                      text-white font-semibold text-sm flex-shrink-0 ${t.accent}`}
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-ink leading-tight">
            {t.name}
          </p>
          <p className="text-xs text-brand-muted leading-tight">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Carousel ────────────────────────────────────────────────────── */
const SLIDE_VARIANTS: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

export default function Testimonials() {
  /* How many cards visible depends on viewport — we track via CSS cols
     and just paginate by 1 slot; the grid collapses on small screens.  */
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const total = TESTIMONIALS.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex(clamp(((next % total) + total) % total, 0, total - 1));
    },
    [total]
  );

  const prev = useCallback(() => go(index - 1, -1), [index, go]);
  const next = useCallback(() => go(index + 1, 1), [index, go]);

  /* Autoplay */
  useEffect(() => {
    if (paused || reduced) return;
    timerRef.current = setTimeout(() => go(index + 1, 1), AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [index, paused, reduced, go]);

  /* Keyboard */
  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [prev, next]
  );

  /* Visible window: desktop shows 3, tablet 2, mobile 1
     We cycle through indices 0..4 and show up to 3 starting from `index`. */
  const visibleIndices = [0, 1, 2].map((offset) => (index + offset) % total);

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        {/* Heading */}
        <SectionHeading
          eyebrow="TESTIMONIALS"
          title="STORIES FROM OUR TRAVELERS"
          subtitle="Real experiences from the people who trusted us with their journeys."
          centered
        />

        {/* Carousel container */}
        <div
          className="mt-14 outline-none"
          role="region"
          aria-label="Testimonials carousel"
          tabIndex={0}
          onKeyDown={handleKey}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Cards grid */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.div
                key={index}
                custom={direction}
                variants={reduced ? undefined : SLIDE_VARIANTS}
                initial={reduced ? undefined : "enter"}
                animate={reduced ? undefined : "center"}
                exit={reduced ? undefined : "exit"}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -40) {
                    next();
                  } else if (info.offset.x > 40) {
                    prev();
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-grab active:cursor-grabbing"
              >
                {/* Desktop: 3 cards; tablet: 2; mobile: 1 */}
                {visibleIndices.map((tIdx, slot) => (
                  <div
                    key={TESTIMONIALS[tIdx].id}
                    className={
                      slot === 1
                        ? "hidden md:block"
                        : slot === 2
                          ? "hidden lg:block"
                          : ""
                    }
                  >
                    <TestimonialCard t={TESTIMONIALS[tIdx]} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-10 flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border
                         border-slate-200 bg-white text-brand-ink shadow-sm
                         hover:bg-brand-blue hover:text-white hover:border-brand-blue
                         transition-colors duration-200 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronLeft size={20} strokeWidth={2} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Slide indicators">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none
                              focus-visible:ring-2 focus-visible:ring-brand-blue
                              ${i === index
                                ? "w-6 bg-brand-blue"
                                : "w-2 bg-slate-300 hover:bg-slate-400"
                              }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border
                         border-slate-200 bg-white text-brand-ink shadow-sm
                         hover:bg-brand-blue hover:text-white hover:border-brand-blue
                         transition-colors duration-200 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-brand-blue"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
