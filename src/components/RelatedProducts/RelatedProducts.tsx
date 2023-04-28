import React, { useEffect, useState } from "react";
import { Product } from "../FeaturedProduct/FeaturedProduct";
import FeaturedProduct from "../FeaturedProduct/FeaturedProduct";
import axios from "../../axios/publicAxiosInstance";
type RelatedProductsProps = {
  product_id: number;
};
type RelatedProductsResponse = {
  author: Product[];
};
const RelatedProducts = ({ product_id }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] =
    useState<RelatedProductsResponse | null>(null);
  useEffect(() => {
    const getRelatedProducts = async () => {
      try {
        const products = (await axios.get(
          "product/relatedProducts"
        )) as RelatedProductsResponse;
        setRelatedProducts(products);
      } catch (error) {}
    };
    getRelatedProducts();
  }, []);
};

export default RelatedProducts;
