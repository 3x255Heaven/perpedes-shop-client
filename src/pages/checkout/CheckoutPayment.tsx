import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Banknote, BookA, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { PaymentMethodItem } from "./Checkout";

export const CheckoutPayment = ({
  onBack,
  onNext,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: {
  onNext: () => void;
  onBack: () => void;
  selectedPaymentMethod: PaymentMethodItem;
  setSelectedPaymentMethod: (data: PaymentMethodItem) => void;
}) => {
  const { total } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">Payment Method</h3>

            <div
              onClick={() => {
                setSelectedPaymentMethod({
                  id: "invoice",
                  name: "Invoice",
                  value: "Payment within 14 days",
                });
              }}
              className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                selectedPaymentMethod.id === "invoice"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <BookA className="text-gray-400" />
                <div>
                  <p className="font-medium">Invoice</p>
                  <p className="text-sm text-gray-500">
                    Payment within 14 days
                  </p>
                </div>
              </div>
            </div>

            <div
              onClick={() => {
                setSelectedPaymentMethod({
                  id: "prepayment",
                  name: "Prepayment",
                  value: "Bank transfer before shipping",
                });
              }}
              className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                selectedPaymentMethod.id === "prepayment"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Banknote className="text-gray-400" />
                <div>
                  <p className="font-medium">Prepayment</p>
                  <p className="text-sm text-gray-500">
                    Bank transfer before shipping
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Summary total={total}>
        <Button className="w-full mt-4" onClick={onNext}>
          Complete Order <ChevronRight />
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onBack}>
          <ChevronLeft /> Back to Shipping
        </Button>
      </Summary>
    </div>
  );
};
