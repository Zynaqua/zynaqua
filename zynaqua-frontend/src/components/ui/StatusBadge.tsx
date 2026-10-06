import type { EnquiryStatus } from "@/types";
import { LEAD_STATUS_META } from "@/lib/status";
import { Badge } from "./Badge";

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  const meta = LEAD_STATUS_META[status];
  return <Badge variant={meta.variant}>{meta.label}</Badge>;
}
