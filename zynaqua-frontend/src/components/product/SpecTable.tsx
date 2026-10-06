import type { ProductSpecification } from "@/types";

interface SpecTableProps {
  specifications: ProductSpecification[];
}

export function SpecTable({ specifications }: SpecTableProps) {
  if (specifications.length === 0) return null;

  const sorted = [...specifications].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="rounded-2xl border border-charcoal-100">
      <table className="w-full table-fixed text-left text-sm">
        <tbody>
          {sorted.map((spec, index) => (
            <tr
              key={spec.id}
              className={index % 2 === 0 ? "bg-white" : "bg-charcoal-50"}
            >
              <th
                scope="row"
                className="w-1/3 break-words px-4 py-3 font-medium text-charcoal-700"
              >
                {spec.specificationName}
              </th>
              <td className="break-words px-4 py-3 text-charcoal-950">{spec.specificationValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}