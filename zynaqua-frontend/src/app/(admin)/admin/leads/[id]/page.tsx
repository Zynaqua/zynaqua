"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/adminApi";
import { Button, Card, CardBody, Badge } from "@/components/ui";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
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

  const [lead, setLead] = useState<LeadDetail | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | "">("");
  const [isSaving, setIsSaving] = useState(false);
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

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-10">
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
        <Link href="/admin/leads" className="mt-4 inline-block text-sm underline">Back to Leads</Link>
      </div>
    );
  }

  if (!lead) {
    return <div className="mx-auto max-w-2xl px-6 py-10 text-charcoal-400">Loading…</div>;
  }

  const whatsappUrl = buildWhatsAppUrl(
    `Hello ${lead.customerName}, this is ZynAqua following up on your enquiry.`
  );

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link href="/admin/leads" className="text-sm text-charcoal-400 hover:text-charcoal-950">
        ← Back to Leads
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1>{lead.customerName}</h1>
        <Badge variant="gold">{lead.enquiryType.replace(/_/g, " ")}</Badge>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Mobile</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.customerMobile}</p>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Email</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.customerEmail ?? "—"}</p>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">City / Pincode</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.customerCity} — {lead.customerPincode}</p>
        </CardBody></Card>
        <Card><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Product</p>
          <p className="mt-1 font-semibold text-charcoal-950">{lead.productName ?? "Not product-specific"}</p>
        </CardBody></Card>
      </div>

      <Card className="mt-4"><CardBody>
        <p className="text-sm font-medium text-charcoal-400">Address</p>
        <p className="mt-1 text-charcoal-950">{lead.customerAddress}</p>
      </CardBody></Card>

      {lead.message && (
        <Card className="mt-4"><CardBody>
          <p className="text-sm font-medium text-charcoal-400">Message</p>
          <p className="mt-1 text-charcoal-950">{lead.message}</p>
        </CardBody></Card>
      )}

      <Card className="mt-4"><CardBody>
        <p className="text-sm font-medium text-charcoal-400">Status</p>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as EnquiryStatus)}
            className="rounded-lg border border-charcoal-100 px-3 py-2 text-sm"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
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
        <a href={`tel:+91${lead.customerMobile}`}>
          <Button variant="outline">Call</Button>
        </a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="whatsapp">WhatsApp</Button>
        </a>
      </div>
    </div>
  );
}