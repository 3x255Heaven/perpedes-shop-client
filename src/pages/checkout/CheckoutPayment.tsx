import { Summary } from "@/components/partials/Summary";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Banknote, BookA, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useTranslation } from "react-i18next";
import { usePaymentMethods } from "@/hooks/usePayment";

export const CheckoutPayment = ({
  onBack,
  onNext,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
}: {
  onNext: () => void;
  onBack: () => void;
  selectedPaymentMethod: string | null;
  setSelectedPaymentMethod: (code: string) => void;
}) => {
  const { t } = useTranslation();

  const { total } = useCart();

  const paymentMethodsQuery = usePaymentMethods();

  if (paymentMethodsQuery.isError || paymentMethodsQuery.data === undefined) {
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
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold mb-2">{t("payment_method")}</h3>

            {paymentMethodsQuery.data.map((paymentMethod) => {
              return (
                <div
                  onClick={() => {
                    setSelectedPaymentMethod(paymentMethod.code);
                  }}
                  className={`border rounded-lg p-3 flex items-center justify-between cursor-pointer ${
                    selectedPaymentMethod === paymentMethod.code
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    {paymentMethod.code === "INVOICE" ? (
                      <BookA className="text-gray-400" />
                    ) : (
                      <Banknote className="text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">{paymentMethod.type}</p>
                      <p className="text-sm text-gray-500">
                        {paymentMethod.description}
                      </p>
                    </div>
                  </div>
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
          disabled={selectedPaymentMethod === null}
        >
          Complete Order <ChevronRight />
        </Button>
        <Button variant="outline" className="w-full mt-2" onClick={onBack}>
          <ChevronLeft /> Back to Shipping
        </Button>
      </Summary>
    </div>
  );
};
