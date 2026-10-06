import Link from "next/link";
import { Badge, ButtonLink, StatusBadge } from "@/components/ui";
import { buildCustomerWhatsAppUrl, buildPhoneUrl } from "@/lib/whatsapp";
import { ENQUIRY_TYPE_LABEL, SOURCE_LABEL } from "@/lib/status";
import { formatDate } from "@/lib/format";
import type { EnquiryStatus, EnquiryType } from "@/types";
import type { LeadListItem } from "./LeadTable";

export function LeadCard({ lead }: { lead: LeadListItem }) {
  const name = lead.customerName;
  return (
    <article className="rounded-xl border border-charcoal-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/admin/leads/${lead.enquiryId}`} className="min-w-0 break-words font-semibold text-charcoal-950 hover:underline">
          {name}
        </Link>
        <StatusBadge status={lead.status} />
      </div>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <a href={buildPhoneUrl(lead.customerMobile)} className="min-h-11 inline-flex items-center text-charcoal-700 underline">{lead.customerMobile}</a>
        {lead.customerCity && <span className="inline-flex min-h-11 items-center text-charcoal-400">{lead.customerCity}</span>}
      </div>
      <p className="text-sm text-charcoal-400">
        {ENQUIRY_TYPE_LABEL[lead.enquiryType as EnquiryType] ?? lead.enquiryType} · {formatDate(lead.createdAt)} · {SOURCE_LABEL[lead.source]}
        {lead.productName ? ` · ${lead.productName}` : ""}
      </p>
      <div className="mt-3 flex gap-2">
        <ButtonLink href={buildPhoneUrl(lead.customerMobile)} variant="outline" size="sm" aria-label={`Call ${name}`}>Call</ButtonLink>
        <ButtonLink href={buildCustomerWhatsAppUrl(lead.customerMobile, `Hello ${name}, this is ZynAqua following up on your enquiry.`)} variant="whatsapp" size="sm" external aria-label={`WhatsApp ${name}`}>WhatsApp</ButtonLink>
        <ButtonLink href={`/admin/leads/${lead.enquiryId}`} variant="ghost" size="sm" aria-label={`View ${name}`}>View</ButtonLink>
      </div>
    </article>
  );
}
