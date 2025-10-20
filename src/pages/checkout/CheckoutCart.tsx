import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { ChevronRight } from "lucide-react";

const subtotal = 291.09;
const items = [
  { id: 1, name: "Siena Light", code: "O2", size: "Size 40", price: 145.59 },
  { id: 2, name: "Siena Light", code: "O5", size: "Size 40", price: 145.5 },
];

export const CheckoutCart = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        {items.map((item) => (
          <Card key={item.id} className="mb-4">
            <CardContent className="flex items-center p-4 justify-between">
              <div className="flex items-center gap-4">
                <img
                  src="https://www.topoathletic.com/sca-product-images/M069.Blue-Orange_00.jpg"
                  alt={item.name}
                  className="w-24 h-24 object-contain"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.code}, {item.size}
                  </p>
                  <p className="text-sm text-gray-500">
                    Who are these shoes for? (optional)
                  </p>
                  <div className="mt-2 flex items-center border rounded-md w-fit">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      −
                    </Button>
                    <div className="px-2 text-sm">1</div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      +
                    </Button>
                  </div>
                </div>
              </div>
              <div className="text-right font-semibold text-gray-700">
                €{item.price.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Summary subtotal={subtotal}>
        <Button className="w-full mt-4" onClick={onNext}>
          Proceed to Checkout <ChevronRight />
        </Button>
      </Summary>
    </div>
  );
};
