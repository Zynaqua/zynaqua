"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoFormSchema, type DemoFormValues } from "@/lib/validators";
import { api, ApiError } from "@/lib/api";
import { buildWhatsAppUrl, demoFormWhatsAppMessage } from "@/lib/whatsapp";
import { Button, Input, Textarea, Card, CardBody } from "@/components/ui";
import type { LeadRequest } from "@/types";

type SubmitState = "idle" | "submitting" | "success" | "error";

export function DemoForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (values: DemoFormValues) => {
    setSubmitState("submitting");
    setServerError(null);

    const payload: LeadRequest = {
      ...values,
      email: values.email || undefined,
      enquiryType: "FREE_DEMO",
    };

    try {
      await api.post("/leads", payload);
      setSubmitState("success");
      reset();

      // WHY only now: WhatsApp only opens on confirmed backend success —
      // never optimistically, so we never claim an enquiry was saved
      // when it wasn't.
      const waUrl = buildWhatsAppUrl(demoFormWhatsAppMessage(values));
      window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setSubmitState("error");
      if (err instanceof ApiError) {
        setServerError(err.message);
      } else {
        setServerError("We couldn't submit your enquiry right now. Please try again or contact us on WhatsApp.");
      }
    }
  };

  return (
    <Card className="w-full max-w-[720px] rounded-[20px] border-charcoal-100 shadow-[0_4px_20px_rgba(17,17,19,0.06)]">
      <CardBody className="p-5 sm:p-8">
        <h3 className="text-center text-2xl md:text-3xl">Book a Free Demo</h3>
        <p className="mt-1 text-center text-sm">Get expert-fitted RO purification at your home.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <Input
                id="name"
                label="Full Name"
                placeholder="Rahul Sharma"
                error={errors.name?.message}
                className="h-[52px] rounded-xl px-4 py-2.5 text-base"
                {...register("name")}
              />
              <Input
                id="mobile"
                label="Mobile Number"
                placeholder="9876543210"
                inputMode="numeric"
                error={errors.mobile?.message}
                className="h-[52px] rounded-xl px-4 py-2.5 text-base"
                {...register("mobile")}
              />
              <Input
                id="email"
                label="Email (optional)"
                placeholder="rahul@example.com"
                error={errors.email?.message}
                className="h-[52px] rounded-xl px-4 py-2.5 text-base"
                {...register("email")}
              />
            </div>

            <div className="space-y-4">
              <Input
                id="city"
                label="City"
                placeholder="Surat"
                error={errors.city?.message}
                className="h-[52px] rounded-xl px-4 py-2.5 text-base"
                {...register("city")}
              />
              <Input
                id="pincode"
                label="Pincode"
                placeholder="395007"
                inputMode="numeric"
                error={errors.pincode?.message}
                className="h-[52px] rounded-xl px-4 py-2.5 text-base"
                {...register("pincode")}
              />
              <Textarea
                id="address"
                label="Address"
                placeholder="Flat / House no, street, area"
                error={errors.address?.message}
                className="h-[108px] resize-none rounded-xl px-4 py-2.5 text-base"
                {...register("address")}
              />
            </div>
          </div>

          {serverError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {serverError}
            </p>
          )}

          {submitState === "success" && (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Your enquiry has been submitted. WhatsApp is opening with your enquiry details.
            </p>
          )}

          <Button
            type="submit"
            className="h-[52px] w-full rounded-xl"
            isLoading={submitState === "submitting"}
          >
            Book Free Demo
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}