import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { useOrderQuery } from "@/hooks/useOrders";
import { ChevronLeft, Check } from "lucide-react";
import { Spinner } from "@/components/shared/spinner";
import { motion } from "framer-motion";
import { Separator } from "@/components/shared/separator";
import { useAuth } from "@/context/AuthContext";

interface OrderDetailProps {
  orderNumber: string;
  onBack: () => void;
}

export const OrderDetail = ({ orderNumber, onBack }: OrderDetailProps) => {
  const { user } = useAuth();
  const orderQuery = useOrderQuery(orderNumber);

  if (orderQuery.isPending) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (orderQuery.isError || orderQuery.data === undefined) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center text-center">
        <p className="text-lg font-medium mb-4">
          Something went wrong while getting order.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  const order = orderQuery.data;

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-2xl">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={onBack}
      >
        <ChevronLeft /> Back to Order History
      </Button>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex justify-center mb-4"
      >
        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
          <Check className="text-green-600 w-6 h-6" />
        </div>
      </motion.div>

      <h3 className="text-xl font-semibold text-center mb-1">Order Details</h3>
      <p className="text-gray-600 text-center mb-6">
        Your order number:{" "}
        <span className="font-medium">{order.orderNumber}</span>
      </p>

      <Card className="bg-muted/50">
        <CardContent className="p-6 flex flex-col gap-6">
          <div>
            <h4 className="font-semibold mb-2">Shipping Address</h4>
            <div className="flex flex-col text-sm gap-1 text-gray-600">
              <p>{order.shippingAddress.companyName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{user?.contactPerson}</p>
              <p>{user?.email}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Shipping Method</h4>
            <p className="text-sm text-gray-600">
              {order.shippingMethod.name}: {order.shippingMethod.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Payment Method</h4>
            <p className="text-sm text-gray-600">
              {order.paymentMethod.type}: {order.paymentMethod.description}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Ordered Items</h4>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <Card key={item.variationId} className="bg-white">
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex flex-col sm:flex-row sm:gap-4 items-start sm:items-center">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-24 h-24 object-contain rounded"
                      />
                      <div className="flex flex-col gap-1 mt-2 sm:mt-0">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-gray-600 text-sm">
                          Width: {item.width} • Size: {item.size}
                        </p>
                        <p className="text-gray-600 text-sm">
                          Article: {item.articleNumber}
                        </p>
                      </div>
                    </div>
                    <p className="self-center font-bold text-sm sm:text-base">
                      €{item.unitPrice}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col w-full gap-2 justify-center items-center">
            <div className="flex justify-between w-full text-sm">
              <p>Subtotal</p>
              <p>€{order.totals.subtotal}</p>
            </div>
            <div className="flex justify-between w-full text-sm">
              <p>Shipping</p>
              <p>{order.totals.shippingCost}</p>
            </div>
            <div className="flex justify-between w-full text-2xl font-medium">
              <p>Total</p>
              <p>€{order.totals.total}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
