import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import type { ShippingMethodItem } from "./Checkout";
import { useTranslation } from "react-i18next";

export const CheckoutShipping = ({
  onBack,
  onNext,
  selectedShippingMethod,
  setSelectedShippingMethod,
}: {
  onNext: () => void;
  onBack: () => void;
  selectedShippingMethod: ShippingMethodItem;
  setSelectedShippingMethod: (data: ShippingMethodItem) => void;
}) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { total } = useCart();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{t("shipping_address")}</h3>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>{user?.name}</p>
              <p>{user?.street}</p>
              <p>
                {user?.zip} {user?.city}
              </p>
              <p>{user?.id}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">{t("shipping_method")}</h3>

            <div
              onClick={() => {
                setSelectedShippingMethod({
                  id: "standard",
                  name: "Standard Shipping",
                  value: "Delivery in 3-5 business days",
                });
              }}
              className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                selectedShippingMethod.id === "standard"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
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

            {/* <div
              onClick={() => {
                setSelectedShippingMethod({
                  id: "express",
                  name: "Express Shipping",
                  value: "Delivery in 1-2 business days",
                });
              }}
              className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                selectedShippingMethod.id === "express"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200"
              }`}
            >
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
            </div> */}
          </CardContent>
        </Card>
      </div>

      <Summary total={total}>
        <Button className="w-full mt-4" onClick={onNext}>
          {t("continue_to_payment")} <ChevronRight />
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onBack}>
          <ChevronLeft /> {t("back_to_cart")}
        </Button>
      </Summary>
    </div>
  );
};
