"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: "Do you help with visas?",
    answer:
      "Yes, absolutely. We provide end-to-end visa assistance for both leisure travel and international employment. Our dedicated visa consultants handle document checklists, application filings, embassy interview coaching, and real-time tracking until your passport is stamped and returned.",
  },
  {
    question: "How do I apply for jobs in Japan?",
    answer:
      "You can get started by submitting your resume through our Employment in Japan section. Our advisors will assess your qualifications, arrange an initial interview, match you with licensed Japanese companies, and guide you through your Certificate of Eligibility (COE) and work visa paperwork.",
  },
  {
    question: "Do I need to speak Japanese?",
    answer:
      "Not necessarily! For leisure travel, our tours are fully guided in English with bilingual local coordinators. For careers in Japan, many IT, engineering, and English teaching roles require minimal to conversational Japanese. For hospitality and caregiving roles, JLPT N4 or N3 is generally required, and we offer language classes to get you ready.",
  },
  {
    question: "What does a customized tour include?",
    answer:
      "Every customized tour is tailor-made to your preferences. Packages typically cover round-trip flights, premium 4- and 5-star hotel bookings, private airport transfers, licensed English-speaking local guides, pre-booked attraction passes, and 24/7 on-trip concierge support.",
  },
  {
    question: "How far ahead should I book?",
    answer:
      "For popular vacation destinations and peak seasons (such as Japan's cherry blossoms or European summer), we recommend booking 3 to 6 months in advance for the best airfares and boutique stays. For work programs in Japan, the visa sponsorship and placement cycle typically takes 2 to 4 months.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards (Visa, MasterCard, American Express), secure bank wire transfers, and installment payment plans for eligible tour packages. All transactions are protected by bank-grade SSL encryption and PCI-compliant processing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-sky py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl">
          {/* Centered Heading */}
          <SectionHeading
            eyebrow="FAQ"
            title="FREQUENTLY ASKED QUESTIONS"
            subtitle="Everything you need to know about our travel services, Japan work placements, and tour bookings."
            centered
          />

          {/* Accordion List */}
          <div className="mt-12 space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              const buttonId = `faq-btn-${index}`;
              const panelId = `faq-panel-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`group rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-l-4 border-l-brand-blue shadow-md"
                      : "border-l-4 border-l-transparent hover:border-slate-300"
                  }`}
                >
                  {/* Accordion Trigger Button */}
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    <span
                      className={`text-base sm:text-lg font-bold transition-colors ${
                        isOpen ? "text-brand-blue" : "text-brand-ink group-hover:text-brand-blue"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* Plus / Minus Rotating Icon */}
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 flex-shrink-0 ${
                        isOpen
                          ? "bg-brand-blue text-white"
                          : "bg-slate-100 text-brand-muted group-hover:bg-brand-sky group-hover:text-brand-blue"
                      }`}
                      aria-hidden="true"
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.25,
                          ease: "easeInOut",
                        }}
                        className="inline-flex items-center justify-center"
                      >
                        <Plus size={18} strokeWidth={2.5} />
                      </motion.span>
                    </span>
                  </button>

                  {/* Accordion Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        animate={
                          shouldReduceMotion
                            ? { opacity: 1 }
                            : {
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: {
                                    duration: 0.32,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                  opacity: { duration: 0.22, delay: 0.05 },
                                },
                              }
                        }
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: {
                                    duration: 0.25,
                                    ease: [0.22, 1, 0.36, 1],
                                  },
                                  opacity: { duration: 0.15 },
                                },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-sm sm:text-base leading-relaxed text-brand-muted border-t border-slate-100">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
