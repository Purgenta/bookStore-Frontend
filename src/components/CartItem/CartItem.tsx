import style from "./CartItem.module.css";
import { CartResponse } from "../../types/cart";
import { productPricePerItem } from "../../routes/Cart/Cart";
import { useEffect, useState } from "react";
import InputNumber from "../Inputs/InputNumber/InputNumber";
import useDeleteCartItem from "../../hooks/requests/cart/useDeleteCartItem";
import useSetCartItem from "../../hooks/requests/cart/useSetCartItem";
type Props = {
  item: CartResponse;
  onQuantityChange: (product_id: number, quantity: number) => unknown;
  onItemDelete: (product_id: number) => unknown;
};
const CartItem = ({ item, onItemDelete, onQuantityChange }: Props) => {
  const itemPrice = productPricePerItem(item);
  const setItem = useSetCartItem();
  console.log(item);
  const [quantity, setQuantity] = useState({
    quantity: item.cartItem[0].quantity,
    hasChanged: false,
  });
  const deleteCartItem = useDeleteCartItem();
  useEffect(() => {
    let timeout = 10;
    if (quantity.hasChanged) {
      timeout = setTimeout(() => {
        setItem(quantity.quantity, item.id, () =>
          onQuantityChange(item.id, quantity.quantity)
        );
      }, 850);
    }
    return () => clearTimeout(timeout);
  }, [quantity]);
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
          ? `${(item.price - (item.sale?.discount * item.price) / 100).toFixed(
              2
            )} \u20AC`
          : "/"}
      </td>
      <td>
        <InputNumber
          max={item.quantity}
          min={1}
          getChange={(qt) => {
            console.log(`changed`);
            setQuantity((prev) => ({ hasChanged: true, quantity: qt }));
          }}
          value={quantity.quantity}
        />
      </td>
      <td>{`${(item.cartItem[0].quantity * itemPrice).toFixed(2)} \u20AC`}</td>
      <td>
        <button
          onClick={() => deleteCartItem(item.id, () => onItemDelete(item.id))}
          className={style["delete-btn"]}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
