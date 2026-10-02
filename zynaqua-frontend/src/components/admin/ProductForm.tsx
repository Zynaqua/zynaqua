"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi, AdminApiError } from "@/lib/adminApi";
import { Button, Input, Textarea, Card, CardBody } from "@/components/ui";

interface ImageRow { imageUrl: string; altText: string; displayOrder: number; isPrimary: boolean; }
interface FeatureRow { featureName: string; featureValue: string; displayOrder: number; }
interface SpecRow { specificationName: string; specificationValue: string; displayOrder: number; }

export interface ProductFormValues {
  name: string;
  modelName: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: string;
  mrp: string;
  category: string;
  isFeatured: boolean;
  images: ImageRow[];
  features: FeatureRow[];
  specifications: SpecRow[];
}

interface ProductFormProps {
  initialValues?: ProductFormValues;
  productId?: number; // present only in edit mode
}

const EMPTY_FORM: ProductFormValues = {
  name: "",
  modelName: "",
  slug: "",
  shortDescription: "",
  description: "",
  price: "",
  mrp: "",
  category: "",
  isFeatured: false,
  images: [],
  features: [],
  specifications: [],
};

export function ProductForm({ initialValues, productId }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = productId !== undefined;
  const [values, setValues] = useState<ProductFormValues>(initialValues ?? EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  const addImage = () => update("images", [...values.images, { imageUrl: "", altText: "", displayOrder: values.images.length, isPrimary: values.images.length === 0 }]);
  const addFeature = () => update("features", [...values.features, { featureName: "", featureValue: "", displayOrder: values.features.length }]);
  const addSpec = () => update("specifications", [...values.specifications, { specificationName: "", specificationValue: "", displayOrder: values.specifications.length }]);

  const removeAt = <T,>(list: T[], index: number) => list.filter((_, i) => i !== index);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const payload = {
      name: values.name,
      modelName: values.modelName,
      slug: values.slug || undefined,
      shortDescription: values.shortDescription || undefined,
      description: values.description || undefined,
      price: Number(values.price),
      mrp: values.mrp ? Number(values.mrp) : undefined,
      category: values.category || undefined,
      isFeatured: values.isFeatured,
      images: values.images,
      features: values.features,
      specifications: values.specifications,
    };

    try {
      if (isEditMode) {
        await adminApi.put(`/admin/products/${productId}`, payload);
      } else {
        await adminApi.post(`/admin/products`, payload);
      }
      router.push("/admin/products");
    } catch (err) {
      setError(err instanceof AdminApiError ? err.message : "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <Card><CardBody className="space-y-4">
        <h3>Basic Details</h3>
        <Input
          label="Product Name"
          required
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
        />

        <Input
          label="Model Name"
          required
          value={values.modelName}
          onChange={(e) => update("modelName", e.target.value)}
          placeholder="e.g. Model 1"
        />

        <Input
          label="Slug (optional — auto-generated from name if left blank)"
          value={values.slug}
          onChange={(e) => update("slug", e.target.value)}
        />
        <Input label="Short Description" value={values.shortDescription} onChange={(e) => update("shortDescription", e.target.value)} />
        <Textarea label="Full Description" value={values.description} onChange={(e) => update("description", e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price (₹)" type="number" required value={values.price} onChange={(e) => update("price", e.target.value)} />
          <Input label="MRP (₹, optional)" type="number" value={values.mrp} onChange={(e) => update("mrp", e.target.value)} />
        </div>
        <Input label="Category" value={values.category} onChange={(e) => update("category", e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-charcoal-700">
          <input type="checkbox" checked={values.isFeatured} onChange={(e) => update("isFeatured", e.target.checked)} />
          Featured product (shown on homepage)
        </label>
      </CardBody></Card>

      <Card><CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>Images</h3>
          <Button type="button" variant="outline" size="sm" onClick={addImage}>Add Image</Button>
        </div>
        {values.images.map((img, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 rounded-lg border border-charcoal-100 p-3 sm:grid-cols-[1fr_1fr_auto_auto]">
            <Input placeholder="/images/products/example.webp" value={img.imageUrl}
              onChange={(e) => update("images", values.images.map((row, idx) => idx === i ? { ...row, imageUrl: e.target.value } : row))} />
            <Input placeholder="Alt text" value={img.altText}
              onChange={(e) => update("images", values.images.map((row, idx) => idx === i ? { ...row, altText: e.target.value } : row))} />
            <label className="flex items-center gap-1 text-xs">
              <input type="radio" name="primaryImage" checked={img.isPrimary}
                onChange={() => update("images", values.images.map((row, idx) => ({ ...row, isPrimary: idx === i })))} />
              Primary
            </label>
            <Button type="button" variant="ghost" size="sm" onClick={() => update("images", removeAt(values.images, i))}>Remove</Button>
          </div>
        ))}
      </CardBody></Card>

      <Card><CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>Feature Chips</h3>
          <Button type="button" variant="outline" size="sm" onClick={addFeature}>Add Feature</Button>
        </div>
        {values.features.map((f, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 rounded-lg border border-charcoal-100 p-3 sm:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Feature name (e.g. RO Purification)" value={f.featureName}
              onChange={(e) => update("features", values.features.map((row, idx) => idx === i ? { ...row, featureName: e.target.value } : row))} />
            <Input placeholder="Value (optional)" value={f.featureValue}
              onChange={(e) => update("features", values.features.map((row, idx) => idx === i ? { ...row, featureValue: e.target.value } : row))} />
            <Button type="button" variant="ghost" size="sm" onClick={() => update("features", removeAt(values.features, i))}>Remove</Button>
          </div>
        ))}
      </CardBody></Card>

      <Card><CardBody className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>Specifications</h3>
          <Button type="button" variant="outline" size="sm" onClick={addSpec}>Add Specification</Button>
        </div>
        {values.specifications.map((s, i) => (
          <div key={i} className="grid grid-cols-1 gap-2 rounded-lg border border-charcoal-100 p-3 sm:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Name (e.g. Storage Capacity)" value={s.specificationName}
              onChange={(e) => update("specifications", values.specifications.map((row, idx) => idx === i ? { ...row, specificationName: e.target.value } : row))} />
            <Input placeholder="Value (e.g. 8L)" value={s.specificationValue}
              onChange={(e) => update("specifications", values.specifications.map((row, idx) => idx === i ? { ...row, specificationValue: e.target.value } : row))} />
            <Button type="button" variant="ghost" size="sm" onClick={() => update("specifications", removeAt(values.specifications, i))}>Remove</Button>
          </div>
        ))}
      </CardBody></Card>

      <div className="flex gap-3">
        <Button type="submit" isLoading={isSubmitting}>{isEditMode ? "Save Changes" : "Create Product"}</Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/products")}>Cancel</Button>
      </div>
    </form>
  );
}