import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";

import { AuthProvider } from "@/context/AuthContext";

import { ShopLayout } from "@/layouts/ShopLayout";
import { NotFound } from "@/pages/notfound/NotFound";
import { Login } from "@/pages/login/Login";
import { Products } from "@/pages/products/Products";
import { Product } from "@/pages/products/Product";

import { Toaster } from "@/components/shared/sonner";

import "./i18n";
import "./index.css";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ShopLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Products /> },
      { path: "/:category", element: <Products /> },
      { path: "products/:id", element: <Product /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
