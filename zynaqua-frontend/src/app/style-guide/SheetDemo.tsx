"use client";

import { useState } from "react";
import { Button, Input, Sheet } from "@/components/ui";

export function SheetDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Sheet</Button>
      <Sheet
        open={open}
        onClose={() => setOpen(false)}
        title="Book a consultation"
        description="Leave your details and our team will get in touch."
      >
        <div className="space-y-4">
          <Input label="Name" placeholder="Rahul Sharma" />
          <Input label="Mobile Number" inputMode="numeric" placeholder="9876543210" />
          <Button className="w-full" onClick={() => setOpen(false)}>Continue</Button>
        </div>
      </Sheet>
    </>
  );
}
