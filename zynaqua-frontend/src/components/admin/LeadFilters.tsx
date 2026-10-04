"use client";

import type { EnquiryStatus, EnquiryType } from "@/types";

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
  const selectClass =
    "w-full min-w-0 rounded-lg border border-charcoal-100 bg-white px-3 py-2 text-sm text-charcoal-950 focus:outline-none focus:ring-2 focus:ring-charcoal-200 md:w-auto";

  return (
    <div className="grid grid-cols-2 gap-3 md:flex md:flex-wrap">
      <select
        className={selectClass}
        value={values.status}
        onChange={(e) => onChange({ ...values, status: e.target.value as EnquiryStatus | "" })}
      >
        <option value="">All Statuses</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
        ))}
      </select>

      <select
        className={selectClass}
        value={values.enquiryType}
        onChange={(e) => onChange({ ...values, enquiryType: e.target.value as EnquiryType | "" })}
      >
        <option value="">All Types</option>
        {TYPE_OPTIONS.map((t) => (
          <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="City"
        value={values.city}
        onChange={(e) => onChange({ ...values, city: e.target.value })}
        className={selectClass}
      />

      <select
        className={selectClass}
        value={values.datePreset}
        onChange={(e) => onChange({ ...values, datePreset: e.target.value as LeadFilterValues["datePreset"] })}
      >
        <option value="">All Time</option>
        <option value="today">Today</option>
        <option value="yesterday">Yesterday</option>
        <option value="last7">Last 7 Days</option>
        <option value="last30">Last 30 Days</option>
      </select>
    </div>
  );
}