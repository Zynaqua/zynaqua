import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-[var(--btn-radius,9999px)] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal-950 text-white hover:bg-charcoal-900 focus-visible:ring-charcoal-700",
        secondary:
          "bg-gold-500 text-charcoal-950 hover:bg-gold-400 focus-visible:ring-gold-400",
        outline:
          "border border-charcoal-950 text-charcoal-950 hover:bg-charcoal-50 focus-visible:ring-charcoal-400",
        whatsapp:
          "bg-whatsapp text-white hover:bg-whatsapp-dark focus-visible:ring-whatsapp",
        ghost:
          "text-charcoal-700 hover:bg-charcoal-50 focus-visible:ring-charcoal-400",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? "Submitting…" : children}
      </button>
    );
  }
);
Button.displayName = "Button";