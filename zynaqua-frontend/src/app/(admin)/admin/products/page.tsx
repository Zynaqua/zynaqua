"use client";

import { useEffect, useState } from "react";
import { adminApi, AdminApiError } from "@/lib/adminApi";
import { Alert, Button, ButtonLink, Card, CardBody, Badge, Skeleton } from "@/components/ui";
import type { Product } from "@/types";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const load = () => {
    setError(null);
    setIsLoading(true);
    adminApi.get<Product[]>("/admin/products").then(setProducts).catch((err) => setError(err.message ?? "Failed to load products")).finally(() => setIsLoading(false));
  };

  useEffect(load, []);

  const toggleActive = async (product: Product) => {
    setBusyId(product.id);
    try {
      if (product.isActive) {
        await adminApi.delete(`/admin/products/${product.id}`);
      } else {
        await adminApi.put(`/admin/products/${product.id}/reactivate`, {});
      }
      load();
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Action failed");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <AdminPage>
      <AdminPageHeader title="Products" description="Manage the products shown across the ZynAqua website." actions={<ButtonLink href="/admin/products/new">Add Product</ButtonLink>} />

      {error && <div className="mt-4"><Alert variant="error">{error}<button className="ml-3 min-h-11 underline" onClick={load}>Retry</button></Alert></div>}

      <div className="mt-6 space-y-3">
        {isLoading && <Skeleton className="h-24" />}
        {!isLoading && !error && products.length === 0 && <div className="rounded-xl border border-charcoal-100 bg-white p-10 text-center text-charcoal-400">No products found.</div>}
        {products.map((product) => (
          <Card interactive key={product.id} className={!product.isActive ? "opacity-60" : undefined}>
            <CardBody className="flex flex-col gap-3 min-[641px]:flex-row min-[641px]:items-center min-[641px]:justify-between">
              <div className="min-w-0">
                <div className="flex flex-col gap-2 min-[641px]:flex-row min-[641px]:items-center">
                  <h4 className="break-words">{product.name}</h4>
                  <div className="flex flex-wrap gap-2">
                    {!product.isActive && <Badge variant="danger">Inactive</Badge>}
                    {product.isFeatured && <Badge variant="gold">Featured</Badge>}
                  </div>
                </div>
                <p className="mt-1 text-sm text-charcoal-400">
                  {product.category ?? "Uncategorized"} · ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 min-[641px]:flex">
                <ButtonLink className="w-full" href={`/admin/products/${product.id}/edit`} variant="outline" size="sm">Edit</ButtonLink>
                <Button
                  className="w-full"
                  variant={product.isActive ? "ghost" : "secondary"}
                  size="sm"
                  isLoading={busyId === product.id}
                  onClick={() => toggleActive(product)}
                >
                  {product.isActive ? "Deactivate" : "Reactivate"}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      {!error && products.length > 0 && <p className="sr-only">End of products</p>}
    </AdminPage>
  );
}