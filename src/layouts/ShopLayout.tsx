import { Outlet } from "react-router";
import { Header } from "@/layouts/partials/Header";
import { Footer } from "@/layouts/partials/Footer";

export const ShopLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <div className="min-h-screen flex flex-col items-center w-[80%]">
        <div className="w-full flex flex-col flex-1">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};
