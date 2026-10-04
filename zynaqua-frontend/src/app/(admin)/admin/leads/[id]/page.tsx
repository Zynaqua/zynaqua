// src/app/(admin)/admin/leads/[id]/page.tsx
// Day 9's file — add source display, an Edit link, and a Delete button
// with confirmation. The existing status-dropdown + Save Status section
// stays exactly as-is (quick status changes remain available there).

"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/adminApi";
import { Alert, Button, ButtonLink, Card, CardBody, Badge, Select, StatusBadge } from "@/components/ui";
import { buildCustomerWhatsAppUrl, buildPhoneUrl } from "@/lib/whatsapp";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ENQUIRY_TYPE_LABEL, LEAD_STATUS_META, SOURCE_LABEL } from "@/lib/status";
import { formatDate } from "@/lib/format";
import type { EnquiryStatus } from "@/types";

interface LeadDetail {
  enquiryId: number;
  customerId: number;
  customerName: string;
  customerMobile: string;
  customerEmail: string | null;
  customerCity: string;
  customerPincode: string;
  customerAddress: string;
  enquiryType: string;
  source: "ONLINE" | "OFFLINE"; // NEW
  productId: number | null;
  productName: string | null;
  message: string | null;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS: EnquiryStatus[] = [
  "NEW", "CONTACTED", "FOLLOW_UP", "DEMO_SCHEDULED",
  "DEMO_COMPLETED", "CONVERTED", "NOT_INTERESTED", "CANCELLED",
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function LeadDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | "">("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .get<LeadDetail>(`/admin/leads/${id}`)
      .then((data) => {
        setLead(data);
        setSelectedStatus(data.status);
      })
      .catch((err) => setError(err.message ?? "Failed to load lead"));
  }, [id]);

  const handleStatusSave = async () => {
    if (!lead || !selectedStatus || selectedStatus === lead.status) return;
    setIsSaving(true);
    try {
      const updated = await adminApi.put<LeadDetail>(`/admin/leads/${id}/status`, { status: selectedStatus });
      setLead(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setIsSaving(false);
    }
  };

  // WHY window.confirm rather than a custom modal component: a browser
  // native confirm is sufficient friction for a destructive, low-frequency
  // admin action — building a custom confirmation modal component for
  // this single use case would be more code with no real UX benefit at
  // this project's scale (the same reasoning Day 9 used for plain <select>
  // filters over a custom dropdown).
  const handleDelete = async () => {
    if (!lead) return;
    const confirmed = window.confirm(
      `Delete the lead for ${lead.customerName}? This cannot be undone.`
    );
    if (!confirmed) return;

    setIsDeleting(true);
    try {
      await adminApi.delete(`/admin/leads/${id}`);
      router.push("/admin/leads");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete lead");
      setIsDeleting(false);
    }
  };

  if (error) {
    return (
      <AdminPage className="max-w-2xl">
        <Alert variant="error">{error}</Alert>
        <Link href="/admin/leads" className="mt-4 inline-block text-sm underline">Back to Leads</Link>
      </AdminPage>
    );
  }

  if (!lead) {
    return <AdminPage className="max-w-2xl"><p className="text-charcoal-400">Loading…</p></AdminPage>;
  }

  const whatsappUrl = buildCustomerWhatsAppUrl(lead.customerMobile,
    `Hello ${lead.customerName}, this is ZynAqua following up on your enquiry.`
  );

  return (
    <AdminPage className="max-w-4xl">
      <Link href="/admin/leads" className="text-sm text-charcoal-400 hover:text-charcoal-950">
        ← Back to Leads
      </Link>

      <div className="mt-4">
        <AdminPageHeader
          title={lead.customerName}
          description={`${ENQUIRY_TYPE_LABEL[lead.enquiryType as keyof typeof ENQUIRY_TYPE_LABEL] ?? lead.enquiryType} · ${formatDate(lead.createdAt)}`}
          actions={
            <>
              <Link href={`/admin/leads/${id}/edit`}><Button variant="outline" size="sm">Edit Lead</Button></Link>
              <Button variant="ghost" size="sm" isLoading={isDeleting} onClick={handleDelete}>Delete</Button>
            </>
          }
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <StatusBadge status={lead.status} />
          <Badge variant={lead.source === "OFFLINE" ? "aqua" : "neutral"}>{SOURCE_LABEL[lead.source]}</Badge>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Mobile</p>
          <a href={buildPhoneUrl(lead.customerMobile)} className="mt-1 inline-flex min-h-11 items-center break-all font-semibold text-charcoal-950 underline">{lead.customerMobile}</a>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Email</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.customerEmail ?? "—"}</p>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">City / Pincode</p>
          <p className="mt-1 break-words font-semibold text-charcoal-950">{lead.customerCity} — {lead.customerPincode}</p>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Product</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.productName ?? "Not product-specific"}</p>
        </CardBody></Card>
      </div>

      <Card className="mt-4"><CardBody>
        <p className="text-sm font-medium text-charcoal-400">Address</p>
        <p className="mt-1 break-words text-charcoal-950">{lead.customerAddress}</p>
      </CardBody></Card>

      {lead.message && (
        <Card className="mt-4"><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Message</p>
          <p className="mt-1 break-words text-charcoal-950">{lead.message}</p>
        </CardBody></Card>
      )}

      <Card className="mt-4"><CardBody>
        <p className="text-sm font-medium text-charcoal-400">Status</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Select
            aria-label="Lead status"
            containerClassName="w-auto"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EnquiryStatus)}
            className="w-auto"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{LEAD_STATUS_META[s].label}</option>
            ))}
          </Select>
          <Button
            size="sm"
            onClick={handleStatusSave}
            isLoading={isSaving}
            disabled={selectedStatus === lead.status}
          >
            Save Status
          </Button>
        </div>
      </CardBody></Card>

      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={buildPhoneUrl(lead.customerMobile)} variant="outline">Call</ButtonLink>
        <ButtonLink href={whatsappUrl} variant="whatsapp" external>WhatsApp</ButtonLink>
      </div>
    </AdminPage>
  );
}