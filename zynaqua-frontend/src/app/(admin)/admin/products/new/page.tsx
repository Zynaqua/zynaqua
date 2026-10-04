import { ProductForm } from "@/components/admin/ProductForm";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

export default function NewProductPage() {
  return (
    <AdminPage className="max-w-3xl">
      <AdminPageHeader title="Add Product" description="Create a product and its associated content." />
      <div className="mt-6">
        <ProductForm />
      </div>
    </AdminPage>
  );
}