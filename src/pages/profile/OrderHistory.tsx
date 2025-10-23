import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { useOrdersQuery } from "@/hooks/useOrders";
import { Spinner } from "@/components/shared/spinner";
import { Button } from "@/components/shared/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shared/empty";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

interface OrderHistoryProps {
  onSelectOrder: (orderNumber: string) => void;
}

export const OrderHistory = ({ onSelectOrder }: OrderHistoryProps) => {
  const { t } = useTranslation();

  const ordersQuery = useOrdersQuery();

  if (ordersQuery.isPending) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (ordersQuery.isError || ordersQuery.data === undefined) {
    return (
      <div className="h-[40vh] p-16 flex flex-col justify-center items-center text-center">
        <p className="text-lg font-medium mb-4">{t("something_went_wrong")}</p>
        <Button onClick={() => window.location.reload()}>
          {t("try_again")}
        </Button>
      </div>
    );
  }

  if (ordersQuery.data.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ShoppingBag />
          </EmptyMedia>
          <EmptyTitle>{t("empty_order")}</EmptyTitle>
          <EmptyDescription>{t("empty_cart_subtitle")}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-[40vh] overflow-y-scroll p-6">
      {ordersQuery.data.map((order) => (
        <Card
          key={order.orderNumber}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onSelectOrder(order.orderNumber)}
        >
          <CardContent className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-lg">{order.orderNumber}</h3>
              <p className="text-sm text-gray-500">
                {order.items.length} {t("items")} • {order.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Badge>{t("placed")}</Badge>
              <p className="font-semibold text-xl">{order.totals.total}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
