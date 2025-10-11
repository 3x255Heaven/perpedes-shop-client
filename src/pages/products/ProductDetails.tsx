import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { motion, AnimatePresence } from "framer-motion";
import {
  useProductQuery,
  useProductShoeSelectionQuery,
  useProductSizesQuery,
} from "@/hooks/useProducts";
import { useParams } from "react-router";
import { Loader2, RefreshCcw } from "lucide-react";

export const ProductDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>(
    undefined
  );
  const [selectedWidth, setSelectedWidth] = useState<string | undefined>(
    undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    refetch: productRefetch,
  } = useProductQuery(id);

  const {
    data: productSelectionTypes,
    isLoading: isProductSelectionTypesLoading,
    isError: isProductSelectionTypesError,
    refetch: productSelectionTypesRefetch,
  } = useProductShoeSelectionQuery(id);

  const { data: productSizes } = useProductSizesQuery(id, selectedUnit);

  useEffect(() => {
    if (productSizes) {
      setSelectedWidth(productSizes.availableWidths[0]);
    }
  }, [productSizes]);

  const features = useMemo(() => {
    if (!product) return [];

    return [
      ...product.colors,
      ...product.shoeTypes,
      ...product.closureSystems,
      ...product.upperMaterials,
      ...product.innerLinings,
      ...product.soleTypes,
      ...product.soleColors,
    ];
  }, [product]);

  if (isProductLoading || isProductSelectionTypesLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="animate-spin w-8 h-8 mb-2" />
        </motion.div>
      </div>
    );
  }

  if (isProductError || isProductSelectionTypesError) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-lg font-semibold mb-2">
            Failed to load product details.
          </p>
          <p className="text-sm mb-4 text-gray-500">
            {(productError as Error)?.message || "Something went wrong."}
          </p>
          <Button
            onClick={() => {
              productRefetch();
              productSelectionTypesRefetch();
            }}
            variant="outline"
            className="gap-2"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!product || !productSelectionTypes) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Product not found.
        </motion.p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col lg:flex-row gap-2 p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-2 flex-1">
        <Card className="w-full h-[600px] rounded-none border-none shadow-none bg-muted/50">
          <CardContent className="p-0 flex justify-center items-center h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={product.images?.[selectedImage]?.imageUrl}
                alt={product.name}
                className="max-w-full max-h-[500px] object-contain"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2 w-full">
          {product.images?.map((image, index) => (
            <motion.img
              key={index}
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "w-full h-48 object-contain cursor-pointer bg-muted/50 transition-all",
                index === selectedImage && "border border-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="flex-1 flex flex-col justify-start gap-4 bg-muted/50 pt-20 pb-6 px-8"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-gray-500 mb-4">
            Model ID: {product.modelId}
          </p>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <p className="text-xs text-gray-400 mt-4">HMV: {product.hmv}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="flex flex-wrap gap-2 mt-6 text-xs text-gray-500">
            {features.map((feature) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full capitalize">
                  {feature}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedUnit ? (
            <motion.div
              key="unit-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-center items-center gap-6 text-center mt-6"
            >
              <Badge className="font-bold">
                Choose the product selection type to continue
              </Badge>

              <div className="flex flex-wrap justify-center gap-4">
                {productSelectionTypes.availableUnits.map((unit) => (
                  <motion.div
                    key={unit.code}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setSelectedUnit(unit.code)}
                      variant="outline"
                      className="px-6 py-3 text-lg"
                    >
                      {unit.code}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="selection-details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-4">
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => {
                      setSelectedUnit(undefined);
                      setSelectedSize(undefined);
                      setSelectedWidth(undefined);
                    }}
                    className="text-sm text-gray-700 underline cursor-pointer"
                  >
                    ← Back to selection
                  </button>
                  <p className="font-semibold">
                    <span className="font-light">Mode:</span> {selectedUnit}
                  </p>
                </div>

                <div className="flex justify-between items-center text-center mt-10">
                  <p className="font-semibold text-2xl">Width</p>
                  <div className="flex gap-2">
                    {productSizes?.availableWidths.map((width) => (
                      <motion.div
                        key={width}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className={cn(
                            width === selectedWidth &&
                              "bg-black text-white hover:bg-black hover:text-white"
                          )}
                          variant="outline"
                          onClick={() => {
                            setSelectedWidth(width);
                            setSelectedSize(undefined);
                          }}
                        >
                          {width}
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-semibold mb-2 text-2xl">All sizes</p>
                <div className="flex flex-wrap gap-2">
                  {productSizes?.variationsByWidth[selectedWidth ?? ""]?.map(
                    (variation) => (
                      <motion.div
                        key={variation.id}
                        whileHover={{ scale: variation.available ? 1.05 : 1 }}
                        whileTap={{ scale: variation.available ? 0.95 : 1 }}
                      >
                        <Button
                          variant="outline"
                          disabled={!variation.available}
                          onClick={() =>
                            setSelectedSize(
                              selectedSize !== variation.size
                                ? variation.size
                                : undefined
                            )
                          }
                          className={cn(
                            !variation.available &&
                              "opacity-50 cursor-not-allowed",
                            variation.size === selectedSize &&
                              "bg-black text-white hover:bg-black hover:text-white"
                          )}
                        >
                          {variation.size}
                        </Button>
                      </motion.div>
                    )
                  )}
                </div>

                <div className="flex justify-center items-center gap-2 text-sm mt-6">
                  <span className="w-3 h-3 rounded-full bg-black inline-block"></span>
                  <span>Available</span>
                  <span className="w-3 h-3 rounded-full border border-gray-400 inline-block ml-4"></span>
                  <span>Unavailable</span>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex flex-col w-full">
            {selectedSize && <Button>Add to Cart</Button>}
          </div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
