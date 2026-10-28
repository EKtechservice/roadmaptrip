import React from "react";
import Link from "next/link";
import clsx from "clsx";

export type ButtonVariant = "primary" | "white" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[linear-gradient(90deg,#0A57A3_0%,#0A94F0_100%)] text-white font-bold uppercase tracking-wider rounded-lg shadow-md hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:brightness-95",
  white:
    "bg-white text-brand-navy font-bold uppercase tracking-wider rounded-md shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 border border-slate-100",
  outline:
    "bg-transparent border-2 border-brand-blue text-brand-blue font-bold uppercase tracking-wider rounded-lg hover:bg-brand-blue/10 hover:-translate-y-0.5 active:translate-y-0",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const combinedClassName = clsx(
    "inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClassName}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}

export default Button;
