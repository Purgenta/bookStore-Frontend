import React, { useEffect } from "react";
import style from "./Notifications.module.css";
import Notification from "./Notification/Notification";
import {
  notificationSelector,
  removeNotification,
} from "../../redux/notification/notificationSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const Notifications = () => {
  const notifications = useSelector(notificationSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!notifications.length) return;
    setTimeout(() => {
      dispatch(removeNotification());
    }, 1500);
  }, [notifications]);

  return (
    <ul className={style["notification-list"]}>
      {notifications.map((value) => (
        <li key={value.id}>
          <Notification
            id={value.id}
            message={value.message}
            notificationType={value.notificationType}
          />
        </li>
      ))}
    </ul>
  );
};

export default Notifications;
