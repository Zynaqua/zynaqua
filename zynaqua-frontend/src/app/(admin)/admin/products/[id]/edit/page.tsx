"use client";

import { use, useEffect, useState } from "react";
import { adminApi } from "@/lib/adminApi";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import type { Product } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

function toFormValues(product: Product): ProductFormValues {
  return {
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? "",
    description: product.description ?? "",
    price: String(product.price),
    mrp: product.mrp ? String(product.mrp) : "",
    category: product.category ?? "",
    isFeatured: product.isFeatured,
    images: product.images.map((img, i) => ({
      imageUrl: img.imageUrl, altText: img.altText ?? "", displayOrder: img.displayOrder ?? i, isPrimary: img.isPrimary,
    })),
    features: product.features.map((f, i) => ({
      featureName: f.featureName, featureValue: f.featureValue ?? "", displayOrder: f.displayOrder ?? i,
    })),
    specifications: product.specifications.map((s, i) => ({
      specificationName: s.specificationName, specificationValue: s.specificationValue, displayOrder: s.displayOrder ?? i,
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
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1>Edit Product</h1>
      <div className="mt-6">
        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
        {!initialValues && !error && <p className="text-charcoal-400">Loading…</p>}
        {initialValues && <ProductForm initialValues={initialValues} productId={Number(id)} />}
      </div>
    </div>
  );
}