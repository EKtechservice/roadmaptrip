export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Corporate Travel", href: "/corporate-travel" },
  { label: "Leisure", href: "/leisure" },
  { label: "Employment in Japan", href: "/employment-in-japan" },
  { label: "Language Exchange", href: "/language-exchange" },
];

export const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "日本語", label: "Japanese" },
  { code: "Français", label: "French" },
] as const;

export const SITE_CONFIG = {
  name: "Roadtrip",
  tagline: "Extraordinary Journeys & Abroad Careers",
  description:
    "Curated tours, bespoke travel expeditions, work abroad employment in Japan, and global language exchange programs.",
  phone: "+1 (800) 762-3874",
  email: "contact@roadtrip-travel.com",
  address: "100 Innovation Way, Suite 400, San Francisco, CA 94105",
  hours: "Mon - Sat: 9:00 AM - 7:00 PM EST",
} as const;

export const FOOTER_LINKS = {
  tours: [
    { label: "Japan Cultural Tour", href: "#tours/japan" },
    { label: "Swiss Alps Trek", href: "#tours/switzerland" },
    { label: "Nordic Lights Safari", href: "#tours/norway" },
    { label: "Amalfi Coast Discovery", href: "#tours/italy" },
  ],
  abroadPrograms: [
    { label: "Specified Skilled Worker (SSW)", href: "#work/ssw" },
    { label: "Tokyo IT & Engineering", href: "#work/it" },
    { label: "Resort Hospitality Internship", href: "#work/internship" },
    { label: "Japanese Language School Prep", href: "#work/language" },
  ],
  company: [
    { label: "About Roadtrip", href: "#about" },
    { label: "Our Story & Guides", href: "#story" },
    { label: "Travel Insurance", href: "#insurance" },
    { label: "Careers", href: "#careers" },
  ],
  support: [
    { label: "Contact Us", href: "#contact" },
    { label: "FAQs & Visa Guidance", href: "#faq" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Privacy Policy", href: "#privacy" },
  ],
} as const;
