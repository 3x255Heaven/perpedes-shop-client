import { useState } from "react";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { ChevronLeft, Mail, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useForgotPasswordMutation } from "@/hooks/useUser";

export const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const forgotPasswordMutation = useForgotPasswordMutation();

  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;

    forgotPasswordMutation.mutate(
      { email },
      {
        onSuccess: () => {
          setIsSent(true);
        },
      },
    );
  };

  const isLoading = forgotPasswordMutation.isPending;

  if (isSent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
        <Card className="w-full max-w-md shadow-sm border-0 rounded-2xl">
          <CardContent className="p-8">
            <div className="flex flex-col items-center text-center gap-6">
              <CheckCircle className="h-12 w-12 text-green-500" />

              <h1 className="text-2xl font-bold">{t("email_sent")}</h1>

              <p className="text-sm text-gray-500 leading-relaxed">
                {t("we_have_sent_a_password_reset_link_to_your_email")}
                <span className="font-medium text-black block mt-1">
                  {email}
                </span>
              </p>

              <Button className="w-full" onClick={() => navigate("/login")}>
                {t("back_to_login")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
      <Card className="w-full max-w-md shadow-sm border-0 rounded-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold">{t("forgot_password")}</h1>

              <p className="text-sm text-gray-500 leading-relaxed">
                {t("enter_your_email_and_we_will_send_you_a_reset_link")}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">{t("email")}</label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("enter_email")}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <Button
              className="w-full text-base font-medium"
              onClick={handleSubmit}
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? t("sending") : t("send_reset_link")}
            </Button>

            <Button
              onClick={() => navigate("/login")}
              className="flex items-center justify-center gap-2 text-sm hover:bg-transparent transition-colors bg-transparent text-black cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              {t("back_to_login")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
