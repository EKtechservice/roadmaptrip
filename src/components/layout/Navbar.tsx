"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { NAV_LINKS, LANGUAGES } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("EN");
  const langDropdownRef = useRef<HTMLDivElement>(null);

  // Scroll detection: > 40px switches to sticky dark navy backdrop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setLangDropdownOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };

    if (langDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [langDropdownOpen]);

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-300 flex items-center select-none",
        isScrolled
          ? "bg-brand-navy/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/25"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <Container className="flex items-center justify-between h-full">
        {/* LEFT ZONE: Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* CENTER ZONE: Desktop Navigation Links (≥1024px) */}
        <nav
          className="hidden lg:flex items-center gap-7 lg:gap-8"
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "relative text-[14px] py-1 font-normal text-white transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded",
                  isActive ? "text-white" : "text-white/90 hover:text-white"
                )}
              >
                <span>{link.label}</span>
                {/* Underline sliding in from left on hover or active */}
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-[2px] bg-brand-blue transition-all duration-300 ease-out",
                    isActive
                      ? "w-full opacity-100"
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  )}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ZONE: Language Selector & CTA Button */}
        <div className="hidden lg:flex items-center gap-3.5">
          {/* Language Selector */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] md:text-[13px] font-medium text-white bg-black/40 backdrop-blur-sm rounded-md border border-white/10 hover:border-white/20 hover:bg-black/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
              aria-label="Select Language"
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{selectedLang}</span>
              <ChevronDown
                className={clsx(
                  "w-3.5 h-3.5 text-white/80 transition-transform duration-200",
                  langDropdownOpen && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>

            {/* Language Dropdown Menu */}
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-1.5 w-28 bg-brand-navy/95 backdrop-blur-md border border-white/15 rounded-md shadow-xl py-1 z-50"
                  role="listbox"
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={selectedLang === lang.code}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={clsx(
                        "w-full text-left px-3 py-1.5 text-xs font-medium transition-colors flex items-center justify-between",
                        selectedLang === lang.code
                          ? "text-brand-blueLight bg-white/10 font-bold"
                          : "text-white/85 hover:text-white hover:bg-white/10"
                      )}
                    >
                      <span>{lang.code}</span>
                      <span className="text-[10px] text-white/50">{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* "CONTACT US" CTA Button */}
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2 text-[13px] font-bold uppercase tracking-wider text-white rounded-lg bg-[linear-gradient(90deg,#0A57A3_0%,#0A94F0_100%)] shadow-[0_0_15px_rgba(10,148,240,0.35)] hover:shadow-[0_0_22px_rgba(10,148,240,0.55)] hover:brightness-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            CONTACT US
          </Link>
        </div>

        {/* MOBILE CONTROLS (<1024px) */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white hover:text-brand-blueLight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-md transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {/* MOBILE FULL-HEIGHT SLIDE-IN DRAWER (<1024px) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-brand-navy border-l border-white/10 z-50 p-6 flex flex-col justify-between shadow-2xl lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <Logo showLink={false} />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-white/80 hover:text-white rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Stacked Nav Links */}
                <nav className="flex flex-col space-y-4 pt-6" aria-label="Mobile">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname?.startsWith(link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={clsx(
                          "text-xl font-bold uppercase tracking-tight transition-colors py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded",
                          isActive
                            ? "text-brand-blueLight"
                            : "text-white hover:text-brand-blueLight"
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer: Language & CTA */}
              <div className="pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-xs text-white/80 pb-2">
                  <span className="font-medium uppercase tracking-wider text-white/60">
                    Language
                  </span>
                  <div className="flex items-center gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => setSelectedLang(lang.code)}
                        className={clsx(
                          "px-2.5 py-1 text-xs rounded border transition-colors",
                          selectedLang === lang.code
                            ? "bg-brand-blue text-white border-brand-blue font-bold"
                            : "bg-black/30 text-white/70 border-white/10 hover:text-white"
                        )}
                      >
                        {lang.code}
                      </button>
                    ))}
                  </div>
                </div>

                <Link
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-3 text-center text-sm font-bold uppercase tracking-wider text-white rounded-lg bg-[linear-gradient(90deg,#0A57A3_0%,#0A94F0_100%)] shadow-[0_0_15px_rgba(10,148,240,0.35)] hover:shadow-[0_0_22px_rgba(10,148,240,0.55)] active:scale-95 transition-all"
                >
                  CONTACT US
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
