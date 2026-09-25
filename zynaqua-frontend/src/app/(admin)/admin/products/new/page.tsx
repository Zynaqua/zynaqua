import { ProductForm } from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1>Add Product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}