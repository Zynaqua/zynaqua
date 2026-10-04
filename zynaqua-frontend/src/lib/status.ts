import type { EnquirySource, EnquiryStatus, EnquiryType } from "@/types";
import type { BadgeProps } from "@/components/ui/Badge";

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

export const LEAD_STATUS_META: Record<EnquiryStatus, { label: string; variant: BadgeVariant }> = {
  NEW: { label: "New", variant: "info" },
  CONTACTED: { label: "Contacted", variant: "aqua" },
  FOLLOW_UP: { label: "Follow-up", variant: "warning" },
  DEMO_SCHEDULED: { label: "Demo scheduled", variant: "gold" },
  DEMO_COMPLETED: { label: "Demo completed", variant: "success" },
  CONVERTED: { label: "Converted", variant: "success" },
  NOT_INTERESTED: { label: "Not interested", variant: "neutral" },
  CANCELLED: { label: "Cancelled", variant: "danger" },
};

export const ENQUIRY_TYPE_LABEL: Record<EnquiryType, string> = {
  FREE_DEMO: "Free demo",
  PRODUCT_ENQUIRY: "Product enquiry",
  AMC: "AMC",
  SERVICE: "Service",
  GENERAL: "General",
};

export const SOURCE_LABEL: Record<EnquirySource, string> = {
  ONLINE: "Online",
  OFFLINE: "Offline",
};
