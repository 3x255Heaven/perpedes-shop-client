import { useParams } from "react-router";
import { useSimilarProductsQuery } from "@/hooks/useProducts";
import { ProductCard } from "@/components/partials/ProductCard";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/shared/button";

export const ProductSimilar = () => {
  const { id } = useParams();

  const { data, isLoading, isError, refetch } = useSimilarProductsQuery(id);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading similar products...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full flex flex-col justify-center items-center p-8 text-center">
        <p className="text-red-500 font-medium mb-4">
          Failed to load similar products.
        </p>
        <Button onClick={() => refetch()}>Try Again</Button>
      </div>
    );
  }

  if (!data || data.products.length === 0) return null;

  return (
    <div className="w-full flex flex-col justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Similar Products</h1>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {data.products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </div>
  );
};
