"use client";

import { use, useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { LeadForm, type LeadFormValues } from "@/components/admin/LeadForm";
import type { EnquiryStatus } from "@/types";

interface LeadDetail {
  enquiryId: number;
  customerName: string;
  customerMobile: string;
  customerEmail: string | null;
  customerCity: string;
  customerPincode: string;
  customerAddress: string;
  enquiryType: string;
  productId: number | null;
  message: string | null;
  status: EnquiryStatus;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

function toFormValues(lead: LeadDetail): LeadFormValues {
  return {
    name: lead.customerName,
    mobile: lead.customerMobile,
    email: lead.customerEmail ?? "",
    city: lead.customerCity,
    pincode: lead.customerPincode,
    address: lead.customerAddress,
    enquiryType: lead.enquiryType as LeadFormValues["enquiryType"],
    productId: lead.productId ? String(lead.productId) : "",
    message: lead.message ?? "",
    status: lead.status,
  };
}

export default function EditLeadPage({ params }: PageProps) {
  const { id } = use(params);
  const [initialValues, setInitialValues] = useState<LeadFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.get<LeadDetail>(`/admin/leads/${id}`)
      .then((lead) => setInitialValues(toFormValues(lead)))
      .catch((err) => setError(err.message ?? "Failed to load lead"));
  }, [id]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1>Edit Lead</h1>
      <div className="mt-6">
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {!initialValues && !error && <p className="text-charcoal-400">Loading…</p>}
        {initialValues && <LeadForm initialValues={initialValues} leadId={Number(id)} />}
      </div>
    </div>
  );
}