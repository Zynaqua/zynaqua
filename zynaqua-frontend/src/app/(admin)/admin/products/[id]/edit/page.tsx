"use client";

import { use, useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import type { Product } from "@/types";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Alert } from "@/components/ui";

interface PageProps {
  params: Promise<{ id: string }>;
}

function toFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    modelName: product.modelName ?? "",
    slug: product.slug,
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    price: String(product.price),
    mrp: product.mrp ? String(product.mrp) : "",
    category: product.category ?? "",
    isFeatured: product.isFeatured,
    images: product.images.map((img, i) => ({
      imageUrl: img.imageUrl,
      altText: img.altText ?? "",
      displayOrder: img.displayOrder ?? i,
      isPrimary: img.isPrimary,
    })),
    features: product.features.map((f, i) => ({
      featureName: f.featureName,
      featureValue: f.featureValue ?? "",
      displayOrder: f.displayOrder ?? i,
    })),
    specifications: product.specifications.map((s, i) => ({
      specificationName: s.specificationName,
      specificationValue: s.specificationValue,
      displayOrder: s.displayOrder ?? i,
    })),
  };
}

export default function EditProductPage({ params }: PageProps) {
  const { id } = use(params);
  const [initialValues, setInitialValues] = useState<ProductFormValues | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    adminApi.get<Product[]>("/admin/products")
      .then((products) => {
        const product = products.find((p) => p.id === Number(id));
        if (!product) {
          setError("Product not found");
          return;
        }
        setInitialValues(toFormValues(product));
      })
      .catch((err) => setError(err.message ?? "Failed to load product"));
  }, [id]);

  return (
    <AdminPage className="max-w-3xl">
      <AdminPageHeader title="Edit Product" description="Update product content without changing its API contract." />
      <div className="mt-6">
        {error && <Alert variant="error">{error}</Alert>}
        {!initialValues && !error && <p className="text-charcoal-400">Loading…</p>}
        {initialValues && <ProductForm initialValues={initialValues} productId={Number(id)} />}
      </div>
    </AdminPage>
  );
}