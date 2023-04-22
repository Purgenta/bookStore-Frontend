import style from "./FeaturedProduct.module.css";
import { Link } from "react-router-dom";
import { FavouriteProduct as Featured } from "../../redux/favourites/favouritesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const FeaturedProduct = (product: Featured) => {
  const imageURL = product.productImages[0]?.image_url;
  const { price, title, id } = product;
  return (
    <Link to={`/product/${id}`} className={style["featured-product"]}>
      <div className={style["img-wrapper"]}>
        <img
          className={style["book-cover__image"]}
          src={imageURL}
          alt={`${title} cover`}
        />
        <button className={style["add-to__favourites"]}>
          <FontAwesomeIcon size="2x" icon={faHeart} />
        </button>
      </div>
      <div className={style["product-info"]}>
        <p className={style["title"]}>{title}</p>
        <p className={style["price"]}>
          {price.toFixed(2)}
          {`\u20AC`}
        </p>
      </div>
      <button className={style["add-cart"]}>Add to cart</button>
    </Link>
  );
};

export default FeaturedProduct;
