import { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import Logo from "@/assets/images/Logo.png";
import { Badge } from "@/components/shared/badge";

export const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isAuthenticated, logoutUser } = useAuth();
  const { products } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  return (
    <header className="px-8 py-4 flex items-center justify-between relative">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={Logo} alt="Perpedes" />
      </div>

      <nav className="hidden md:flex space-x-6 text-[1rem] font-medium">
        <a href="/" className="hover:underline">
          {t("all_shoes")}
        </a>
        <a href="/18" className="hover:underline">
          {t("ballet_flats")}
        </a>
        <a href="/12" className="hover:underline">
          {t("sneakers")}
        </a>
        <a href="/15" className="hover:underline">
          {t("ankle_boots")}
        </a>
        <a href="/14" className="hover:underline">
          {t("sandals")}
        </a>
      </nav>

      <div className="hidden md:flex items-center space-x-5">
        <button
          className={cn(
            "border border-black px-1.5 py-1 rounded-full cursor-pointer",
            i18n.language === "en" && "text-white bg-black"
          )}
          onClick={() => changeLanguage(i18n.language === "en" ? "de" : "en")}
        >
          {i18n.language === "en" ? "EN" : "DE"}
        </button>

        <User
          className="w-5 h-5 cursor-pointer"
          onClick={() => {
            if (isAuthenticated) {
              navigate("/profile");
            } else {
              navigate("/login");
            }
          }}
        />

        {isAuthenticated && (
          <>
            <div className="relative">
              <ShoppingCart
                className="w-5 h-5 cursor-pointer"
                onClick={() => {
                  navigate("/checkout");
                }}
              />
              <Badge
                className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-[-10px] right-[-10px]"
                variant="destructive"
              >
                {products.length}
              </Badge>
            </div>
            <LogOut
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                logoutUser();
              }}
            />
          </>
        )}
      </div>

      <button
        className="md:hidden flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full rounded bg-white shadow-md md:hidden z-10">
          <nav className="flex flex-col text-[1rem] font-medium px-4 py-4 space-y-3">
            <a href="/" className="hover:underline">
              {t("all_shoes")}
            </a>
            <a href="/18" className="hover:underline">
              {t("ballet_flats")}
            </a>
            <a href="/12" className="hover:underline">
              {t("sneakers")}
            </a>
            <a href="/15" className="hover:underline">
              {t("ankle_boots")}
            </a>
            <a href="/14" className="hover:underline">
              {t("sandals")}
            </a>
          </nav>

          <div className="flex items-center space-x-5 px-4 pb-4">
            <button
              className={cn(
                "border border-black px-1.5 py-1 rounded-full cursor-pointer",
                i18n.language === "en" && "text-white bg-black"
              )}
              onClick={() =>
                changeLanguage(i18n.language === "en" ? "de" : "en")
              }
            >
              {i18n.language === "en" ? "EN" : "DE"}
            </button>
            {/* <Search className="w-5 h-5 cursor-pointer" /> */}

            <User
              className="w-5 h-5 cursor-pointer"
              onClick={() => {
                if (isAuthenticated) {
                  navigate("/profile");
                } else {
                  navigate("/login");
                }
              }}
            />

            {isAuthenticated && (
              <>
                <div className="relative">
                  <ShoppingCart
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      navigate("/checkout");
                    }}
                  />
                  <Badge
                    className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-[-10px] right-[-10px]"
                    variant="destructive"
                  >
                    {products.length}
                  </Badge>
                </div>
                <LogOut
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    logoutUser();
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
