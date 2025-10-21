import { axiosInstance } from "@/lib/axios";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

type Image = {
  id: number;
  imageUrl: string;
  displayOrder: number;
  isPrimary: boolean;
  createdAt: string;
};

type Price = {
  amount: string;
  currency: string;
  formattedPrice: string;
};

type Unit = {
  code: string;
  displayName: string;
  description: string;
  sortOrder: number;
};

export type ProductVariation = {
  id: number;
  articleNumber: string;
  size: string;
  width: string;
  unit: string;
  available: boolean;
  totalStock: number;
  variationFunction: string;
  price: Price | null;
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

export type CartProductItem = Product & ProductVariation;
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
  unit: string | undefined,
  includePrice: boolean
) {
  return useQuery<ProductSizesResponse>({
    queryKey: ["catalog", "products", productId, "sizes", unit, includePrice],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/catalog/products/${productId}/sizes`,
        {
          params: {
            ...(unit ? { unit } : {}),
            ...(includePrice ? { includePrice } : {}),
          },
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
  limit: number = 5
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
  order: string,
  filters: Record<string, string[]> = {}
) => {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: ["catalog", size, sort, order, filters],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axiosInstance.get("/catalog", {
        params: {
          page: pageParam,
          size,
          sort: `${sort},${order}`,
          ...filters,
        },
      });

      return response.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.currentPage < lastPage.totalPages - 1
        ? lastPage.currentPage + 1
        : undefined,
    initialPageParam: 0,
  });
};
