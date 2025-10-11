import { ProductDetails } from "./ProductDetails";
import { ProductSimilar } from "./ProductSimilar";

export const Product = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <ProductDetails />
      <ProductSimilar />
    </div>
  );
};
