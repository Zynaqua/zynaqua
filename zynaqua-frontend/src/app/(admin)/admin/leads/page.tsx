"use client";

import { useEffect, useState, useCallback } from "react";
import { adminApi } from "@/lib/adminApi";
import { LeadSearchBar } from "@/components/admin/LeadSearchBar";
import { LeadFilters, type LeadFilterValues } from "@/components/admin/LeadFilters";
import { LeadTable, type LeadListItem } from "@/components/admin/LeadTable";
import { Alert, Button, ButtonLink } from "@/components/ui";
import { Skeleton } from "@/components/ui";
import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

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
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load leads");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, filters, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);
  const handleSearch = useCallback((term: string) => { setSearchTerm(term); setPage(0); }, []);

  return (
    <AdminPage>
      <AdminPageHeader title="Leads" description="Manage and follow up with customer enquiries." actions={<ButtonLink href="/admin/leads/new">+ Add Lead</ButtonLink>} />

      <div className="mt-6 space-y-4">
        <LeadSearchBar onSearch={handleSearch} />
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

      {error && <div className="mt-6"><Alert variant="error" title="Unable to load leads">{error}<button className="ml-3 min-h-11 underline" onClick={fetchLeads}>Retry</button></Alert></div>}
      {!isLoading && !error && leads.length === 0 && (
        <div className="mt-6 rounded-xl border border-charcoal-100 bg-white p-10 text-center">
          <p className="text-charcoal-700">No leads match your search or filters.</p>
          <Button variant="ghost" className="mt-2" onClick={() => { setSearchTerm(""); setFilters({ status: "", enquiryType: "", city: "", datePreset: "" }); setPage(0); }}>Clear filters</Button>
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => { setPage((p) => Math.max(0, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            Previous
          </Button>
          <span className="text-sm text-charcoal-400">Page {page + 1} of {totalPages}</span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => { setPage((p) => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            Next
          </Button>
        </div>
      )}
    </AdminPage>
  );
}