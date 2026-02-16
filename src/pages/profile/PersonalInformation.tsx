import { Card, CardContent } from "@/components/shared/card";
import { useUserQuery } from "@/hooks/useUser";
import { useTranslation } from "react-i18next";

export const PersonalInformation = () => {
  const { t } = useTranslation();

  const { data } = useUserQuery();

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <Card>
          <CardContent className="p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                {t("personal_information")}
              </h3>
              <p className="text-sm text-gray-500">
                {t("personal_information_description")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
              <div>
                <p className="text-gray-500">{t("customer_number")}</p>
                <p className="font-medium">{data?.id}</p>
              </div>
              <div>
                <p className="text-gray-500">Name</p>
                <p className="font-medium">
                  {data?.firstName} {data?.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-500">{t("contact_person")}</p>
                <p className="font-medium">{data?.contactPerson ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">{t("street")}</p>
                <p className="font-medium">{data?.street ?? "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-500">{t("city")}</p>
                <p className="font-medium">
                  {data?.zip} {data?.city ?? "N/A"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{data?.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
