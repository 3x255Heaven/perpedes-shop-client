import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, CreditCard, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckoutCart } from "./CheckoutCart";
import { CheckoutShipping } from "./CheckoutShipping";
import { CheckoutPayment } from "./CheckoutPayment";
import { CheckoutComplete } from "./CheckoutComplete";
import { useTranslation } from "react-i18next";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/shared/button";
import { useNavigate } from "react-router";

export type PaymentMethod = "invoice" | "prepayment";
export type PaymentMethodItem = {
  id: PaymentMethod;
  name: string;
  value: string;
};

export const Checkout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);

  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    string | null
  >(null);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  const { products } = useCart();

  const checkoutSteps = [
    {
      checkoutStepOrderNo: 1,
      label: t("shopping_cart"),
      icon: <ShoppingCart size={16} />,
    },
    { checkoutStepOrderNo: 2, label: t("shipping"), icon: <Truck size={16} /> },
    {
      checkoutStepOrderNo: 3,
      label: t("payment"),
      icon: <CreditCard size={16} />,
    },
    { checkoutStepOrderNo: 4, label: t("complete"), icon: <Check size={16} /> },
  ];

  if (products.length === 0 && checkoutStep !== 4) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center text-center">
        <p className="text-lg font-medium mb-4">{t("empty_cart_title")}</p>
        <Button onClick={() => navigate("/")}>{t("continue_shopping")}</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl bg-muted/50 p-6 sm:p-8 rounded-2xl shadow-sm">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center md:text-left">
          {t("checkout")}
        </h2>

        <div
          className={cn(
            "flex flex-col md:flex-row lg:justify-center justify-start items-center gap-4 mb-8",
          )}
        >
          {checkoutSteps.map(({ checkoutStepOrderNo, label, icon }) => (
            <div
              key={checkoutStepOrderNo}
              className="flex items-center md:items-center md:flex-row flex-col md:gap-0 gap-1"
            >
              <div
                className={cn(
                  "w-8 h-8 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border text-sm transition-colors duration-200",
                  checkoutStep > checkoutStepOrderNo
                    ? "bg-green-500 text-white border-green-500"
                    : checkoutStep === checkoutStepOrderNo
                      ? "bg-black text-white border-black"
                      : "border-gray-300 text-gray-500",
                )}
              >
                {checkoutStepOrderNo < checkoutStep ? (
                  <Check size={14} />
                ) : (
                  icon
                )}
              </div>
              <p
                className={cn(
                  "text-xs sm:text-sm font-medium mt-1 md:mt-0 md:ml-2 text-center md:text-left",
                  checkoutStep > checkoutStepOrderNo
                    ? "text-black"
                    : "text-gray-400",
                )}
              >
                {label}
              </p>
              {checkoutStepOrderNo < 4 && (
                <div className="hidden md:block w-10 h-px bg-gray-300 mx-3"></div>
              )}
            </div>
          ))}
        </div>

        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {checkoutStep === 1 && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <CheckoutCart onNext={() => setCheckoutStep(2)} />
              </motion.div>
            )}

            {checkoutStep === 2 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <CheckoutShipping
                  onNext={() => setCheckoutStep(3)}
                  onBack={() => setCheckoutStep(1)}
                  selectedShippingMethod={selectedShippingMethod}
                  setSelectedShippingMethod={setSelectedShippingMethod}
                />
              </motion.div>
            )}

            {checkoutStep === 3 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <CheckoutPayment
                  onNext={() => setCheckoutStep(4)}
                  onBack={() => setCheckoutStep(2)}
                  selectedPaymentMethod={selectedPaymentMethod}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                />
              </motion.div>
            )}

            {checkoutStep === 4 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <CheckoutComplete
                  shippingMethod={selectedShippingMethod}
                  paymentMethod={selectedPaymentMethod}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
