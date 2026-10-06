import Link from "next/link";
import { Badge } from "@/components/ui";
import type { EnquiryStatus } from "@/types";
import { StatusBadge } from "@/components/ui";
import { ENQUIRY_TYPE_LABEL, SOURCE_LABEL } from "@/lib/status";
import { formatDate } from "@/lib/format";
import { LeadCard } from "./LeadCard";

export interface LeadListItem {
  enquiryId: number;
  customerId: number;
  customerName: string;
  customerMobile: string;
  customerCity: string;
  enquiryType: string;
  source: "ONLINE" | "OFFLINE";
  status: EnquiryStatus;
  createdAt: string;
  productName?: string | null;
}

interface LeadTableProps {
  leads: LeadListItem[];
}

export function LeadTable({ leads }: LeadTableProps) {
  if (leads.length === 0) {
    return null;
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden min-w-0 overflow-x-auto rounded-xl border border-charcoal-100 lg:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal-100 bg-charcoal-50">
            <tr>
              <th className="px-4 py-3 font-medium text-charcoal-700">Name</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Mobile</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Enquiry</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Status</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Date</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Source</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal-100">
            {leads.map((lead) => (
              <tr key={lead.enquiryId} className="hover:bg-charcoal-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.enquiryId}`} className="font-medium text-charcoal-950 hover:underline">
                    {lead.customerName}
                  </Link>
                </td>
                <td className="px-4 py-3 text-charcoal-700">{lead.customerMobile}</td>
                <td className="px-4 py-3 text-charcoal-700">{lead.customerCity}<br /><span className="text-xs text-charcoal-400">{ENQUIRY_TYPE_LABEL[lead.enquiryType as keyof typeof ENQUIRY_TYPE_LABEL] ?? lead.enquiryType}</span></td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-charcoal-400">
                  {formatDate(lead.createdAt)}
                </td>
                 <td className="px-4 py-3">
                  <Badge variant={lead.source === "OFFLINE" ? "aqua" : "neutral"}>
                    {SOURCE_LABEL[lead.source]}
                  </Badge>
                </td>
                <td className="px-4 py-3"><Link className="min-h-11 inline-flex items-center text-sm font-medium underline" href={`/admin/leads/${lead.enquiryId}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 lg:hidden">
        {leads.map((lead) => <LeadCard key={lead.enquiryId} lead={lead} />)}
      </div>
    </>
  );
}
