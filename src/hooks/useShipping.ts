import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type ShippingMethod = {
  code: string;
  name: string;
  description: string;
  cost: string;
  costAmount: number;
};

export function useShippingMethods() {
  return useQuery<ShippingMethod[]>({
    queryKey: ["shipping-methods"],
    queryFn: async () => {
      const response = await axiosInstance.get("/user/shipping-methods");
      return response.data;
    },
  });
}
