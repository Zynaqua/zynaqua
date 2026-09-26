import { ProductCard } from "./ProductCard";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  groupByCategory?: boolean;
}

export function ProductGrid({ products, groupByCategory = false }: ProductGridProps) {
  if (!groupByCategory) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} priority={index < 3} />
        ))}
      </div>
    );
  }

  const grouped = products.reduce<Record<string, Product[]>>((acc, product) => {
    const key = product.category ?? "Other";
    acc[key] = acc[key] ? [...acc[key], product] : [product];
    return acc;
  }, {});

  let renderedCount = 0;

  return (
    <div className="space-y-12">
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h3 className="mb-5">{category}</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((product) => {
              const isPriority = renderedCount < 3;
              renderedCount++;
              return <ProductCard key={product.id} product={product} priority={isPriority} />;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}