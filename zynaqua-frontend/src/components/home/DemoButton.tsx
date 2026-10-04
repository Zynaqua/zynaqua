"use client";

import { Button, type ButtonProps } from "@/components/ui";
import { useDemoSheet } from "./DemoSheetProvider";

export function DemoButton({ children = "Book Free Demo", ...props }: ButtonProps) {
  const { open } = useDemoSheet();
  return <Button {...props} onClick={open}>{children}</Button>;
}
