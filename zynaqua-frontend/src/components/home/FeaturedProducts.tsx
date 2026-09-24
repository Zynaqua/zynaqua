
import { Card, CardBody, Badge, Button } from "@/components/ui";
import type { Product } from "@/types";

const PLACEHOLDER_FEATURED: Pick<Product, "id" | "name" | "shortDescription" | "price">[] = [
  { id: 1, name: "AquaPure RO+", shortDescription: "7-stage RO purification with alkaline booster", price: 12999 },
  { id: 2, name: "ZynAqua Copper", shortDescription: "RO + UV with copper-infused mineral cartridge", price: 15499 },
  { id: 3, name: "AquaPure Mini", shortDescription: "Compact RO purifier for small kitchens", price: 9499 },
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PLACEHOLDER_FEATURED.map((product) => (
        <Card key={product.id}>
          <CardBody>
            <Badge variant="gold">Featured</Badge>
            <h4 className="mt-3">{product.name}</h4>
            <p className="mt-1 text-sm">{product.shortDescription}</p>
            <p className="mt-3 text-lg font-bold text-charcoal-950">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
            <Button variant="outline" size="sm" className="mt-4 w-full">
              View Details
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}