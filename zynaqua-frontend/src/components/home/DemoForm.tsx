"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoFormSchema, type DemoFormValues } from "@/lib/validators";
import { api, ApiError } from "@/lib/api";
import { buildWhatsAppUrl, demoFormWhatsAppMessage } from "@/lib/whatsapp";
import { Button, ButtonLink, Input, Textarea, Card, CardBody } from "@/components/ui";
import type { LeadRequest } from "@/types";

type SubmitState = "idle" | "submitting" | "success" | "error";

interface DemoFormProps {
  mode?: "inline" | "sheet";
  onSuccess?: () => void;
  onDone?: () => void;
}

export function DemoForm({ mode = "inline", onSuccess, onDone }: DemoFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    trigger,
    setFocus,
    formState: { errors },
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
    shouldUnregister: false,
  });

  useEffect(() => {
    setFocus(step === 1 ? "name" : "city");
  }, [setFocus, step]);

  const continueToStepTwo = async () => {
    if (await trigger(["name", "mobile", "pincode"])) setStep(2);
  };

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
      const waUrl = buildWhatsAppUrl(demoFormWhatsAppMessage(values));
      setWhatsAppUrl(waUrl);
      window.open(waUrl, "_blank", "noopener,noreferrer");
      onSuccess?.();
    } catch (err) {
      setSubmitState("error");
      setServerError(
        err instanceof ApiError
          ? err.message
          : "We couldn't submit your enquiry right now. Please try again or contact us on WhatsApp."
      );
    }
  };

  const done = () => {
    reset();
    setStep(1);
    setSubmitState("idle");
    setServerError(null);
    onDone?.();
  };

  const form = (
    <form
      onSubmit={step === 1 ? (event) => { event.preventDefault(); void continueToStepTwo(); } : handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {mode === "sheet" && (
        <div aria-live="polite">
          <span className="sr-only">Step {step} of 2</span>
          <div className="flex gap-2" aria-hidden="true">
            <span className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-gold-500" : "bg-charcoal-100"}`} />
            <span className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-gold-500" : "bg-charcoal-100"}`} />
          </div>
        </div>
      )}

      {submitState === "success" ? (
        <div className="space-y-4" aria-live="polite">
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Your enquiry has been submitted. WhatsApp is opening with your enquiry details.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsAppUrl}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              Continue on WhatsApp
            </ButtonLink>
            <Button type="button" variant="ghost" onClick={done} className="flex-1">Done</Button>
          </div>
        </div>
      ) : (
        <>
          {step === 1 ? (
            <div key="step-one" className="space-y-4">
              <Input
                id="name"
                label="Full Name"
                placeholder="Rahul Sharma"
                autoComplete="name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                id="mobile"
                label="Mobile Number"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel-national"
                placeholder="9876543210"
                error={errors.mobile?.message}
                {...register("mobile")}
              />
              <Input
                id="pincode"
                label="Pincode"
                inputMode="numeric"
                maxLength={6}
                autoComplete="postal-code"
                placeholder="395007"
                error={errors.pincode?.message}
                {...register("pincode")}
              />
              <Button type="submit" className="w-full">Continue</Button>
            </div>
          ) : (
            <div key="step-two" className="space-y-4">
              <Input id="city" label="City" placeholder="Surat" autoComplete="address-level2" error={errors.city?.message} {...register("city")} />
              <Textarea id="address" label="Address" placeholder="Flat / House no, street, area" autoComplete="street-address" error={errors.address?.message} {...register("address")} />
              <Input id="email" label="Email (optional)" type="email" placeholder="rahul@example.com" autoComplete="email" error={errors.email?.message} {...register("email")} />
              {serverError && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{serverError}</p>}
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button type="button" variant="ghost" onClick={() => setStep(1)} className="sm:flex-1">Back</Button>
                <Button type="submit" className="sm:flex-1" isLoading={submitState === "submitting"}>Submit</Button>
              </div>
            </div>
          )}
        </>
      )}
    </form>
  );

  if (mode === "sheet") return form;

  return (
    <Card className="w-full max-w-[720px]">
      <CardBody className="p-6 sm:p-8">
        <h3 className="text-center text-2xl md:text-3xl">Book a Free Demo</h3>
        <p className="mt-1 text-center text-sm leading-6">Get expert-fitted RO purification at your home.</p>
        <div className="mt-6">{form}</div>
      </CardBody>
    </Card>
  );
}
