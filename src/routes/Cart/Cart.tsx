import { useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartResponse } from "../../types/cart";
import useGetCartItems from "../../hooks/requests/cart/useGetCartItems";
import CartItem from "../../components/CartItem/CartItem";
import useCheckout from "../../hooks/requests/cart/useCheckout";
export const productPricePerItem = (item: CartResponse) => {
  return item.sale
    ? item.price - (item.sale?.discount * item.price) / 100
    : item.price;
};
const Cart = () => {
  const { data } = useGetCartItems();
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const checkout = useCheckout();
  useEffect(() => {
    if (data) setCartItems(data);
  }, [data]);
  const totalCost = (items: CartResponse[]) => {
    return items.reduce((acum, current) => {
      return acum + productPricePerItem(current) * current.cartItem[0].quantity;
    }, 0);
  };
  const totalWithoutDiscounts = (items: CartResponse[]) => {
    return items.reduce((acum, current) => {
      return acum + current.price * current.cartItem[0].quantity;
    }, 0);
  };
  const items = cartItems.map((item) => {
    return (
      <CartItem
        key={item.id}
        onQuantityChange={(id, quantity) => {
          setCartItems((prev) => {
            const item = prev.find((item) => item.id === id);
            console.log(item);
            if (item?.cartItem[0].quantity)
              item.cartItem[0].quantity = quantity;
            return [...prev];
          });
        }}
        item={item}
        onItemDelete={(id) =>
          setCartItems((prev) => prev.filter((item) => item.id !== id))
        }
      ></CartItem>
    );
  });
  return (
    <section className={style["cart"]}>
      {cartItems.length ? (
        <>
          <h2 className={style["cart-section__title"]}>Your cart</h2>
          <table className={style["cart-items"]}>
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Price with discount</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
          <div className={style["cart-summary"]}>
            <h2>Total summary</h2>
            <div className={style["price-wrapper"]}>
              <h3>
                <span>Total:</span>
                <span>{`${totalCost(cartItems).toFixed(2)} \u20AC`}</span>
              </h3>
              <h3>
                <span>Savings: </span>
                <span>{`${(
                  totalWithoutDiscounts(cartItems) - totalCost(cartItems)
                ).toFixed(2)} \u20AC`}</span>
              </h3>
              <button
                onClick={async () => {
                  try {
                    await checkout();
                    setCartItems([]);
                  } catch (error) {
                    console.log(error);
                  }
                }}
                className={style["checkout"]}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <h2>No cart items please add some</h2>
      )}
    </section>
  );
};

export default Cart;
