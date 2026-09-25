import Link from "next/link";
import { Button } from "@/components/ui";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1>Product Not Found</h1>
      <p className="mt-3">
        This product may have been discontinued or the link may be outdated.
      </p>
      <Link href="/products" className="mt-6 inline-block">
        <Button variant="primary">Browse All Products</Button>
      </Link>
    </div>
  );
}