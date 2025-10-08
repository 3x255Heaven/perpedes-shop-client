import { Card, CardContent } from "@/components/shared/card";

type Product = {
  id: number;
  name: string;
  image: string;
};

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      <Card
        key={product.id}
        className="shadow-none border-0 flex flex-col items-center bg-muted/50 aspect-square"
      >
        <CardContent className="p-4 flex flex-col items-center justify-center h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="w-[85%] h-[85%] object-contain"
          />
        </CardContent>
      </Card>
      <span className="text-lg font-medium ml-2">{product.name}</span>
    </div>
  );
};
