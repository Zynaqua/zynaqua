import { cn } from "@/lib/utils";
import { type HTMLAttributes, type ReactNode } from "react";

interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
  eyebrow?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  level?: "h1" | "h2" | "h3";
  withRules?: boolean;
}

export function SectionHeading({
  className,
  title,
  eyebrow,
  description,
  align = "left",
  level = "h2",
  withRules = false,
  ...props
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div
      className={cn(align === "center" && "text-center", className)}
      {...props}
    >
      {eyebrow && (
        withRules ? (
          <div className="mb-2 flex items-center gap-4">
            <span className="h-px flex-1 bg-charcoal-100" />
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">{eyebrow}</p>
            <span className="h-px flex-1 bg-charcoal-100" />
          </div>
        ) : (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-700">
            {eyebrow}
          </p>
        )
      )}
      <Heading>{title}</Heading>
      {description && <p className={cn("mt-3 max-w-2xl", align === "center" && "mx-auto")}>{description}</p>}
    </div>
  );
}
