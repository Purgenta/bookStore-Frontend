import { useEffect, useState } from "react";
import { DetailedProduct } from "./productType";
import axios from "../../axios/publicAxiosInstance";
import { isAxiosError } from "axios";
import { useParams } from "react-router-dom";
import { MultiSlider } from "../../components/MultiSlider/MultiSlider";
import style from "./Product.module.css";
import ReadMore from "../../components/ReadMore/ReadMore";
import HighlightedFeatures from "../../components/HighlightedFeatures/HighlightedFeatures";
import InputNumber from "../../components/Inputs/InputNumber/InputNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import useUpdateCartQuantity from "../../hooks/useUpdateCartQuantity";
import Reviews from "../../components/Reviews/Reviews";
export const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const updateQuantity = useUpdateCartQuantity(Number(id));
  const [quantity, setQuantity] = useState(0);
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
  let newPrice: number | null = null;
  if (product) {
    product.sale
      ? (newPrice =
          product.price - (product.price * product.sale.discount) / 100)
      : (newPrice = null);
  }
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
              {`By ${product.author.name} ${product.author.last_name}`}
            </h3>
            {
              <ReadMore
                paragraph={product.description}
                className={style["description"]}
              />
            }
            <div className={style["purchase"]}>
              <div className={style["pricing"]}>
                {newPrice && (
                  <h4 className={style["new-price"]}>
                    New price:
                    {newPrice.toFixed(2)}
                    {`\u20AC`}
                  </h4>
                )}
                <h4
                  className={`${style["product-price"]} ${
                    newPrice ? style["old-price"] : ""
                  }`}
                >
                  {`${
                    newPrice ? "Old price:" : "Price:"
                  } ${product.price.toFixed(2)}`}
                  {`\u20AC`}
                </h4>
              </div>
              <div className={style["add-item"]}>
                <InputNumber
                  min={1}
                  max={product.quantity}
                  getChange={(input) => setQuantity(input)}
                ></InputNumber>
                <button
                  onClick={async () => {
                    await updateQuantity(quantity);
                  }}
                  className={style["add-to__cart"]}
                >
                  Add to cart <FontAwesomeIcon icon={faShoppingCart} />
                </button>
              </div>
            </div>
          </div>
        </section>
        <HighlightedFeatures
          page_number={product.page_number}
          publishing_date={new Date(product.publishing_date)}
          publisher={product.publisher.name}
        ></HighlightedFeatures>
        <section className={style["reviews"]}>
          <h2>Reviews:</h2>
          <Reviews product_id={product.id}></Reviews>
        </section>
      </div>
    )
  );
};
export default Product;
