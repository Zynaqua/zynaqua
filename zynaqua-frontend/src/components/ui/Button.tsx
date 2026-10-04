import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";

export const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--btn-radius,9999px)] font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gold-500 text-charcoal-950 hover:bg-gold-400 focus-visible:ring-gold-700",
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
        sm: "min-h-11 px-4 text-sm",
        md: "min-h-12 px-6 text-base",
        lg: "min-h-[52px] px-8 text-base",
        icon: "h-11 w-11 p-0",
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
  loadingText?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, loadingText = "Submitting…", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-busy={isLoading || undefined}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <><span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" aria-hidden="true" />{loadingText}</> : children}
      </button>
    );
  }
);
Button.displayName = "Button";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
  VariantProps<typeof buttonVariants> & {
    href: string;
    external?: boolean;
    children: ReactNode;
  };

const isExternalHref = (href: string) =>
  /^https?:\/\//i.test(href) || /^(tel:|mailto:|wa\.me)/i.test(href);

export function ButtonLink({
  className,
  variant,
  size,
  href,
  external,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className);
  const shouldOpenExternal = external || isExternalHref(href);

  if (shouldOpenExternal) {
    return (
      <a
        href={href}
        className={classes}
        target={props.target ?? "_blank"}
        rel={props.rel ?? "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}