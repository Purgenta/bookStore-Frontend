import { useEffect, useState } from "react";
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
import FeaturedProduct from "../../components/FeaturedProduct/FeaturedProduct";
import useGetBookById from "../../hooks/requests/books/useGetBookById";
import { useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
export const Product = () => {
  const { id } = useParams();
  const { isAuthenticated } = useSelector(authenticationSelector);
  const { data } = useGetBookById(`${id}`);
  const updateQuantity = useUpdateCartQuantity(Number(id));
  const [quantity, setQuantity] = useState(1);
  let newPrice: number | null = null;
  const product = data ? data.product : null;
  if (data) {
    const { product } = data;
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
              slider={{ className: style["swiper-slider"] }}
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
                    alt={`${product.title} cover image`}
                  ></img>
                );
              }}
            ></MultiSlider>
            <ul className={style["product-genres"]}>
              {product.genre.map((genre) => {
                return (
                  <li key={genre.genre.id} className={style["genre"]}>
                    {genre.genre.name}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={style["information"]}>
            <h2 className={style["title"]}>{product.title}</h2>
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
                  value={1}
                  min={1}
                  max={product.quantity}
                  getChange={(input) => setQuantity(input)}
                ></InputNumber>
                <button
                  disabled={!isAuthenticated}
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
        <div className={style["reviews-similiar__products"]}>
          <section className={style["reviews"]}>
            <h2>Reviews:</h2>
            <Reviews
              canReview={data ? data.canReview : false}
              key={id}
              product_id={id ? +id : 0}
            ></Reviews>
          </section>
          <div className={style["similiar-products__wrapper"]}>
            <h3>Similiar products</h3>
            <ul className={style["similiar-products"]}>
              {product.similiarProducts.map((product) => {
                return (
                  <li key={product.id}>
                    <FeaturedProduct
                      className={style["similiar-product"]}
                      product={product}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  );
};
export default Product;
