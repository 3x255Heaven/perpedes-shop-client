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
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import type { PaymentMethodItem, ShippingMethodItem } from "./Checkout";

export const CheckoutComplete = ({
  shippingMethod,
  paymentMethod,
}: {
  shippingMethod: ShippingMethodItem;
  paymentMethod: PaymentMethodItem;
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { total, products } = useCart();

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
          <div className="flex flex-col justify-center gap-1">
            <h4 className="font-semibold mb-1">Shipping Address</h4>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>{user?.name}</p>
              <p>{user?.street}</p>
              <p>
                {user?.zip} {user?.city}
              </p>
              <p>{user?.id}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h4 className="font-semibold mb-1">Shipping Method</h4>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>
                {shippingMethod.name}: {shippingMethod.value}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h4 className="font-semibold mb-1">Payment Method</h4>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>
                {paymentMethod.name}: {paymentMethod.value}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Ordered Items</h4>
            {products.map((product) => (
              <div className="flex items-center w-full gap-2">
                <img
                  src={product.images[0]?.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 object-contain"
                />

                <div
                  key={product.id}
                  className="flex w-full justify-between text-sm"
                >
                  <div className="flex flex-col gap-1">
                    <p>{product.name}</p>
                    <p className="text-gray-600">
                      Width: {product.width} Size: {product.size}
                    </p>
                  </div>
                  <p className="self-center font-bold">
                    {product.price?.formattedPrice}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col w-full gap-2 justify-center items-center">
            <div className="flex justify-between w-full text-sm">
              <p>Subtotal</p>
              <p>€{total}</p>
            </div>

            <div className="flex justify-between w-full text-sm">
              <p>Shipping</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between w-full text-2xl font-medium">
              <p>Total</p>
              <p>€{total}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-gray-500 mb-4">
        We've sent you a confirmation email with your order details.
      </p>

      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Shop
      </Button>
    </div>
  );
};
