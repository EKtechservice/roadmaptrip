import React from "react";
import Link from "next/link";
import clsx from "clsx";

export interface LogoProps {
  className?: string;
  showLink?: boolean;
}

export function Logo({ className, showLink = true }: LogoProps) {
  const content = (
    <div
      className={clsx(
        "inline-flex items-center gap-2.5 h-[36px] select-none group",
        className
      )}
    >
      {/* Reference matching emblem: Aerodynamic white wing on top, vibrant blue swoosh on bottom */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Top white wing / swoosh */}
        <path
          d="M6 16.5C8 11.5 15.5 8 28.5 7.5C32.5 7.4 34 8.5 32 10.5C27 15 17 18.5 7.5 18C6.5 17.9 5.8 17.3 6 16.5Z"
          fill="white"
        />
        <path
          d="M10 13C16 10.5 24 9.5 31.5 9C24.5 14 16 17 9.5 16C8.8 15.8 9.2 14.2 10 13Z"
          fill="#F8FAFC"
        />
        {/* Bottom vibrant blue aerodynamic crescent */}
        <path
          d="M5.5 19.5C6 19.2 7 19.5 8.5 20.2C14 23 21 23.5 27.5 21C28.5 20.6 29 21.2 28 22C23.5 25.5 16 27 9.5 25C6.5 24 5 21.5 5.5 19.5Z"
          fill="#0A7BDB"
        />
        <path
          d="M7 21C11.5 23.8 17 24.5 23 23C17.5 25.5 11 25 7 22.5C6.5 22.2 6.6 21.4 7 21Z"
          fill="#0A94F0"
        />
      </svg>

      {/* Wordmark in Kaushan Script */}
      <span
        className="text-[26px] leading-none text-white italic tracking-wide font-normal"
        style={{ fontFamily: "var(--font-script), cursive" }}
      >
        Roadtrip
      </span>
    </div>
  );

  if (showLink) {
    return (
      <Link
        href="/"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg inline-flex items-center"
        aria-label="Roadtrip Homepage"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
