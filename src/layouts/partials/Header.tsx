import { useTranslation } from "react-i18next";
import { Search, ShoppingCart, User } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "@/assets/images/Logo.png";

export const Header = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <header className="px-8 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={Logo} alt="Perpedes" />
      </div>

      <nav className="flex space-x-6 text-[1rem] font-medium">
        <a href="/" className={"hover:underline"}>
          {t("all_shoes")}
        </a>

        <a href="/" className={"hover:underline"}>
          {t("ballet_flats")}
        </a>

        <a href="/" className={"hover:underline"}>
          {t("sneakers")}
        </a>

        <a href="/" className={"hover:underline"}>
          {t("ankle_boots")}
        </a>

        <a href="/" className={"hover:underline"}>
          {t("sandals")}
        </a>
      </nav>

      <div className="flex items-center space-x-5">
        <button
          className={cn(
            "border border-black px-1.5 py-1 rounded-full cursor-pointer",
            i18n.language === "en" && "text-white bg-black"
          )}
          onClick={() => {
            changeLanguage(i18n.language === "en" ? "de" : "en");
          }}
        >
          {i18n.language === "en" ? "EN" : "DE"}
        </button>
        <Search className="w-5 h-5 cursor-pointer" />
        <User className="w-5 h-5 cursor-pointer" />
        <ShoppingCart className="w-5 h-5 cursor-pointer" />
      </div>
    </header>
  );
};
