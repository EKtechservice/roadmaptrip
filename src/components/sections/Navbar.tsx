"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Briefcase,
  Calendar,
  ChevronDown,
  Menu,
  X,
  Phone,
  Mail,
  ArrowRight,
  Globe,
  Sparkles,
} from "lucide-react";

interface SubItem {
  name: string;
  desc: string;
  href: string;
  badge?: string;
}

interface NavItem {
  title: string;
  href?: string;
  badge?: string;
  highlight?: boolean;
  subItems?: SubItem[];
}

const navItems: NavItem[] = [
  {
    title: "Tours & Travel",
    href: "#tours",
    subItems: [
      {
        name: "Signature Group Tours",
        desc: "Curated itineraries with local bilingual guides",
        href: "#group-tours",
      },
      {
        name: "Custom Expeditions",
        desc: "Bespoke travel designed around your bucket list",
        href: "#custom-tours",
      },
      {
        name: "Weekend Getaways",
        desc: "Quick, rejuvenating nature and city escapes",
        href: "#weekend-tours",
      },
    ],
  },
  {
    title: "Work in Japan",
    href: "#work-japan",
    badge: "2026 Intake",
    highlight: true,
    subItems: [
      {
        name: "Specified Skilled Worker (SSW)",
        desc: "Visas & guaranteed placements in hospitality, caregiving, and culinary",
        href: "#ssw-japan",
        badge: "High Demand",
      },
      {
        name: "Engineering & IT Careers",
        desc: "Tokyo & Osaka tech opportunities with visa sponsorship",
        href: "#tech-japan",
      },
      {
        name: "Internship Programs",
        desc: "6-12 month paid hospitality & business internships",
        href: "#internships-japan",
      },
    ],
  },
  {
    title: "Language Exchange",
    href: "#language-exchange",
    subItems: [
      {
        name: "Japanese Immersion Camp",
        desc: "Accelerated JLPT prep with native speaker host families",
        href: "#japanese-exchange",
      },
      {
        name: "Global English Exchange",
        desc: "Cultural tandem partner programs and weekend cafes",
        href: "#english-exchange",
      },
    ],
  },
  {
    title: "Destinations",
    href: "#destinations",
  },
  {
    title: "About Us",
    href: "#about",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileSubmenu = (title: string) => {
    setMobileExpandedSection(mobileExpandedSection === title ? null : title);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner / Announcement Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3 h-3" /> 2026 Cohorts
            </span>
            <p className="text-slate-300">
              Japan SSW Employment & Language Exchange applications are now open!
            </p>
          </div>
          <div className="flex items-center gap-5 text-slate-400">
            <a
              href="tel:+18007623874"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              <span>+1 (800) 762-3874</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href="mailto:contact@roadtriptravel.com"
              className="hidden sm:flex hover:text-emerald-400 transition-colors items-center gap-1.5"
            >
              <Mail className="w-3 h-3" />
              <span>contact@roadtriptravel.com</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-[11px]">EN</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400 hover:text-slate-200 cursor-pointer text-[11px]">日本語</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200/80 dark:border-slate-800/80"
            : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm py-4 border-b border-slate-200/50 dark:border-slate-800/50"
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <Compass className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                  Roadtrip
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase text-slate-500 dark:text-slate-400">
                  Tours • Japan Work • Exchange
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.subItems && setActiveDropdown(item.title)}
                  onMouseLeave={() => item.subItems && setActiveDropdown(null)}
                >
                  <Link
                    href={item.href || "#"}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.highlight
                        ? "text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                        : "text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                    }`}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                          activeDropdown === item.title ? "rotate-180 text-emerald-500" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Desktop Dropdown Menu */}
                  {item.subItems && (
                    <AnimatePresence>
                      {activeDropdown === item.title && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute left-0 mt-1 w-80 rounded-2xl bg-white dark:bg-slate-900 p-2.5 shadow-xl shadow-slate-950/10 dark:shadow-black/50 border border-slate-100 dark:border-slate-800 z-50"
                        >
                          <div className="space-y-1">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="group flex flex-col p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {sub.name}
                                  </span>
                                  {sub.badge && (
                                    <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-md">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                                  {sub.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="#consultation"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <span>Free Assessment</span>
              </Link>
              <Link
                href="#apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 rounded-xl shadow-md shadow-emerald-600/25 hover:shadow-lg hover:shadow-emerald-600/35 active:scale-95 transition-all duration-200"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="#apply"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg shadow-sm"
              >
                Apply
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-3 shadow-2xl"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.title} className="border-b border-slate-100 dark:border-slate-800/50 pb-1">
                    {item.subItems ? (
                      <div>
                        <button
                          type="button"
                          onClick={() => toggleMobileSubmenu(item.title)}
                          className="w-full flex items-center justify-between py-2 text-left text-sm font-semibold text-slate-800 dark:text-slate-100"
                        >
                          <div className="flex items-center gap-2">
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${
                              mobileExpandedSection === item.title ? "rotate-180 text-emerald-500" : ""
                            }`}
                          />
                        </button>
                        {mobileExpandedSection === item.title && (
                          <div className="pl-3 pr-1 py-1 space-y-2 mb-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                            {item.subItems.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                              >
                                <div className="font-semibold flex items-center justify-between">
                                  <span>{sub.name}</span>
                                  {sub.badge && (
                                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1 py-0.2 rounded">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{sub.desc}</div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={item.href || "#"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="pt-2 space-y-2">
                <Link
                  href="#apply"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-500 rounded-xl shadow-md"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Apply for Japan Program</span>
                </Link>
                <Link
                  href="#consultation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Book Free 1-on-1 Consultation</span>
                </Link>
              </div>

              {/* Mobile Language and Contact details */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Language: </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">English (EN)</span>
                  <span>|</span>
                  <span className="hover:text-emerald-500 cursor-pointer">日本語</span>
                </div>
                <div className="flex items-center gap-1 text-[11px]">
                  <Phone className="w-3 h-3 text-emerald-500" />
                  <span>+1 (800) 762-3874</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
