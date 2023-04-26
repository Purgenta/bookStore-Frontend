import { useEffect, useState } from "react";
import { DetailedProduct } from "./productType";
import axios from "../../axios/publicAxiosInstance";
import { isAxiosError } from "axios";
import { useParams } from "react-router-dom";
import { MultiSlider } from "../../components/MultiSlider/MultiSlider";
import style from "./Product.module.css";
import ReadMore from "../../components/ReadMore/ReadMore";
import HighlightedFeatures from "../../components/HighlightedFeatures/HighlightedFeatures";
export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const productById = (await axios.get(`product/${id}`))
          .data as DetailedProduct;
        setProduct(productById);
      } catch (error) {
        if (isAxiosError(error)) {
        }
      }
    };
    getProduct();
  }, []);
  return (
    product && (
      <div className={style["product"]}>
        <section className={style["product-info"]}>
          <div className={style["img-wrapper"]}>
            <MultiSlider
              elements={product.productImages}
              className={style["swiper"]}
              id={(image) => image.id}
              options={{
                breakpoints: {
                  480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                  },
                },
              }}
              renderElement={(image) => {
                return (
                  <img
                    className={style["product-image"]}
                    src={image.image_url}
                  ></img>
                );
              }}
            ></MultiSlider>
          </div>
          <div className={style["information"]}>
            <h2 className={style["title"]}>{product.title}</h2>
            <ul className={style["product-genres"]}>
              {product.genre.map((genre) => {
                return (
                  <li key={genre.id} className={style["genre"]}>
                    {genre.name}
                  </li>
                );
              })}
            </ul>
            <h3 className={style["author"]}>
              {`${product.author.name} ${product.author.last_name}`}
            </h3>
            {
              <ReadMore
                paragraph={product.description}
                className={style["description"]}
              />
            }
            <div className={style["purchase"]}>
              <h4 className={style["product-price"]}>
                {product.price} {`\u20AC`}
              </h4>
              <div className="add-item">
                <input type="number" className={style["quantity"]} />
              </div>
            </div>
          </div>
        </section>
        <HighlightedFeatures
          page_number={product.page_number}
          publishing_date={new Date(product.publishing_date)}
          publisher={product.publisher.name}
        ></HighlightedFeatures>
      </div>
    )
  );
};
export default Product;
