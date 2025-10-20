import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { Button } from "@/components/shared/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shared/card";
import { Separator } from "@/components/shared/separator";

const subtotal = 291.09;
const items = [
  { id: 1, name: "Siena Light", code: "O2", size: "Größe 40", price: 145.59 },
  { id: 2, name: "Siena Light", code: "O5", size: "Größe 40", price: 145.5 },
];

export const CheckoutComplete = () => {
  return (
    <div className="text-center bg-white p-4 rounded-2xl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex justify-center mb-6"
      >
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="text-green-600 w-6 h-6" />
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold mb-1">Thank you for your order!</h3>
      <p className="text-gray-600 mb-6">
        Your order number: <span className="font-medium">SL-9300</span>
      </p>

      <Card className="max-w-lg mx-auto mb-6 bg-muted/50">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-left space-y-4">
          <div>
            <h4 className="font-semibold mb-1">Shipping Address</h4>
            <p>
              Perpedes GmbH
              <br />
              Tannenbergstr. 139
              <br />
              73230 Kirchheim Teck
              <br />
              Deutschland
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Shipping Method</h4>
            <p>Standard Shipping (3-5 business days)</p>
          </div>

          <div>
            <h4 className="font-semibold mb-1">Payment Method</h4>
            <p>Invoice (Payment within 14 days)</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Ordered Items</h4>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <p>
                  {item.name}, {item.code}, {item.size}
                </p>
                <p>€{item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>€{subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <p>Shipping</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between font-medium">
            <p>Total</p>
            <p>€{subtotal.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>

      <p className="text-gray-500 mb-4">
        We've sent you a confirmation email with your order details.
      </p>

      <Button>Back to Shop</Button>
    </div>
  );
};
