import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { LockKeyhole, AlertTriangle, CheckCircle } from "lucide-react";

import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";

import { useResetPasswordMutation } from "@/hooks/useUser";

export const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();
  const resetPasswordMutation = useResetPasswordMutation();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const isLoading = resetPasswordMutation.isPending;

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const canSubmit = !!token && passwordsMatch && password.length >= 6;

  const handleSubmit = () => {
    if (!token || !canSubmit) return;

    resetPasswordMutation.mutate(
      {
        token,
        newPassword: password,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      },
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
        <Card className="w-full max-w-md shadow-sm border-0 rounded-2xl">
          <CardContent className="p-8 text-center flex flex-col gap-4">
            <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto" />

            <h1 className="text-2xl font-bold">{t("invalid_link")}</h1>

            <p className="text-sm text-gray-500">
              {t("reset_link_missing_or_expired")}
            </p>

            <Button
              className="w-full"
              onClick={() => navigate("/forgot-password")}
            >
              {t("request_new_reset_link")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
        <Card className="w-full max-w-md shadow-sm border-0 rounded-2xl">
          <CardContent className="p-8 text-center flex flex-col gap-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />

            <h1 className="text-2xl font-bold">{t("password_updated")}</h1>

            <p className="text-sm text-gray-500">
              {t("you_can_now_login_with_new_password")}
            </p>

            <Button className="w-full" onClick={() => navigate("/login")}>
              {t("go_to_login")}
            </Button>
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
              <h1 className="text-3xl font-bold">{t("reset_password")}</h1>

              <p className="text-sm text-gray-500 leading-relaxed">
                {t("enter_your_new_password")}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">{t("new_password")}</label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("enter_new_password")}
                  className="pl-10 h-12"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                {t("confirm_password")}
              </label>

              <div className="relative">
                <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("confirm_new_password")}
                  className="pl-10 h-12"
                />
              </div>

              {confirmPassword.length > 0 && !passwordsMatch && (
                <p className="text-xs text-red-500">
                  {t("passwords_do_not_match")}
                </p>
              )}
            </div>

            <Button
              className="w-full h-12 text-base font-medium"
              onClick={handleSubmit}
              disabled={!canSubmit || isLoading}
            >
              {isLoading ? t("resetting") : t("reset_password")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
