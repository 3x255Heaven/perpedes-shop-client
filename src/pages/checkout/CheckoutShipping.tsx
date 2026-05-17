import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { ChevronLeft, ChevronRight, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { useUserQuery } from "@/hooks/useUser";
import { useShippingMethods } from "@/hooks/useShipping";

export const CheckoutShipping = ({
  onBack,
  onNext,
  selectedShippingMethod,
  setSelectedShippingMethod,
}: {
  onNext: () => void;
  onBack: () => void;
  selectedShippingMethod: string | null;
  setSelectedShippingMethod: (code: string) => void;
}) => {
  const { t } = useTranslation();
  const { data } = useUserQuery();
  const { total } = useCart();

  const shippingMethodsQuery = useShippingMethods();

  if (shippingMethodsQuery.isError || shippingMethodsQuery.data === undefined) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center text-center">
        <p className="text-lg font-medium mb-4">{t("something_went_wrong")}</p>
        <Button onClick={() => window.location.reload()}>
          {t("try_again")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{t("shipping_address")}</h3>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>{data?.client?.displayName ?? "N/A"}</p>
              <p>{data?.client?.street1 ?? "N/A"}</p>
              <p>
                {data?.client?.country}-{data?.client?.zipCode}{" "}
                {data?.client?.place ?? "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">{t("shipping_method")}</h3>

            {shippingMethodsQuery.data.map((shippingMethod) => {
              return (
                <div
                  onClick={() => {
                    setSelectedShippingMethod(shippingMethod.code);
                  }}
                  className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                    selectedShippingMethod === shippingMethod.code
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Truck className="text-gray-400" />
                    <div>
                      <p className="font-medium">{shippingMethod.name}</p>
                      <p className="text-sm text-gray-500">
                        {shippingMethod.description}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium">{shippingMethod.cost}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Summary total={total}>
        <Button
          className="w-full mt-4"
          onClick={onNext}
          disabled={selectedShippingMethod === null}
        >
          {t("continue_to_payment")} <ChevronRight />
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onBack}>
          <ChevronLeft /> {t("back_to_cart")}
        </Button>
      </Summary>
    </div>
  );
};
