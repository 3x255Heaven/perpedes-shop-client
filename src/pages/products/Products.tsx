import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ListFilterPlus, ListFilter } from "lucide-react";
import { useParams, useSearchParams } from "react-router";

import { cn } from "@/lib/utils";
import { useProductsInfiniteQuery } from "@/hooks/useProducts";
import { useFilters } from "@/hooks/useFilters";

import { Button } from "@/components/shared/button";
import { Filter } from "@/components/partials/Filter";
import { ProductCard } from "@/components/partials/ProductCard";
import { Spinner } from "@/components/shared/spinner";

export const Products = () => {
  const { category } = useParams<{ category: string }>();
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterParams = useMemo(() => {
    const params: Record<string, string[]> = {};

    if (category) {
      params["shoeTypes"] = [category];
    }

    for (const [key, value] of searchParams.entries()) {
      console.log(key);
      console.log(value);
      if (!params[key]) params[key] = [];
      params[key].push(value);
    }

    return params;
  }, [searchParams, category]);

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useProductsInfiniteQuery(20, "name", "asc", filterParams);

  const {
    data: filtersData,
    isLoading: isFiltersLoading,
    isError: isFiltersError,
  } = useFilters();

  const pageTitle = category
    ? filtersData
      ? filtersData.shoeTypes.find((type) => type.id === Number(category))?.name
      : "All Shoes"
    : "All Shoes";

  const isLoading = isProductsLoading || isFiltersLoading;
  const isError = isProductsError || isFiltersError;

  const isFilteringApplied = Array.from(searchParams).length > 0;
  const products = productsData
    ? productsData.pages.flatMap((page) => page.products)
    : [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !productsData || !filtersData) {
    return (
      <div className="h-[80vh] p-16 flex flex-col justify-center items-center text-center">
        <p className="text-lg font-medium mb-4">
          Something went wrong while loading products or filters.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <>
      <div className="mt-12 mb-6 px-8 py-4 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">{pageTitle}</h1>
        <div
          className="flex justify-center items-center p-2 bg-secondary rounded cursor-pointer font-bold"
          onClick={() => setShowFilters(!showFilters)}
        >
          <p className="pr-2">Filters</p>
          <Button
            variant="secondary"
            className={cn(
              "rounded-sm px-3 py-1 cursor-pointer",
              showFilters && "bg-black text-white hover:bg-black"
            )}
          >
            {showFilters ? <ListFilterPlus /> : <ListFilter />}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        <motion.aside
          animate={{
            width: showFilters ? 256 : 0,
            opacity: showFilters ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="py-6 overflow-hidden"
        >
          {showFilters && (
            <div className="opacity-100">
              <div className="flex justify-between items-center mb-4 border-b pb-4 mr-6">
                <h2 className="font-semibold">Filter</h2>
                {isFilteringApplied && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setSearchParams({})}
                    className="text-sm"
                  >
                    Clear All
                  </Button>
                )}
              </div>
              <Filter
                filtersData={filtersData}
                isShoeTypeFilterAvailable={category === undefined}
              />
            </div>
          )}
        </motion.aside>

        {products.length === 0 ? (
          <div className="h-[80vh] w-full p-16 flex flex-col justify-center items-center text-center">
            <p className="text-lg font-medium ">No products found.</p>
          </div>
        ) : (
          <main className="flex-1 p-8 transition-all duration-500 ease-in-out">
            <div
              className={cn(
                "grid gap-2",
                showFilters ? "grid-cols-4" : "grid-cols-5"
              )}
            >
              {products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>

            {hasNextPage && (
              <div className="flex justify-center mt-12 mb-8">
                <Button
                  className="px-8 py-6 text-lg rounded"
                  onClick={loadMore}
                  disabled={isFetchingNextPage}
                >
                  {isFetchingNextPage ? "Loading..." : "More Products"}
                </Button>
              </div>
            )}
          </main>
        )}
      </div>
    </>
  );
};
