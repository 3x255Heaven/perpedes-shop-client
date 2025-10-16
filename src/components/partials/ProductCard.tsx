import { useNavigate } from "react-router";
import { Card, CardContent } from "@/components/shared/card";
import type { ProductPreview } from "@/hooks/useProducts";

export const ProductCard = ({
  product,
  displayName = true,
}: {
  product: ProductPreview;
  displayName: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col justify-center gap-4 cursor-pointer"
      onClick={() => {
        navigate(`/products/${product.productId}`);
      }}
    >
      <Card
        key={product.productId}
        className="shadow-none border-0 flex flex-col items-center bg-muted/50 aspect-square"
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full w-full">
          <img
            src={product.images[0]?.imageUrl}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain opacity-0 transition-opacity duration-500"
            onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
          />
        </CardContent>
      </Card>
      {displayName && (
        <span className="text-lg font-medium ml-2">{product.name}</span>
      )}
    </div>
  );
};
