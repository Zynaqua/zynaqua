"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}

export function Sheet({ open, onClose, title, description, children }: SheetProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="sheet-title"
      aria-describedby={description ? "sheet-description" : undefined}
      onCancel={() => onClose()}
      onClose={() => {
        if (open) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          dialogRef.current?.close();
          onClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-x-0 top-auto bottom-0 m-0 max-h-[90dvh] w-full max-w-none overflow-y-auto rounded-t-3xl bg-white p-0 pb-[env(safe-area-inset-bottom)] shadow-elevated backdrop:bg-charcoal-950/50 md:inset-1/2 md:top-1/2 md:bottom-auto md:max-w-lg md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl"
    >
      <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-charcoal-100 md:hidden" aria-hidden="true" />
      <div className={cn("p-6", "md:p-8")}>
        <header className="flex items-start justify-between gap-4">
          <div>
            <h2 id="sheet-title">{title}</h2>
            {description && <p id="sheet-description" className="mt-2 text-sm">{description}</p>}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-2xl text-charcoal-700 hover:bg-charcoal-50"
          >
            ×
          </button>
        </header>
        <div className="mt-6">{children}</div>
      </div>
    </dialog>
  );
}
