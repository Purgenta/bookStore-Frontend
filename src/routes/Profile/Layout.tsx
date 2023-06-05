import React from "react";
import style from "./Layout.module.css";
type Props = {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: Date;
};
const Layout = ({
  name,
  last_name,
  email,
  created_at,
  phone_number,
}: Props) => {
  return (
    <header className={style["profile-overview"]}>
      <h2>User-information</h2>
      <ul className={style["user-information__items"]}>
        <li className={style["user-information"]}>
          <div className={style["user-cover"]}>
            <img
              className={style["user-avatar"]}
              src="https://www.knjizare-vulkan.rs/nb-public/themes/nbshop5_v5_8/_static/images/core/user.png"
            ></img>
            <h3 className={style["user-name"]}>{`${name} ${last_name}`}</h3>
          </div>
        </li>
        <li>
          <div className={style["user-email"]}>
            <h4>
              User email<br></br>
              {email}
            </h4>
          </div>
        </li>
        <li>
          <div className={style["user-phone"]}>
            <h4>
              Phone number<br></br>
              {phone_number}
            </h4>
          </div>
        </li>
        <li>
          <div className={style["user-created__at"]}>
            <h4>
              Created at:
              <br></br>
              {new Date(created_at).toLocaleDateString("en-GB", {
                year: "numeric",
                day: "2-digit",
                month: "long",
              })}
            </h4>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Layout;
