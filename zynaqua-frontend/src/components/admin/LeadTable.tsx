import Link from "next/link";
import { Badge } from "@/components/ui";
import type { EnquiryStatus } from "@/types";

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
}

const STATUS_BADGE_VARIANT: Record<EnquiryStatus, "neutral" | "success" | "warning" | "danger" | "aqua" | "gold"> = {
  NEW: "aqua",
  CONTACTED: "gold",
  FOLLOW_UP: "warning",
  DEMO_SCHEDULED: "gold",
  DEMO_COMPLETED: "gold",
  CONVERTED: "success",
  NOT_INTERESTED: "danger",
  CANCELLED: "neutral",
};

interface LeadTableProps {
  leads: LeadListItem[];
}

export function LeadTable({ leads }: LeadTableProps) {
  if (leads.length === 0) {
    return <p className="py-12 text-center text-charcoal-400">No leads match your search or filters.</p>;
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden min-w-0 overflow-x-auto rounded-xl border border-charcoal-100 md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal-100 bg-charcoal-50">
            <tr>
              <th className="px-4 py-3 font-medium text-charcoal-700">Name</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Mobile</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">City</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Type</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Status</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Date</th>
              <th className="px-4 py-3 font-medium text-charcoal-700">Source</th>
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
                <td className="px-4 py-3 text-charcoal-700">{lead.customerCity}</td>
                <td className="px-4 py-3 text-charcoal-700">{lead.enquiryType.replace(/_/g, " ")}</td>
                <td className="px-4 py-3">
                  <Badge variant={STATUS_BADGE_VARIANT[lead.status]}>{lead.status.replace(/_/g, " ")}</Badge>
                </td>
                <td className="px-4 py-3 text-charcoal-400">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN")}
                </td>
                 <td className="px-4 py-3">
                  <Badge variant={lead.source === "OFFLINE" ? "aqua" : "neutral"}>
                    {lead.source === "OFFLINE" ? "Offline" : "Online"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-3 md:hidden">
        {leads.map((lead) => (
          <Link
            key={lead.enquiryId}
            href={`/admin/leads/${lead.enquiryId}`}
            className="block rounded-xl border border-charcoal-100 p-4"
          >
            <div className="flex flex-col gap-2">
              <div>
                <p className="font-medium text-charcoal-950">{lead.customerName}</p>
                <p className="text-sm text-charcoal-400">{lead.customerMobile} · {lead.customerCity}</p>
              </div>
              <p className="text-xs text-charcoal-400">
                {lead.enquiryType.replace(/_/g, " ")} ·{" "}
                {new Date(lead.createdAt).toLocaleDateString("en-IN")}
              </p>
              <p className="text-xs text-charcoal-400">
                Source:{" "}
                <span className={lead.source === "OFFLINE" ? "font-medium text-aqua-600" : ""}>
                  {lead.source === "OFFLINE" ? "Offline" : "Online"}
                </span>
              </p>
              <Badge variant={STATUS_BADGE_VARIANT[lead.status]}>{lead.status.replace(/_/g, " ")}</Badge>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
