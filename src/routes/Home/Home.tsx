import { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "../../axios/publicAxiosInstance";
import { MultiSlider } from "../../components/MultiSlider/MultiSlider";
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import { Product } from "../../components/FeaturedProduct/FeaturedProduct";
import useGetFeaturedBooks from "../../hooks/requests/books/useGetFeaturedBooks";
interface FeaturedProducts {
  newestProducts: Product[];
  bestRated: Product[];
}
const Home = () => {
  const { data: featuredProducts } = useGetFeaturedBooks();
  return (
    <section className={style["featured-products"]}>
      <div className={style["featured-group"]}>
        <h2 className={style["list-title"]}>Newest</h2>
        {featuredProducts && featuredProducts.newestProducts.length && (
          <MultiSlider
            className={style["product-swiper"]}
            elements={featuredProducts.newestProducts}
            id={(product: Product) => product.id}
            renderElement={(product) => {
              return <FeaturedProduct addCart favourite product={product} />;
            }}
          ></MultiSlider>
        )}
      </div>
      <div className={style["featured-group"]}>
        <h2 className={style["list-title"]}>Best rated</h2>
        {featuredProducts && featuredProducts.bestRated.length && (
          <MultiSlider
            className={style["product-swiper"]}
            elements={featuredProducts.bestRated}
            id={(product: Product) => product.id}
            renderElement={(product) => {
              return <FeaturedProduct addCart favourite product={product} />;
            }}
          ></MultiSlider>
        )}
      </div>
    </section>
  );
};

export default Home;
