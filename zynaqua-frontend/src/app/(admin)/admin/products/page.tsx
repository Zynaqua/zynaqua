"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, AdminApiError } from "@/lib/adminApi";
import { Button, Card, CardBody, Badge } from "@/components/ui";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const load = () => {
    adminApi.get<Product[]>("/admin/products").then(setProducts).catch((err) => setError(err.message));
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
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1>Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-3">
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
                <Link className="min-w-0" href={`/admin/products/${product.id}/edit`}>
                  <Button className="w-full" variant="outline" size="sm">Edit</Button>
                </Link>
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
    </div>
  );
}