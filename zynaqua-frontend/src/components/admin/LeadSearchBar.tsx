"use client";

import { useState } from "react";
import { Input, Button } from "@/components/ui";

interface LeadSearchBarProps {
  onSearch: (term: string) => void;
}

export function LeadSearchBar({ onSearch }: LeadSearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Search by name, mobile, email, pincode, or customer ID"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" variant="outline">Search</Button>
    </form>
  );
}