import { cn } from "@/lib/utils";

export function AdminPage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 md:py-8", className)} {...props} />;
}
