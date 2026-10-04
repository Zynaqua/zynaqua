import { cn } from "@/lib/utils";
import { type ElementType, type HTMLAttributes, type ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, "color"> {
  tone?: "white" | "warm" | "aqua" | "dark";
  as?: ElementType;
  children: ReactNode;
  containerClassName?: string;
}

export function Section({
  tone = "white",
  as: Component = "section",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(
        "section-padding",
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
