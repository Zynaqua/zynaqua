"use client";

import type { EnquiryStatus, EnquiryType } from "@/types";
import { Button, Input, Select, Sheet } from "@/components/ui";
import { useState } from "react";
import { ENQUIRY_TYPE_LABEL, LEAD_STATUS_META } from "@/lib/status";

export interface LeadFilterValues {
  status: EnquiryStatus | "";
  enquiryType: EnquiryType | "";
  city: string;
  datePreset: "" | "today" | "yesterday" | "last7" | "last30";
}

interface LeadFiltersProps {
  values: LeadFilterValues;
  onChange: (values: LeadFilterValues) => void;
}

const STATUS_OPTIONS: EnquiryStatus[] = [
  "NEW", "CONTACTED", "FOLLOW_UP", "DEMO_SCHEDULED",
  "DEMO_COMPLETED", "CONVERTED", "NOT_INTERESTED", "CANCELLED",
];

const TYPE_OPTIONS: EnquiryType[] = ["FREE_DEMO", "PRODUCT_ENQUIRY", "AMC", "SERVICE", "GENERAL"];

export function LeadFilters({ values, onChange }: LeadFiltersProps) {
  const [open, setOpen] = useState(false);
  const active = Object.values(values).filter(Boolean).length;
  const controls = (
    <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
      <Select
        containerClassName="min-w-0 md:w-auto"
        aria-label="Filter by status"
        value={values.status}
        onChange={(e) => onChange({ ...values, status: e.target.value as EnquiryStatus | "" })}
      >
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{LEAD_STATUS_META[s].label}</option>)}
      </Select>
      <Select containerClassName="min-w-0 md:w-auto" aria-label="Filter by enquiry type" value={values.enquiryType} onChange={(e) => onChange({ ...values, enquiryType: e.target.value as EnquiryType | "" })}>
        <option value="">All Types</option>
        {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{ENQUIRY_TYPE_LABEL[t]}</option>)}
      </Select>
      <Input aria-label="Filter by city" placeholder="City" value={values.city} onChange={(e) => onChange({ ...values, city: e.target.value })} containerClassName="min-w-0 md:w-auto" />
      <Select containerClassName="min-w-0 md:w-auto" aria-label="Filter by date" value={values.datePreset} onChange={(e) => onChange({ ...values, datePreset: e.target.value as LeadFilterValues["datePreset"] })}>
        <option value="">All Time</option><option value="today">Today</option><option value="yesterday">Yesterday</option><option value="last7">Last 7 Days</option><option value="last30">Last 30 Days</option>
      </Select>
    </div>
  );
  return (
    <>
      <div className="md:hidden">
        <Button variant="outline" className="w-full" onClick={() => setOpen(true)}>Filters{active ? ` (${active})` : ""}</Button>
        {active > 0 && <div className="mt-2 flex gap-2 overflow-x-auto text-xs"><span className="shrink-0 rounded-full bg-charcoal-100 px-3 py-2">{active} active</span><button className="min-h-11 shrink-0 underline" onClick={() => onChange({ status: "", enquiryType: "", city: "", datePreset: "" })}>Clear</button></div>}
        <Sheet open={open} onClose={() => setOpen(false)} title="Filter leads" description="Refine the lead list.">
          {controls}
          <Button className="mt-5 w-full" onClick={() => setOpen(false)}>Apply filters</Button>
        </Sheet>
      </div>
      <div className="hidden md:block">{controls}</div>
    </>
  );
}