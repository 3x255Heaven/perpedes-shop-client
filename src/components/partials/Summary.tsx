import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../shared/card";
import { useUserQuery } from "@/hooks/useUser";

export const Summary = ({
  total,
  children,
}: {
  total: number;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const { data } = useUserQuery();

  return (
    <Card className="w-full md:w-80 self-start">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{t("summary")}</h3>
        <div className="flex justify-between text-sm mb-2">
          <span>{t("subtotal")}</span>
          <span>
            <span>{data?.client?.country === "CH" ? "₣" : "€"}</span>
            {total.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>{t("total_amount")}</span>
          <span>
            <span>{data?.client?.country === "CH" ? "₣" : "€"}</span>
            {total.toFixed(2)}
          </span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
};
