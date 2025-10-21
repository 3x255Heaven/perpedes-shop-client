import { Summary } from "@/components/partials/Summary";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { useCart } from "@/context/CartContext";
import { ChevronRight, Trash2 } from "lucide-react";

export const CheckoutCart = ({ onNext }: { onNext: () => void }) => {
  const { products, total, removeItem, increaseQuantity, decreaseQuantity } =
    useCart();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {products.map((product) => (
          <Card key={product.id} className="mb-4">
            <CardContent className="flex flex-col lg:flex-row items-center p-4 justify-between">
              <div className="flex flex-col w-full lg:flex-row lg:justify-between items-center gap-4">
                <img
                  src={product.images[0]?.imageUrl}
                  alt={product.name}
                  className="w-44 h-44 object-contain"
                />
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="flex flex-col items-left justify-center gap-1">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.articleNumber}
                    </p>
                    <p className="text-sm">HVM: {product.hmv}</p>
                  </div>

                  <div className="flex gap-2 items-center mt-2">
                    <div className="flex items-center border rounded-md w-fit">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          decreaseQuantity(product.id);
                        }}
                      >
                        −
                      </Button>
                      <div className="px-2 text-sm">{product.quantity}</div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          increaseQuantity(product.id);
                        }}
                      >
                        +
                      </Button>
                    </div>

                    <Badge
                      className="cursor-pointer"
                      variant="destructive"
                      onClick={() => {
                        removeItem(product.id);
                      }}
                    >
                      <Trash2 className="!h-[26px] !w-[18px]" />
                    </Badge>
                  </div>

                  <div className="text-right font-semibold text-gray-700 text-3xl">
                    {product.price?.formattedPrice}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Summary total={total}>
        <Button className="w-full mt-4" onClick={onNext}>
          Proceed to Checkout <ChevronRight />
        </Button>
      </Summary>
    </div>
  );
};
