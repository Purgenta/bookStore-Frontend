import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import axios from "../../axios/publicAxiosInstance";
import { MultiSlider } from "../../components/MultiSlider/MultiSlider";
import FeaturedProduct from "../../components/FeaturedProducts/FeaturedProduct";
import { FavouriteProduct as Product } from "../../redux/favourites/favouritesSlice";
interface FeaturedProducts {
  newestProducts: Product[];
  bestRated: Product[];
}
const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProducts>({
    newestProducts: [],
    bestRated: [],
  });
  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const featured = (await axios.get("product/showcasedProducts"))
          .data as FeaturedProducts;
        console.log(featured);
        setFeaturedProducts(featured);
      } catch (error) {}
    };
    getFeaturedProducts();
  }, []);
  return (
    <section className={style["featured-products"]}>
      <h2>Newest:</h2>
      {featuredProducts.newestProducts.length && (
        <MultiSlider
          elements={featuredProducts.newestProducts}
          id={(product: Product) => product.id}
          renderElement={FeaturedProduct}
        ></MultiSlider>
      )}
      <h2>Best rated:</h2>
      {featuredProducts.bestRated.length && (
        <MultiSlider
          swiper={style["product-swiper"]}
          elements={featuredProducts.bestRated}
          id={(product: Product) => product.id}
          renderElement={FeaturedProduct}
        ></MultiSlider>
      )}
    </section>
  );
};

export default Home;
