import { useMemo, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Loader2, RefreshCcw } from "lucide-react";
import { ProductCard } from "@/components/partials/ProductCard";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { ButtonGroup } from "@/components/shared/button-group";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/shared/empty";

import {
  useProductQuery,
  useProductSizesQuery,
  useSimilarProductsQuery,
} from "@/hooks/useProducts";

const SELECTION_UNITS = ["LEFT", "RIGHT", "PAIR", "UNPAIRED"] as const;

export const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<string>(SELECTION_UNITS[0]);
  const [selectedWidth, setSelectedWidth] = useState<string | undefined>(
    undefined
  );

  const [selectedSizes, setSelectedSizes] = useState<{
    left?: string;
    right?: string;
  }>({});

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
    error: productError,
    refetch: productRefetch,
  } = useProductQuery(id);

  const {
    data: similarProducts,
    isLoading: isSimilarProductsLoading,
    isError: isSimilarProductError,
  } = useSimilarProductsQuery(id);

  const {
    data: leftUnitTypeSizes,
    isLoading: isLeftUnitTypeSizesLoading,
    isError: isLeftUnitTypeSizesError,
  } = useProductSizesQuery(id, "LEFT");

  const {
    data: rightUnitTypeSizes,
    isLoading: isRightUnitTypeSizesLoading,
    isError: isRightUnitTypeSizesError,
  } = useProductSizesQuery(id, "RIGHT");

  const {
    data: pairUnitTypeSizes,
    isLoading: isPairUnitTypeSizesLoading,
    isError: isPairUnitTypeSizesError,
  } = useProductSizesQuery(id, "PAIR");

  const productSizes = useMemo(() => {
    if (selectedUnit === "LEFT") return leftUnitTypeSizes;
    if (selectedUnit === "RIGHT") return rightUnitTypeSizes;
    if (selectedUnit === "PAIR") return pairUnitTypeSizes;
    if (selectedUnit === "UNPAIRED") return leftUnitTypeSizes;

    return null;
  }, [selectedUnit, leftUnitTypeSizes, rightUnitTypeSizes, pairUnitTypeSizes]);

  console.log(productSizes);

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

  if (
    isProductLoading ||
    isSimilarProductsLoading ||
    isPairUnitTypeSizesLoading ||
    isRightUnitTypeSizesLoading ||
    isLeftUnitTypeSizesLoading
  ) {
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

  if (
    isProductError ||
    isSimilarProductError ||
    isLeftUnitTypeSizesError ||
    isRightUnitTypeSizesError ||
    isPairUnitTypeSizesError
  ) {
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

  if (!product || !similarProducts || !productSizes) {
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
            <img
              key={selectedImage}
              src={product.images?.[selectedImage]?.imageUrl}
              alt={product.name}
              className="max-w-full max-h-[500px] object-contain opacity-0 transition-opacity duration-500"
              onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
            />
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-2 w-full">
          {product.images.slice(0, 3)?.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "w-full h-48 object-contain cursor-pointer bg-muted/50",
                index === selectedImage && "border border-gray-300"
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        className="flex-1 flex flex-col justify-start gap-4 bg-muted/50 py-6 px-8"
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
            {features.map((feature, index) => (
              <motion.div
                key={`${feature}:${index}`}
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

        <div className="w-full flex flex-col justify-center">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {similarProducts.products.map((product) => (
              <div className="border" key={product.name}>
                <ProductCard product={product} displayName={false} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center gap-3">
          <p className="font-semibold text-lg sm:text-base">Unit:</p>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <ButtonGroup className="flex flex-wrap justify-center sm:justify-end">
              {SELECTION_UNITS.map((unit) => (
                <Button
                  key={unit}
                  onClick={() => {
                    setSelectedUnit(unit);
                    setSelectedWidth(undefined);
                    setSelectedSizes({});
                  }}
                  variant="outline"
                  className={cn(
                    "text-[10px]",
                    unit === selectedUnit &&
                      "bg-black text-white hover:bg-black hover:text-white"
                  )}
                >
                  {unit}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center gap-3">
          <p className="font-semibold text-lg sm:text-base">Width:</p>

          <div className="flex justify-center sm:justify-end w-full sm:w-auto">
            <ButtonGroup className="flex flex-wrap justify-center sm:justify-end">
              {productSizes.availableWidths.map((width) => (
                <Button
                  key={width}
                  variant="outline"
                  onClick={() => {
                    setSelectedWidth(width);
                    setSelectedSizes({});
                  }}
                  className={cn(
                    "text-[10px]",
                    width === selectedWidth &&
                      "bg-black text-white hover:bg-black hover:text-white"
                  )}
                >
                  {width}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>

        {selectedWidth ? (
          selectedUnit === "UNPAIRED" ? (
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col w-full bg-muted/30 p-4 rounded-2xl shadow-sm border border-gray-100">
                <Badge>Left</Badge>
                <div className="flex flex-wrap gap-2 mt-4">
                  {leftUnitTypeSizes?.variationsByWidth[selectedWidth]?.map(
                    (variation) => (
                      <Button
                        key={`left-${variation.id}`}
                        variant="outline"
                        disabled={!variation.available}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            left:
                              prev.left !== variation.size
                                ? variation.size
                                : undefined,
                          }))
                        }
                        className={cn(
                          "!min-w-[3rem]",
                          !variation.available &&
                            "opacity-50 cursor-not-allowed",
                          selectedSizes.left === variation.size &&
                            "bg-black text-white hover:bg-black hover:text-white"
                        )}
                      >
                        {variation.size}
                      </Button>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-10 h-[2px] bg-gray-300 rounded-full" />
              </div>

              <div className="flex flex-col w-full bg-muted/30 p-4 rounded-2xl shadow-sm border border-gray-100">
                <Badge>Right</Badge>
                <div className="flex flex-wrap gap-2 mt-4">
                  {rightUnitTypeSizes?.variationsByWidth[selectedWidth]?.map(
                    (variation) => (
                      <Button
                        key={`right-${variation.id}`}
                        variant="outline"
                        disabled={!variation.available}
                        onClick={() =>
                          setSelectedSizes((prev) => ({
                            ...prev,
                            right:
                              prev.right !== variation.size
                                ? variation.size
                                : undefined,
                          }))
                        }
                        className={cn(
                          "!min-w-[3rem]",
                          !variation.available &&
                            "opacity-50 cursor-not-allowed",
                          selectedSizes.right === variation.size &&
                            "bg-black text-white hover:bg-black hover:text-white"
                        )}
                      >
                        {variation.size}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-col w-full bg-muted/30 p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="font-semibold mb-2 text-lg">All sizes</p>
                <div className="flex flex-wrap gap-2">
                  {productSizes.variationsByWidth[selectedWidth].map(
                    (variation) => (
                      <Button
                        key={variation.id}
                        variant="outline"
                        disabled={!variation.available}
                        onClick={() =>
                          setSelectedSizes({
                            left:
                              selectedSizes.left !== variation.size
                                ? variation.size
                                : undefined,
                          })
                        }
                        className={cn(
                          !variation.available &&
                            "opacity-50 cursor-not-allowed",
                          selectedSizes.left === variation.size &&
                            "bg-black text-white hover:bg-black hover:text-white"
                        )}
                      >
                        {variation.size}
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          )
        ) : (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Select Unit Type & Width</EmptyTitle>
              <EmptyDescription>
                In order to see all available sizes for given product, firstly
                select Unit Type and Width of the product.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}

        <div className="flex flex-col w-full">
          {(selectedUnit === "UNPAIRED"
            ? selectedSizes.left && selectedSizes.right
            : selectedSizes.left) && <Button>Add to Cart</Button>}
        </div>
      </motion.div>
    </motion.div>
  );
};
