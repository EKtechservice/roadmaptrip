"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Star, Heart, ArrowRight } from "lucide-react";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export type RegionFilter = "All" | "Asia" | "Europe" | "Africa" | "Americas";

export interface TourItem {
  id: string;
  title: string;
  location: string;
  region: RegionFilter;
  duration: string;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  image: string;
  href: string;
}

export const TOURS_DATA: TourItem[] = [
  {
    id: "tokyo-kyoto",
    title: "Tokyo & Kyoto Discovery",
    location: "Japan",
    region: "Asia",
    duration: "8 Days",
    price: "$2,450",
    rating: 4.95,
    reviewCount: 142,
    description: "Bullet trains, imperial shrines, culinary alleys, and neon cityscapes.",
    image: "/images/tours/tokyo-kyoto.jpg",
    href: "#tour-tokyo",
  },
  {
    id: "bali-escape",
    title: "Bali Escape",
    location: "Indonesia",
    region: "Asia",
    duration: "7 Days",
    price: "$1,290",
    rating: 4.92,
    reviewCount: 98,
    description: "Lush rice terraces, sacred coastal temples, and private pool villas.",
    image: "/images/tours/bali-escape.jpg",
    href: "#tour-bali",
  },
  {
    id: "santorini-getaway",
    title: "Santorini Getaway",
    location: "Greece",
    region: "Europe",
    duration: "6 Days",
    price: "$1,890",
    rating: 4.89,
    reviewCount: 115,
    description: "Whitewashed caldera cliffs, Aegean catamaran cruises, and golden sunsets.",
    image: "/images/tours/santorini-getaway.jpg",
    href: "#tour-santorini",
  },
  {
    id: "cape-town-adventure",
    title: "Cape Town Adventure",
    location: "South Africa",
    region: "Africa",
    duration: "9 Days",
    price: "$2,150",
    rating: 4.96,
    reviewCount: 84,
    description: "Table Mountain cableways, penguin coves, and world-class wine estates.",
    image: "/images/tours/cape-town-adventure.jpg",
    href: "#tour-capetown",
  },
  {
    id: "swiss-alps-journey",
    title: "Swiss Alps Journey",
    location: "Switzerland",
    region: "Europe",
    duration: "7 Days",
    price: "$2,890",
    rating: 4.98,
    reviewCount: 167,
    description: "Glacier Express panoramic rail, Matterhorn vistas, and alpine lakes.",
    image: "/images/tours/swiss-alps-journey.jpg",
    href: "#tour-swiss",
  },
  {
    id: "dubai-luxury-weekend",
    title: "Dubai Luxury Weekend",
    location: "United Arab Emirates",
    region: "Asia",
    duration: "4 Days",
    price: "$1,450",
    rating: 4.88,
    reviewCount: 76,
    description: "Desert safari glamping, skyline observation decks, and marina yachting.",
    image: "/images/tours/dubai-luxury-weekend.jpg",
    href: "#tour-dubai",
  },
  {
    id: "machu-picchu-explorer",
    title: "Inca Trail & Machu Picchu",
    location: "Peru",
    region: "Americas",
    duration: "8 Days",
    price: "$1,980",
    rating: 4.94,
    reviewCount: 104,
    description: "Sacred Valley trails, ancient citadel discoveries, and Andean folklore.",
    image: "/images/tours/cape-town-adventure.jpg",
    href: "#tour-peru",
  },
];

const FILTERS: RegionFilter[] = ["All", "Asia", "Europe", "Africa", "Americas"];

export function FeaturedTours() {
  const [activeFilter, setActiveFilter] = useState<RegionFilter>("All");
  const [savedTours, setSavedTours] = useState<Record<string, boolean>>({});

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedTours((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredTours =
    activeFilter === "All"
      ? TOURS_DATA
      : TOURS_DATA.filter((tour) => tour.region === activeFilter);

  return (
    <section
      className="py-20 md:py-28 bg-brand-sky relative z-10"
      aria-label="Popular Tours"
      id="tours"
    >
      <Container>
        {/* Header Row: Left-aligned SectionHeading + Right Desktop Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeading
            eyebrow="POPULAR TOURS"
            title="UNFORGETTABLE VACATIONS, CUSTOMIZED FOR YOU"
            align="left"
            theme="light"
            className="max-w-2xl"
          />

          <div className="hidden md:block shrink-0">
            <Button
              variant="outline"
              size="md"
              href="#tours-archive"
              className="font-bold tracking-wider"
            >
              <span>View all tours</span>
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </Button>
          </div>
        </div>

        {/* Filter Pills */}
        <div
          className="flex flex-wrap items-center gap-2.5 mb-10"
          role="tablist"
          aria-label="Filter tours by region"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className={clsx(
                  "px-5 py-2 rounded-full text-sm transition-all duration-200 cursor-pointer select-none",
                  isActive
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/25 font-bold"
                    : "bg-white text-brand-ink/80 hover:text-brand-blue hover:bg-slate-50 border border-slate-200/80 font-medium"
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* 6 Tour Cards Grid (1 col mobile, 2 cols tablet, 3 cols desktop) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredTours.map((tour) => {
              const isSaved = Boolean(savedTours[tour.id]);

              return (
                <motion.article
                  key={tour.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-blue/30 shadow-md hover:shadow-xl hover:shadow-brand-blue/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Top Image (aspect 16/10) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />

                    {/* Duration Badge */}
                    <div className="absolute top-3.5 left-3.5 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-sm pointer-events-none">
                      {tour.duration}
                    </div>

                    {/* Heart "Save" Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleSave(tour.id, e)}
                      className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                      aria-label={isSaved ? `Remove ${tour.title} from favorites` : `Save ${tour.title} to favorites`}
                    >
                      <Heart
                        className={clsx(
                          "w-4 h-4 transition-colors duration-200",
                          isSaved ? "fill-red-500 text-red-500" : "text-slate-600 hover:text-red-500"
                        )}
                      />
                    </button>
                  </div>

                  {/* Body Container */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Location Tag */}
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-blue mb-2">
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{tour.location}</span>
                    </div>

                    {/* Tour Title */}
                    <h3 className="text-[20px] font-bold text-brand-ink leading-snug mb-2 group-hover:text-brand-blue transition-colors duration-200">
                      <Link
                        href={tour.href}
                        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded"
                      >
                        {tour.title}
                      </Link>
                    </h3>

                    {/* One-line Description */}
                    <p className="text-sm text-brand-muted line-clamp-1 mb-5">
                      {tour.description}
                    </p>

                    {/* Divider & Footer Row */}
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      {/* Rating & Review Count */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-brand-ink">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                        <span>{tour.rating.toFixed(1)}</span>
                        <span className="text-slate-400 font-normal">({tour.reviewCount})</span>
                      </div>

                      {/* Price & Book Button */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-[11px] uppercase tracking-wider text-brand-muted block leading-none">
                            From
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-brand-ink leading-tight">
                            {tour.price}
                          </span>
                        </div>

                        <Button
                          variant="primary"
                          size="sm"
                          href="#book"
                          className="px-3.5 py-2 text-xs"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Centered Button on Mobile */}
        <div className="mt-10 flex justify-center md:hidden">
          <Button
            variant="outline"
            size="md"
            href="#tours-archive"
            className="w-full sm:w-auto font-bold tracking-wider"
          >
            <span>View all tours</span>
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedTours;
