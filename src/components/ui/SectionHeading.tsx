import React from "react";
import clsx from "clsx";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  theme?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <div
      className={clsx(
        "flex flex-col space-y-3",
        isCenter ? "text-center items-center mx-auto" : "text-left items-start",
        className
      )}
    >
      {eyebrow && (
        <span
          className={clsx(
            "text-xs md:text-sm font-bold uppercase tracking-widest",
            isDark ? "text-brand-blueLight" : "text-brand-blue"
          )}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={clsx(
          "text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-[1.1]",
          isDark ? "text-white" : "text-brand-ink"
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            "text-base md:text-lg leading-relaxed max-w-2xl",
            isDark ? "text-slate-300" : "text-brand-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
