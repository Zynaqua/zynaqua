"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AdminApiError } from "@/lib/adminApi";
import { Button, Input, Textarea, Card, CardBody } from "@/components/ui";
import type { EnquiryStatus } from "@/types";

interface ProductOption {
  id: number;
  name: string;
}

const ENQUIRY_TYPE_OPTIONS = ["FREE_DEMO", "PRODUCT_ENQUIRY", "AMC", "SERVICE", "GENERAL"] as const;
const STATUS_OPTIONS: EnquiryStatus[] = [
  "NEW", "CONTACTED", "FOLLOW_UP", "DEMO_SCHEDULED",
  "DEMO_COMPLETED", "CONVERTED", "NOT_INTERESTED", "CANCELLED",
];

export interface LeadFormValues {
  name: string;
  mobile: string;
  email: string;
  city: string;
  pincode: string;
  address: string;
  enquiryType: (typeof ENQUIRY_TYPE_OPTIONS)[number];
  productId: string;
  message: string;
  status: EnquiryStatus;
}

interface LeadFormProps {
  initialValues?: LeadFormValues;
  leadId?: number;
}

const EMPTY_FORM: LeadFormValues = {
  name: "", mobile: "", email: "", city: "", pincode: "", address: "",
  enquiryType: "FREE_DEMO", productId: "", message: "", status: "NEW",
};

export function LeadForm({ initialValues, leadId }: LeadFormProps) {
  const router = useRouter();
  const isEditMode = leadId !== undefined;
  const [values, setValues] = useState<LeadFormValues>(initialValues ?? EMPTY_FORM);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((body) => setProducts(body.data.map((p: { id: number; name: string }) => ({ id: p.id, name: p.name }))))
      .catch(() => setProducts([]));
  }, []);

  const update = <K extends keyof LeadFormValues>(key: K, value: LeadFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setIsSubmitting(true);

    const basePayload = {
      name: values.name,
      mobile: values.mobile,
      email: values.email || undefined,
      city: values.city,
      pincode: values.pincode,
      address: values.address,
      enquiryType: values.enquiryType,
      productId: values.productId ? Number(values.productId) : undefined,
    };

    try {
      if (isEditMode) {

        await adminApi.put(`/admin/leads/${leadId}`, {
          ...basePayload,
          message: values.message || undefined,
          status: values.status,
        });
      } else {
        await adminApi.post(`/admin/leads`, basePayload);
      }
      router.push("/admin/leads");
    } catch (err) {
      if (err instanceof AdminApiError) {
        setError(err.message);

        if (err.fieldErrors) setFieldErrors(err.fieldErrors);
      } else {
        setError("Failed to save lead");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <Card><CardBody className="space-y-4">
        <h3>Customer Details</h3>
        <Input
          label="Customer Name" required
          value={values.name} onChange={(e) => update("name", e.target.value)}
          error={fieldErrors.name}
        />
        <Input
          label="Mobile Number" required inputMode="numeric"
          value={values.mobile} onChange={(e) => update("mobile", e.target.value)}
          error={fieldErrors.mobile}
        />
        <Input
          label="Email (optional)"
          value={values.email} onChange={(e) => update("email", e.target.value)}
          error={fieldErrors.email}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="City" required
            value={values.city} onChange={(e) => update("city", e.target.value)}
            error={fieldErrors.city}
          />
          <Input
            label="Pincode" required inputMode="numeric"
            value={values.pincode} onChange={(e) => update("pincode", e.target.value)}
            error={fieldErrors.pincode}
          />
        </div>
        <Textarea
          label="Address" required
          value={values.address} onChange={(e) => update("address", e.target.value)}
          error={fieldErrors.address}
        />
      </CardBody></Card>

      <Card><CardBody className="space-y-4">
        <h3>Enquiry Details</h3>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Enquiry Type</label>
          <select
            className="w-full rounded-lg border border-charcoal-100 bg-white px-4 py-2.5 text-sm"
            value={values.enquiryType}
            onChange={(e) => update("enquiryType", e.target.value as LeadFormValues["enquiryType"])}
          >
            {ENQUIRY_TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>{t.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Product (optional)</label>
          <select
            className="w-full rounded-lg border border-charcoal-100 bg-white px-4 py-2.5 text-sm"
            value={values.productId}
            onChange={(e) => update("productId", e.target.value)}
          >
            <option value="">Not product-specific</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {isEditMode && (
          <>
            <Textarea
              label="Internal Note / Message (optional)"
              value={values.message} onChange={(e) => update("message", e.target.value)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Status</label>
              <select
                className="w-full rounded-lg border border-charcoal-100 bg-white px-4 py-2.5 text-sm"
                value={values.status}
                onChange={(e) => update("status", e.target.value as EnquiryStatus)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
          </>
        )}
      </CardBody></Card>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          {isEditMode ? "Save Changes" : "Create Lead"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/leads")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
