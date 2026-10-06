import { cn } from "@/lib/utils";
import { forwardRef, useId, type SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, containerClassName, label, helperText, error, id, required, children, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const descriptionId = `${fieldId}-description`;
    const errorId = `${fieldId}-error`;
    const describedBy = error ? errorId : helperText ? descriptionId : undefined;

    return (
      <div className={cn("w-full", containerClassName)}>
        {label && (
          <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-charcoal-700">
            {label}{required && <span aria-hidden="true"> *</span>}
          </label>
        )}
        <select
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "min-h-12 w-full rounded-lg border border-fieldBorder bg-white px-4 py-2.5 text-charcoal-950 transition-colors hover:border-gold-700 focus:border-gold-700 focus:outline-none focus:ring-2 focus:ring-gold-700/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:bg-charcoal-50 disabled:opacity-70",
            error
              ? "border-red-400 focus:ring-red-300"
              : "",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">{error}</p>
        ) : helperText ? (
          <p id={descriptionId} className="mt-1 text-sm text-charcoal-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Select.displayName = "Select";
