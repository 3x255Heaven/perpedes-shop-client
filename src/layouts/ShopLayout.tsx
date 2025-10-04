import { Outlet } from "react-router";

export const ShopLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Outlet />
    </div>
  );
};
