import React from "react";
import clsx from "clsx";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={clsx(
        "mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-14",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Container;
