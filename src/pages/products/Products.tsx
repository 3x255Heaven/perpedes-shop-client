import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ListFilterPlus, ListFilter } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProductsInfiniteQuery } from "@/hooks/useProducts";

import { Button } from "@/components/shared/button";

import { Filter } from "@/components/partials/Filter";
import { ProductCard } from "@/components/partials/ProductCard";
import { Spinner } from "@/components/shared/spinner";

export const Products = () => {
  const [showFilters, setShowFilters] = useState(true);

  const { data, isLoading } = useProductsInfiniteQuery(20, "name", "asc");
  const products = data ? data.pages.flatMap((page) => page.products) : [];

  return (
    <>
      {isLoading ? (
        <div className="h-[80vh] p-16 flex flex-col justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="mt-12 mb-6 px-8 py-4 flex justify-between items-center">
            <h1 className="text-4xl font-semibold">All Shoes</h1>
            <Button
              variant="secondary"
              className={cn(
                "rounded-sm px-3 py-1",
                showFilters && "bg-black text-white hover:bg-black"
              )}
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <ListFilterPlus /> : <ListFilter />}
            </Button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            <AnimatePresence initial={false}>
              {showFilters && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: 256,
                    opacity: 1,
                    transition: { duration: 0.7 },
                  }}
                  exit={{
                    width: 0,
                    opacity: 0,
                    transition: { duration: 0.7 },
                  }}
                  transition={{ duration: 0.7 }}
                  className="py-6 overflow-y-auto"
                >
                  <h2 className="font-semibold mb-4 border-b pb-4 mr-6">
                    Filter
                  </h2>
                  <Filter />
                </motion.aside>
              )}
            </AnimatePresence>

            <motion.main
              layout
              className="flex-1 p-8 overflow-y-auto"
              transition={{ duration: 0.4 }}
            >
              <motion.div
                layout
                className={cn(
                  "grid gap-10",
                  showFilters ? "grid-cols-2" : "grid-cols-3"
                )}
                transition={{ duration: 0.4 }}
              >
                {products.map((product) => (
                  <ProductCard key={product.name} product={product} />
                ))}
              </motion.div>

              <div className="flex justify-center mt-12">
                <Button className="px-8 py-6 text-lg rounded">
                  More Products
                </Button>
              </div>
            </motion.main>
          </div>
        </>
      )}
    </>
  );
};
