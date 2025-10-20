import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Truck, CreditCard, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { CheckoutCart } from "./CheckoutCart";
import { CheckoutShipping } from "./CheckoutShipping";
import { CheckoutPayment } from "./CheckoutPayment";
import { CheckoutComplete } from "./CheckoutComplete";

const checkoutSteps = [
  {
    checkoutStepOrderNo: 1,
    label: "Shopping cart",
    icon: <ShoppingCart size={16} />,
  },
  {
    checkoutStepOrderNo: 2,
    label: "Shipping",
    icon: <Truck size={16} />,
  },
  {
    checkoutStepOrderNo: 3,
    label: "Payment",
    icon: <CreditCard size={16} />,
  },
  {
    checkoutStepOrderNo: 4,
    label: "Complete",
    icon: <Check size={16} />,
  },
];

export const Checkout = () => {
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center items-center">
      <div className="w-full bg-muted/50 rounded p-8">
        <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

        <div className="flex justify-center items-center gap-4 mb-8">
          {checkoutSteps.map(({ checkoutStepOrderNo, label, icon }) => (
            <div key={checkoutStepOrderNo} className="flex items-center">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center border text-sm transition-colors duration-200",
                  checkoutStep > checkoutStepOrderNo
                    ? "bg-green-500 text-white border-green-500"
                    : checkoutStep === checkoutStepOrderNo
                    ? "bg-black text-white border-black"
                    : "border-gray-300 text-gray-500"
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
                  "ml-2 text-sm font-medium",
                  checkoutStep > checkoutStepOrderNo
                    ? "text-black"
                    : "text-gray-400"
                )}
              >
                {label}
              </p>
              {checkoutStepOrderNo < 4 && (
                <div className="w-10 h-px bg-gray-300 mx-3"></div>
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
                />
              </motion.div>
            )}

            {checkoutStep === 3 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <CheckoutPayment
                  onNext={() => setCheckoutStep(4)}
                  onBack={() => setCheckoutStep(2)}
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
                <CheckoutComplete />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
