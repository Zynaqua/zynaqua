import { cn } from "@/lib/utils";
import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  tone?: "white" | "warm" | "aqua" | "dark";
  as?: ElementType;
  children: ReactNode;
  containerClassName?: string;
  padding?: "default" | "hero" | "tail";
}

export function Section({
  tone = "white",
  as: Component = "section",
  className,
  containerClassName,
  padding = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        padding === "hero" && "pt-10 pb-8 md:pt-20 md:pb-12",
        padding === "tail" && "pt-0 pb-12 md:pb-16",
        padding === "default" && "py-14 md:py-24",
        tone === "warm" && "bg-warm",
        tone === "aqua" && "bg-aqua-50",
        tone === "dark" && "bg-charcoal-950 text-white",
        className
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
