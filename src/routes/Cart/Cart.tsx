import React, { useEffect } from "react";
import { Discount, ProductImage } from "../Product/productType";
import style from "./Cart.module.css";
import { useState } from "react";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notification/notificationSlice";
import { nanoid } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
type CartItem = {
  product_id: number;
  quantity: number;
};
type CartResponse = {
  cartItem: CartItem[];
  id: number;
  title: string;
  quantity: number;
  price: number;
  sale: Discount | null;
  productImages: ProductImage[];
};
const Cart = () => {
  const axios = useAuthenticatedAxios();
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const productPricePerItem = (item: CartResponse) => {
    return item.sale
      ? item.price - (item.sale?.discount * item.price) / 100
      : item.price;
  };
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
  const deleteCartItem = async (product_id: number) => {
    try {
      await axios.post("cart/deleteCartItem", {
        product_id,
      });
      setCartItems((prev) => {
        const remainingItems = prev.filter((item) => {
          return item.id !== product_id;
        });
        return remainingItems;
      });
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to remove product ",
          id: nanoid(5),
          notificationType: "ERROR",
        })
      );
    }
  };
  const items = cartItems.map((item) => {
    const itemPrice = productPricePerItem(item);
    return (
      <tr key={item.title}>
        <td>
          <img src={item.productImages[0].image_url}></img>
        </td>
        <td>{item.title}</td>
        <td>{`${item.price.toFixed(2)} \u20AC`}</td>
        <td>{item.sale?.discount ? `${item.sale.discount} %` : "/"}</td>
        <td>
          {item.sale
            ? `${(
                item.price -
                (item.sale?.discount * item.price) / 100
              ).toFixed(2)} \u20AC`
            : "/"}
        </td>
        <td>{item.cartItem[0].quantity}</td>
        <td>{`${(item.cartItem[0].quantity * itemPrice).toFixed(
          2
        )} \u20AC`}</td>
        <td>
          <button
            onClick={() => deleteCartItem(item.id)}
            className={style["delete-btn"]}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });
  useEffect(() => {
    const getcartItems = async () => {
      const items = (await axios.get("cart/cartItems")).data;
      setCartItems(items);
    };
    getcartItems();
  }, []);
  return (
    <section>
      {cartItems.length && (
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
              <button className={style["checkout"]}>Checkout</button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
