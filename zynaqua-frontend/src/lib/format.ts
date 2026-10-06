const INDIA_DATE_FORMATTER = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Asia/Kolkata",
});

const INDIA_DATE_KEY_FORMATTER = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "Asia/Kolkata",
});

export function formatDate(iso: string): string {
  return INDIA_DATE_FORMATTER.format(new Date(iso));
}

export function formatRelativeDate(iso: string): string {
  const today = INDIA_DATE_KEY_FORMATTER.format(new Date());
  const date = new Date(iso);
  const dateKey = INDIA_DATE_KEY_FORMATTER.format(date);
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = INDIA_DATE_KEY_FORMATTER.format(yesterdayDate);

  if (dateKey === today) return "Today";
  if (dateKey === yesterday) return "Yesterday";
  return formatDate(iso);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function humanizeEnum(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
