import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { Loader2, RefreshCcw } from "lucide-react";
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
  type ProductVariation,
} from "@/hooks/useProducts";

const SELECTION_UNITS = ["PAIR", "UNPAIRED"] as const;

export const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState<ProductVariation[]>([]);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedUnit, setSelectedUnit] = useState<string>(SELECTION_UNITS[0]);
  const [selectedWidthPair, setSelectedWidthPair] = useState<string | null>(
    null
  );
  const [selectedWidthRight, setSelectedWidthRight] = useState<string | null>(
    null
  );
  const [selectedWidthLeft, setSelectedWidthLeft] = useState<string | null>(
    null
  );

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

  const addProduct = (newProduct: ProductVariation) => {
    setProducts((prevProducts) => {
      const filtered = prevProducts.filter(
        (product) => product.unit !== newProduct.unit
      );
      const exists = filtered.some((product) => product.id === newProduct.id);

      if (exists) return filtered;
      return [...filtered, newProduct];
    });
  };

  const removeProduct = (productId: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const hasProduct = (productId: number) => {
    return products.some((product) => product.id === productId);
  };

  const productSelection = (product: ProductVariation) => {
    if (hasProduct(product.id)) {
      removeProduct(product.id);
    } else {
      addProduct(product);
    }
  };

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

  if (
    !product ||
    !similarProducts ||
    !pairUnitTypeSizes ||
    !leftUnitTypeSizes ||
    !rightUnitTypeSizes
  ) {
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
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {similarProducts.products.map((product) => (
              <div className="border" key={product.name}>
                <img
                  key={product.productId}
                  src={product.images[0]?.imageUrl}
                  alt={product.name}
                  onClick={() => navigate(`/products/${product.productId}`)}
                  className="w-full h-28 object-contain cursor-pointer bg-muted/50"
                />
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
                    setSelectedWidthPair(null);
                    setProducts([]);
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
        {selectedUnit === "UNPAIRED" ? (
          <div className="flex lg:flex-row flex-col gap-2 w-full">
            <div className="flex flex-col w-full bg-muted/30 p-4 rounded-2xl shadow-sm border border-gray-100">
              <Badge>Left</Badge>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center gap-3">
                <p className="font-semibold text-lg sm:text-base">Width:</p>

                <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                  <ButtonGroup className="flex flex-wrap justify-center sm:justify-end">
                    {leftUnitTypeSizes.availableWidths.map((width) => (
                      <Button
                        key={width}
                        variant="outline"
                        onClick={() => {
                          setSelectedWidthLeft(width);
                          setProducts([]);
                        }}
                        className={cn(
                          "text-[10px]",
                          width === selectedWidthLeft &&
                            "bg-black text-white hover:bg-black hover:text-white"
                        )}
                      >
                        {width}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>

              {selectedWidthLeft ? (
                <div className="flex flex-col justify-center items-start">
                  <div className="flex flex-col w-full">
                    <p className="font-semibold text-lg sm:text-base my-4">
                      All sizes
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {leftUnitTypeSizes.variationsByWidth[
                        selectedWidthLeft
                      ].map((variation) => (
                        <Button
                          key={variation.id}
                          variant="outline"
                          disabled={!variation.available}
                          onClick={() => {
                            productSelection(variation);
                          }}
                          className={cn(
                            !variation.available &&
                              "opacity-50 cursor-not-allowed",
                            hasProduct(variation.id) &&
                              "bg-black text-white hover:bg-black hover:text-white"
                          )}
                        >
                          {variation.size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Empty className="border mt-4 !p-4">
                  <EmptyHeader>
                    <EmptyTitle>Select Width</EmptyTitle>
                    <EmptyDescription>
                      In order to see all available sizes for given product,
                      firstly select Width of the product.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </div>

            <div className="flex flex-col w-full bg-muted/30 p-4 rounded-2xl shadow-sm border border-gray-100">
              <Badge>Right</Badge>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center gap-3">
                <p className="font-semibold text-lg sm:text-base">Width:</p>

                <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                  <ButtonGroup className="flex flex-wrap justify-center sm:justify-end">
                    {rightUnitTypeSizes.availableWidths.map((width) => (
                      <Button
                        key={width}
                        variant="outline"
                        onClick={() => {
                          setSelectedWidthRight(width);
                          setProducts([]);
                        }}
                        className={cn(
                          "text-[10px]",
                          width === selectedWidthRight &&
                            "bg-black text-white hover:bg-black hover:text-white"
                        )}
                      >
                        {width}
                      </Button>
                    ))}
                  </ButtonGroup>
                </div>
              </div>

              {selectedWidthRight ? (
                <div className="flex flex-col justify-center items-start">
                  <div className="flex flex-col w-full">
                    <p className="font-semibold text-lg sm:text-base my-4">
                      All sizes
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {rightUnitTypeSizes.variationsByWidth[
                        selectedWidthRight
                      ].map((variation) => (
                        <Button
                          key={variation.id}
                          variant="outline"
                          disabled={!variation.available}
                          onClick={() => {
                            productSelection(variation);
                          }}
                          className={cn(
                            !variation.available &&
                              "opacity-50 cursor-not-allowed",
                            hasProduct(variation.id) &&
                              "bg-black text-white hover:bg-black hover:text-white"
                          )}
                        >
                          {variation.size}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Empty className="border mt-4 !p-4">
                  <EmptyHeader>
                    <EmptyTitle>Select Width</EmptyTitle>
                    <EmptyDescription>
                      In order to see all available sizes for given product,
                      firstly select Width of the product.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-center gap-3">
              <p className="font-semibold text-lg sm:text-base">Width:</p>

              <div className="flex justify-center sm:justify-end w-full sm:w-auto">
                <ButtonGroup className="flex flex-wrap justify-center sm:justify-end">
                  {pairUnitTypeSizes.availableWidths.map((width) => (
                    <Button
                      key={width}
                      variant="outline"
                      onClick={() => {
                        setSelectedWidthPair(width);
                        setProducts([]);
                      }}
                      className={cn(
                        "text-[10px]",
                        width === selectedWidthPair &&
                          "bg-black text-white hover:bg-black hover:text-white"
                      )}
                    >
                      {width}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>

            {selectedWidthPair ? (
              <div className="flex flex-col justify-center items-start">
                <div className="flex flex-col w-full">
                  <p className="font-semibold text-lg sm:text-base my-4">
                    All sizes
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pairUnitTypeSizes.variationsByWidth[selectedWidthPair].map(
                      (variation) => (
                        <Button
                          key={variation.id}
                          variant="outline"
                          disabled={!variation.available}
                          onClick={() => {
                            productSelection(variation);
                          }}
                          className={cn(
                            !variation.available &&
                              "opacity-50 cursor-not-allowed",
                            hasProduct(variation.id) &&
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
              <Empty className="border mt-4 !p-4">
                <EmptyHeader>
                  <EmptyTitle>Select Width</EmptyTitle>
                  <EmptyDescription>
                    In order to see all available sizes for given product,
                    firstly select Width of the product.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
          </div>
        )}

        {products.length > 0 && (
          <div className="flex flex-col w-full">
            <Button>Add to Cart</Button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
