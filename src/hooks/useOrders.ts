import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export type ShippingAddress = {
  companyName: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
};

export type OrderItem = {
  variationId: number;
  productName: string;
  articleNumber: string;
  size: string;
  width: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  imageId: number;
};

export type PlaceOrderPayload = {
  customerId: string;
  shippingAddress: ShippingAddress;
  shippingMethodCode: string;
  paymentMethodCode: string;
  items: OrderItem[];
};

export interface PlaceOrderResponse {
  orderNumber: string;
  createdAt: string;
  shippingAddress: {
    companyName: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  shippingMethod: {
    name: string;
    description: string;
    cost: string;
  };
  paymentMethod: {
    type: string;
    description: string;
  };
  items: {
    variationId: number;
    productName: string;
    articleNumber: string;
    size: string;
    width: string;
    unit: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    imageUrl: string;
  }[];
  totals: {
    subtotal: string;
    shippingCost: string;
    total: string;
  };
}

export type OrderResponse = {
  orderNumber: string;
  createdAt: string;
  shippingAddress: {
    companyName: string;
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  shippingMethod: {
    name: string;
    description: string;
    cost: string;
  };
  paymentMethod: {
    type: string;
    description: string;
  };
  items: {
    variationId: number;
    productName: string;
    articleNumber: string;
    size: string;
    width: string;
    unit: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    imageUrl: string;
  }[];
  totals: {
    subtotal: string;
    shippingCost: string;
    total: string;
  };
};

export function useOrdersQuery() {
  return useQuery<OrderResponse[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axiosInstance.get("/orders");
      return response.data;
    },
  });
}

export function useCustomerOrdersQuery(customerId: string | undefined) {
  return useQuery<OrderResponse[]>({
    queryKey: ["orders", customerId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/orders/customer/${customerId}`
      );
      return response.data;
    },
    enabled: !!customerId,
  });
}

export function useOrderQuery(orderId: string | undefined) {
  return useQuery<OrderResponse>({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/orders/${orderId}`);
      return response.data;
    },
    enabled: !!orderId,
  });
}

export const usePlaceOrderMutation = () => {
  return useMutation<PlaceOrderResponse, Error, PlaceOrderPayload>({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post<PlaceOrderResponse>(
        "/orders",
        payload
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("Order placed successfully:", data.orderNumber);
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
    },
  });
};
