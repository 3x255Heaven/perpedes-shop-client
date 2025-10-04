import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router";

import { AuthProvider } from "@/context/AuthContext";

import { ShopLayout } from "@/layouts/ShopLayout";
import { Login } from "@/pages/login/Login";
import { Products } from "@/pages/products/Products";

import { Toaster } from "@/components/shared/sonner";

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
    errorElement: <>NOT FOUND</>, //TODO
    children: [
      { index: true, element: <Products /> },
      { path: "products", element: <Products /> },
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
