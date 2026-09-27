import { LeadForm } from "@/components/admin/LeadForm";

export default function NewLeadPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1>Add Lead</h1>
      <p className="mt-1 text-sm text-charcoal-400">
        For a customer who contacted ZynAqua offline — phone, WhatsApp, or a walk-in.
      </p>
      <div className="mt-6">
        <LeadForm />
      </div>
    </div>
  );
}