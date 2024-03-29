import style from "./FeaturedProduct.module.css";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import Favourite from "../Favourite/Favourite";
import useUpdateCartQuantity from "../../hooks/useUpdateCartQuantity";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLoginWarning from "../../hooks/useLoginWarning";
import { useNavigate } from "react-router-dom";
import { Product } from "../../types/product";
interface FeaturedProductProps {
  product: Product;
  className?: string;
  addCart?: boolean;
  favourite?: boolean;
}
const FeaturedProduct = ({
  product,
  addCart,
  className,
  favourite,
}: FeaturedProductProps) => {
  const navigate = useNavigate();
  const loginWarning = useLoginWarning();
  const updateQuantity = useUpdateCartQuantity(product.id);
  const { isAuthenticated } = useSelector(authenticationSelector);
  const imageURL = product.productImages[0]?.image_url;
  const { price, title, id, sale } = product;
  const newPrice = sale?.discount
    ? price - (price * sale.discount) / 100
    : undefined;
  const addToCart = async () => {
    if (!isAuthenticated) {
      loginWarning();
      navigate("/login");
      return;
    }
    await updateQuantity(1);
  };
  return (
    <div className={className || style["featured-product"]}>
      <Link to={`/product/${id}`} className={style["img-wrapper"]}>
        {sale?.discount && (
          <span className={style["discount"]}>-{sale.discount}%</span>
        )}
        <img
          className={style["book-cover__image"]}
          src={imageURL}
          alt={`${title} cover`}
        />
        {favourite && (
          <Favourite
            product_id={id}
            className={style["add-to__favourites"]}
          ></Favourite>
        )}
      </Link>
      <div className={style["product-info"]}>
        <p className={style["title"]}>{title}</p>
        <div className={style["price-information"]}>
          {newPrice && (
            <p className={style["new-price"]}>
              {newPrice.toFixed(2)}
              {`\u20AC`}
            </p>
          )}
          <p className={newPrice ? style["old-price"] : style["price"]}>
            {price.toFixed(2)}
            {`\u20AC`}
          </p>
        </div>
      </div>
      {addCart && (
        <button onClick={addToCart} className={style["add-cart"]}>
          Add to cart
        </button>
      )}
    </div>
  );
};

export default FeaturedProduct;
