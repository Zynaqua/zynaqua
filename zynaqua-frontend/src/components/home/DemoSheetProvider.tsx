"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Sheet } from "@/components/ui";
import { DemoForm } from "./DemoForm";

interface DemoSheetContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DemoSheetContext = createContext<DemoSheetContextValue | null>(null);

export function useDemoSheet() {
  const context = useContext(DemoSheetContext);
  if (!context) throw new Error("useDemoSheet must be used within DemoSheetProvider");
  return context;
}

export function DemoSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState(0);
  const value = useMemo(
    () => ({
      isOpen,
      open: () => {
        setSession((current) => current + 1);
        setIsOpen(true);
      },
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  useEffect(() => {
    if (window.location.hash !== "#book-demo") return;
    setIsOpen(true);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }, []);

  return (
    <DemoSheetContext.Provider value={value}>
      {children}
      <Sheet
        open={isOpen}
        onClose={value.close}
        title="Book a Free Demo"
        description="Get expert-fitted RO purification at your home."
      >
        <DemoForm key={session} mode="sheet" onSuccess={() => undefined} onDone={value.close} />
      </Sheet>
    </DemoSheetContext.Provider>
  );
}
