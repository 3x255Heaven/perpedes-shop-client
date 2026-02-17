import * as React from "react";
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
import { useAuth } from "@/context/AuthContext";
import { useTranslation } from "react-i18next";
import { useUserQuery } from "@/hooks/useUser";

export function CartDrawer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { products, total, removeItem } = useCart();
  const { isAuthenticated } = useAuth();
  const { data } = useUserQuery();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="mr-2 h-5 w-5" />
          {t("cart")}
          {products.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {products.length}
            </span>
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="fixed bottom-0 left-0 right-0 z-50 mt-0 rounded-t-2xl border-t bg-background sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[400px] sm:rounded-none sm:border-l sm:animate-in sm:slide-in-from-right">
        <DrawerHeader className="flex flex-row items-center justify-between border-b">
          <DrawerTitle className="text-lg font-semibold">
            {t("cart")}
          </DrawerTitle>
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
                  className="absolute top-1 right-1"
                  onClick={() => removeItem(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <CardContent className="flex gap-3 items-center py-3">
                  <img
                    src={product.images[0]?.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-contain sm:w-32 sm:h-32"
                  />
                  <div className="flex-1 text-center">
                    <h4 className="font-medium line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {t("quantity")}: {product.quantity}
                    </p>
                    {isAuthenticated && (
                      <p className="font-semibold">
                        {product.price?.formattedPrice}
                      </p>
                    )}
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
                <EmptyTitle>{t("empty_cart_title")}</EmptyTitle>
                <EmptyDescription>{t("empty_cart_subtitle")}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </ScrollArea>

        <Separator />

        <DrawerFooter className="border-t mt-auto">
          {products.length > 0 && isAuthenticated && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Total</p>
                <p className="text-xl font-bold">
                  <span>{data?.client?.country === "CH" ? "₣" : "€"}</span>
                  {total}
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  navigate("/checkout");
                  setOpen(false);
                }}
              >
                {t("proceed_to_checkout")}
              </Button>
            </>
          )}
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              {t("continue_shopping")}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
