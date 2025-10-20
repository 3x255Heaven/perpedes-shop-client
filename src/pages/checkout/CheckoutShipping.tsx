import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Box, ChevronLeft, ChevronRight, Truck } from "lucide-react";

export const CheckoutShipping = ({
  onBack,
  onNext,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <p>
              Perpedes GmbH
              <br />
              Tannenbergstr. 139
              <br />
              73230 Kirchheim Teck
              <br />
              Deutschland
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">Shipping Method</h3>
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <Truck className="text-gray-400" />
                <div>
                  <p className="font-medium">Standard Shipping</p>
                  <p className="text-sm text-gray-500">
                    Delivery in 3-5 business days
                  </p>
                </div>
              </div>
              <p className="font-medium">Free</p>
            </div>
            <div className="border rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center justify-center gap-3">
                <Box className="text-gray-400" />
                <div>
                  <p className="font-medium">Express Shipping</p>
                  <p className="text-sm text-gray-500">
                    Delivery in 1-2 business days
                  </p>
                </div>
              </div>
              <p className="font-medium">€9,99</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Summary subtotal={291.09}>
        <Button className="w-full mt-4" onClick={onNext}>
          Continue to Payment <ChevronRight />
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onBack}>
          <ChevronLeft /> Back to Cart
        </Button>
      </Summary>
    </div>
  );
};
