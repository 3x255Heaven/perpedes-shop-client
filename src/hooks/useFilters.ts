import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

export type ProductFilterValue = {
  id: number;
  name: string;
};

type ProductVariationFilterValue = {
  code: string;
  displayValue: string;
};

export type Filters = {
  shoeTypes: ProductFilterValue[];
  colors: ProductFilterValue[];
  closureSystems: ProductFilterValue[];
  innerLinings: ProductFilterValue[];
  soleTypes: ProductFilterValue[];
  variationFunctions: ProductVariationFilterValue[];
};

export function useFilterVariationFunctions() {
  return useQuery<ProductVariationFilterValue>({
    queryKey: ["filters", "variation-functions"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/variation-functions");

      return response.data;
    },
  });
}

export function useFilterSoleTypes() {
  return useQuery<ProductFilterValue>({
    queryKey: ["filters", "sole-types"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/sole-types");

      return response.data;
    },
  });
}

export function useFilterShoeTypes() {
  return useQuery<ProductFilterValue>({
    queryKey: ["filters", "shoe-types"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/shoe-types");

      return response.data;
    },
  });
}

export function useFilterInnerLinings() {
  return useQuery<ProductFilterValue>({
    queryKey: ["filters", "inner-linings"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/inner-linings");

      return response.data;
    },
  });
}

export function useFilterColors() {
  return useQuery<ProductFilterValue>({
    queryKey: ["filters", "colors"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/colors");

      return response.data;
    },
  });
}

export function useFilterClosureSystems() {
  return useQuery<ProductFilterValue>({
    queryKey: ["filters", "closure-systems"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/closure-systems");

      return response.data;
    },
  });
}

export function useFilters() {
  return useQuery<Filters>({
    queryKey: ["filters", "all"],
    queryFn: async () => {
      const response = await axiosInstance.get("/filters/all");

      return response.data;
    },
  });
}
