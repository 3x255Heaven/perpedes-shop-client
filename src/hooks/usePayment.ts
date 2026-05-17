import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type PaymentMethod = {
  code: string;
  type: string;
  description: string;
};

export function usePaymentMethods() {
  return useQuery<PaymentMethod[]>({
    queryKey: ["payment-methods"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/public/orders/payment-methods",
      );
      return response.data;
    },
  });
}
