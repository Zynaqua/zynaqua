import { LeadForm } from "@/components/admin/LeadForm";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewLeadPage() {
  return (
    <AdminPage className="max-w-3xl">
      <AdminPageHeader title="Add Lead" description="For a customer who contacted ZynAqua offline — phone, WhatsApp, or a walk-in." />
      <div className="mt-6">
        <LeadForm />
      </div>
    </AdminPage>
  );
}