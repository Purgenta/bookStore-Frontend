import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faCircleInfo, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./Notification.module.css";
import { AnimatePresence, motion, Variants } from "framer-motion";
export type UserNotification = {
  message: string;
  notificationType: "ERROR" | "SUCCESS" | "INFORMATION";
  id: string;
};
const notificationVariant: Variants = {
  initial: {
    x: "-30px",
    opacity: 0,
  },
  animate: {
    x: "0px",
    opacity: 1,
  },
  exit: {
    x: "30px",
    opacity: 0,
  },
};
const Notification = (notification: UserNotification) => {
  const type = notification.notificationType;
  let symbol: JSX.Element;
  switch (type) {
    case "ERROR":
      symbol = <FontAwesomeIcon icon={faX} />;
      break;
    case "INFORMATION":
      symbol = <FontAwesomeIcon icon={faCircleInfo} />;
      break;
    case "SUCCESS":
      symbol = <FontAwesomeIcon icon={faCheck} />;
      break;
    default: {
      symbol = <span></span>;
    }
  }
  return (
    <AnimatePresence>
      <motion.p
        variants={notificationVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        className={style["notification"]}
      >
        {symbol}
        {notification.message}
      </motion.p>
    </AnimatePresence>
  );
};

export default Notification;
