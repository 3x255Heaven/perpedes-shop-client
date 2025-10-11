import { axiosInstance } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type Image = {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: string;
};

type Unit = {
  code: string;
  displayName: string;
  description: string;
  sortOrder: number;
};

type ProductVariation = {
  id: number;
  articleNumber: string;
  size: string;
  width: string;
  unit: string;
  available: boolean;
  totalStock: number;
  variationFunction: string;
  price: number | null;
};

type VariationsByWidth = Record<string, ProductVariation[]>;

export type Product = {
  productId: number;
  name: string;
  description: string;
  modelId: string;
  widthSystem: string;
  hmv: string;
  colors: string[];
  images: Image[];
  shoeTypes: string[];
  closureSystems: string[];
  upperMaterials: string[];
  innerLinings: string[];
  soleTypes: string[];
  soleColors: string[];
};

export type ProductPreview = Pick<Product, "name" | "productId" | "images">;

type ProductUnitsResponse = {
  productId: number;
  availableUnits: Unit[];
};

type ProductsResponse = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  products: ProductPreview[];
};

type ProductSizesResponse = {
  productId: number;
  unitType: string;
  variations: ProductVariation[];
  availableWidths: string[];
  variationsByWidth: VariationsByWidth;
};

type ProductSimilarResponse = {
  products: ProductPreview[];
  smf: string;
  totalCount: number;
};

const getNextPageParam = (lastPage: {
  currentPage: number;
  totalPages: number;
}) => {
  return lastPage.currentPage + 1 < lastPage.totalPages
    ? lastPage.currentPage + 1
    : undefined;
};

export function useProductShoeSelectionQuery(productId: string | undefined) {
  return useQuery<ProductUnitsResponse>({
    queryKey: ["catalog", "products", productId, "selection-options"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/catalog/products/${productId}/selection-options`
      );
      return response.data;
    },
    enabled: !!productId,
  });
}

export function useProductSizesQuery(
  productId: string | undefined,
  unit: string | undefined
) {
  return useQuery<ProductSizesResponse>({
    queryKey: ["catalog", "products", productId, "sizes", unit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/catalog/products/${productId}/sizes`,
        {
          params: unit ? { unit } : undefined,
        }
      );
      return response.data;
    },
    enabled: !!productId && !!unit,
  });
}

export function useProductQuery(productId: string | undefined) {
  return useQuery<Product>({
    queryKey: ["catalog", "products", productId],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/catalog/products/${productId}`
      );
      return response.data;
    },
    enabled: !!productId,
  });
}

export function useSimilarProductsQuery(
  productId: string | undefined,
  limit: number = 3
) {
  return useQuery<ProductSimilarResponse>({
    queryKey: ["catalog", "products", productId, "similar", limit],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/catalog/products/${productId}/similar`,
        { params: { limit } }
      );
      return response.data;
    },
    enabled: !!productId,
  });
}

export const useProductsInfiniteQuery = (
  size: number,
  sort: string,
  order: string
) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["catalog", size, sort, order],
    queryFn: async ({ pageParam }) => {
      const response = await axiosInstance.get("/catalog", {
        params: {
          page: pageParam,
          size,
          sort: `${sort},${order}`,
        },
      });

      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam,
  });
};
