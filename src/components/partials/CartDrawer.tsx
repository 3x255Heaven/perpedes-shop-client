import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shared/drawer";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { ScrollArea } from "@/components/shared/scroll-area";
import { Separator } from "@/components/shared/separator";
import { X, ShoppingCart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../shared/empty";
import { useNavigate } from "react-router";

export function CartDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const { products, total, removeItem } = useCart();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Cart
          {products.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {products.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="!mt-0 !rounded-none max-w-md ml-auto mr-0 rounded-t-2xl sm:h-screen sm:w-[400px] sm:fixed sm:right-0 sm:top-0 sm:bottom-0">
        <DrawerHeader className="flex flex-row items-center justify-between border-b">
          <DrawerTitle className="text-lg font-semibold">Cart</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="flex-1 p-4 max-h-[65vh] sm:max-h-[80vh]">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                className="mb-3 bg-muted/70 shadow-none border-none relative"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0"
                  onClick={() => {
                    removeItem(product.id);
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
                <CardContent className="flex justify-between items-center py-3">
                  <img
                    src={product.images[0]?.imageUrl}
                    alt={product.name}
                    className="w-44 h-44 object-contain"
                  />
                  <div>
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {product.quantity}
                    </p>
                    <p className="font-semibold">
                      {product.price?.formattedPrice}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShoppingBag />
                </EmptyMedia>
                <EmptyTitle>Your cart is empty</EmptyTitle>
                <EmptyDescription>
                  We are sure you can find something for yourself!
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </ScrollArea>

        <Separator />

        <DrawerFooter className="border-t mt-auto">
          {products.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Total</p>
                <p className="text-xl font-bold">€{total}</p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/checkout");
                  setOpen(false);
                }}
              >
                Proceed to Checkout
              </Button>
            </>
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
