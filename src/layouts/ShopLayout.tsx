import { Outlet } from "react-router";
import { Header } from "@/layouts/partials/Header";
import { Footer } from "@/layouts/partials/Footer";

export const ShopLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-col flex-1 w-full lg:max-w-[80%] px-4 sm:px-6 lg:px-8 mx-auto">
        <Header />
        <main className="flex-1 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
