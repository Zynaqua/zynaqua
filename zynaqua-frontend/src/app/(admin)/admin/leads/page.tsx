"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import { LeadSearchBar } from "@/components/admin/LeadSearchBar";
import { LeadFilters, type LeadFilterValues } from "@/components/admin/LeadFilters";
import { LeadTable, type LeadListItem } from "@/components/admin/LeadTable";
import { Button } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import Link from "next/link";

interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

function presetToDateRange(preset: LeadFilterValues["datePreset"]): { from?: string; to?: string } {
  if (!preset) return {};
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case "today":
      return { from: startOfToday.toISOString() };
    case "yesterday": {
      const y = new Date(startOfToday);
      y.setDate(y.getDate() - 1);
      return { from: y.toISOString(), to: startOfToday.toISOString() };
    }
    case "last7": {
      const d = new Date(startOfToday);
      d.setDate(d.getDate() - 7);
      return { from: d.toISOString() };
    }
    case "last30": {
      const d = new Date(startOfToday);
      d.setDate(d.getDate() - 30);
      return { from: d.toISOString() };
    }
  }
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<LeadFilterValues>({
    status: "", enquiryType: "", city: "", datePreset: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    const { from, to } = presetToDateRange(filters.datePreset);
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (filters.status) params.set("status", filters.status);
    if (filters.enquiryType) params.set("type", filters.enquiryType);
    if (filters.city) params.set("city", filters.city);
    if (from) params.set("dateFrom", from);
    if (to) params.set("dateTo", to);
    params.set("page", String(page));
    params.set("size", "20");

    try {
      const result = await adminApi.get<PagedResponse<LeadListItem>>(`/admin/leads?${params.toString()}`);
      setLeads(result.content);
      setTotalPages(result.totalPages);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filters, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="mx-auto min-w-0 w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <h1>Leads</h1>
        <Link href="/admin/leads/new">
          <Button>+ Add Lead</Button>
        </Link>

      <div className="mt-6 space-y-4">
        <LeadSearchBar onSearch={(term) => { setSearchTerm(term); setPage(0); }} />
        <LeadFilters
          values={filters}
          onChange={(v) => { setFilters(v); setPage(0); }}
        />
      </div>

      <div className="mt-6">
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-14" />
            ))}
          </div>
        ) : (
          <LeadTable leads={leads} />
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            Previous
          </Button>
          <span className="text-sm text-charcoal-400">Page {page + 1} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}