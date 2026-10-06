import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  accentTop?: boolean;
  tone?: "white" | "warm";
}

export function Card({
  className,
  interactive = false,
  accentTop = false,
  tone = "white",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-charcoal-100 shadow-card transition-[box-shadow,border-color] duration-200",
        tone === "warm" ? "bg-warm" : "bg-white",
        interactive && "cursor-pointer hover:border-charcoal-400/40 hover:shadow-card-hover",
        accentTop && "border-t-2 border-t-gold-500",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-b border-charcoal-100 px-5 py-4", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t border-charcoal-100 px-5 py-4", className)} {...props} />;
}

export function CardMedia({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("overflow-hidden rounded-t-xl", className)} {...props} />;
}