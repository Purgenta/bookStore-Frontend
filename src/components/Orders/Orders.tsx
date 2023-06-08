import useGetOrders from "../../hooks/requests/orders/useGetOrders";
import style from "./Orders.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Modal from "react-modal";
import { Order } from "../../types/order";
import ReviewForm, { ReviewFormValues } from "../Reviews/ReviewForm/ReviewForm";
import useAuthenticatedAxios from "../../axios/useAuthenticatedAxios";
import { useDispatch } from "react-redux";
import { addNotification } from "../../redux/notification/notificationSlice";
const Orders = () => {
  const { data, mutate } = useGetOrders();
  const [isOpen, setIsOpen] = useState(false);
  Modal.setAppElement("#root");
  const dispatch = useDispatch();
  const axios = useAuthenticatedAxios();
  const [order, setOrder] = useState<Order | null>(null);
  const onReviewSubmit = async (data: ReviewFormValues) => {
    try {
      await axios.post("order/addReview", { ...data, order_id: order?.id });
      setIsOpen(false);
      mutate();
      dispatch(
        addNotification({
          message: "Succesfully added a review",
          notificationType: "SUCCESS",
        })
      );
    } catch (error) {
      dispatch(
        addNotification({
          message: "Error while trying to add a review",
          notificationType: "ERROR",
        })
      );
    }
  };
  return (
    <>
      {data && !data.length && <h2>You don't have any orders yet</h2>}
      <Modal className={"modal"} isOpen={isOpen}>
        <FontAwesomeIcon
          onClick={() => setIsOpen(false)}
          icon={faX}
        ></FontAwesomeIcon>
        <ReviewForm onSubmit={onReviewSubmit}></ReviewForm>
      </Modal>
      <ul className={style["orders"]}>
        {data &&
          data.length &&
          data.map((order) => {
            return (
              <li key={order.id}>
                <div className={style["order-wrapper"]}>
                  <h3>
                    Order id: <br></br>
                    {order.id}
                  </h3>
                  <h3>
                    Created <br></br>
                    {new Date(order.ordered_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <h3>
                    Order status: <br></br>
                    {order.order_status}
                  </h3>
                  <button
                    className={style["review-btn"]}
                    disabled={
                      order.order_status !== "DELIVERED" ||
                      order.orderReview !== null
                    }
                    onClick={() => {
                      setOrder(order);
                      setIsOpen(true);
                    }}
                  >
                    <FontAwesomeIcon size="xl" icon={faEdit} />
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Orders;
