export default function AdminRouteGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-charcoal-50">
      {children}
    </div>
  );
}