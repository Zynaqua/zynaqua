"use client";

import { useEffect, useState } from "react";
import { Input, Button } from "@/components/ui";

interface LeadSearchBarProps {
  onSearch: (term: string) => void;
}

export function LeadSearchBar({ onSearch }: LeadSearchBarProps) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => onSearch(value.trim()), 350);
    return () => window.clearTimeout(timer);
  }, [value, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 md:grid-cols-[minmax(0,1fr)_auto]">
      <Input
        placeholder="Search by name, mobile, email, pincode, or customer ID"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full min-w-0 flex-1"
      />
      <div className="flex gap-2">
        <Button type="submit" variant="outline" className="w-full md:w-auto">Search</Button>
        {value && <Button type="button" variant="ghost" onClick={() => setValue("")}>Clear</Button>}
      </div>
    </form>
  );
}