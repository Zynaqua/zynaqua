import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div>
      <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-charcoal-700">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-4 w-4 shrink-0 rounded border-fieldBorder text-gold-600 accent-gold-600 focus:ring-2 focus:ring-gold-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60",
            className
          )}
          {...props}
        />
        {label && <span>{label}</span>}
      </label>
      {error && <p role="alert" className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
);
Checkbox.displayName = "Checkbox";
