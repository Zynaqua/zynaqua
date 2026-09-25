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
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1>Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="mt-6 space-y-3">
        {products.map((product) => (
          <Card key={product.id} className={!product.isActive ? "opacity-60" : undefined}>
            <CardBody className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h4>{product.name}</h4>
                  {!product.isActive && <Badge variant="danger">Inactive</Badge>}
                  {product.isFeatured && <Badge variant="gold">Featured</Badge>}
                </div>
                <p className="mt-1 text-sm text-charcoal-400">
                  {product.category ?? "Uncategorized"} · ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/products/${product.id}/edit`}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button
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