import useGetProfileData from "../../hooks/requests/useGetUserProfileData";
import EditUserForm from "../../components/Forms/EditUserForm/EditUserForm";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import style from "./Profile.module.css";
import EditUserCredentials from "../../components/Forms/EditUserCredentials/EditCredentialsForm";
const Profile = () => {
  const { data } = useGetProfileData();
  const { subroute } = useParams();
  return (
    <div className={style["profile-main"]}>
      {data && (
        <header className={style["profile-overview"]}>
          <h2>User-information</h2>
          <ul className={style["user-information__items"]}>
            <li className={style["user-information"]}>
              <div className={style["user-cover"]}>
                <img
                  className={style["user-avatar"]}
                  src="https://www.knjizare-vulkan.rs/nb-public/themes/nbshop5_v5_8/_static/images/core/user.png"
                ></img>
                <h3
                  className={style["user-name"]}
                >{`${data.name} ${data.last_name}`}</h3>
              </div>
            </li>
            <li>
              <div className={style["user-email"]}>
                <h4>
                  User email<br></br>
                  {data.email}
                </h4>
              </div>
            </li>
            <li>
              <div className={style["user-phone"]}>
                <h4>
                  Phone number<br></br>
                  {data.phone_number}
                </h4>
              </div>
            </li>
            <li>
              <div className={style["user-created__at"]}>
                <h4>
                  Created at:
                  <br></br>
                  {new Date(data.created_at).toLocaleDateString("en-GB", {
                    year: "numeric",
                    day: "2-digit",
                    month: "long",
                  })}
                </h4>
              </div>
            </li>
          </ul>
        </header>
      )}
      <section className={style["profile-section"]}>
        <aside>
          <nav className={style["profile-tabs"]}>
            <ul className={style["profile-tabs__links"]}>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active-link" : "";
                  }}
                  to={"/profile/general-information"}
                >
                  General information
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "active-link" : "";
                  }}
                  to={"/profile/edit-credentials"}
                >
                  Edit Credentials
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive, isPending }) => {
                    return isActive ? "active-link" : "";
                  }}
                  to={"/profile/orders"}
                >
                  Orders
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        {data && !subroute && (
          <EditUserForm
            email={data.email}
            last_name={data.last_name}
            name={data.name}
            phone_number={data.phone_number}
          />
        )}
        {data && subroute === "general-information" && (
          <EditUserForm
            email={data.email}
            last_name={data.last_name}
            name={data.name}
            phone_number={data.phone_number}
          />
        )}
        {data && subroute === "edit-credentials" && (
          <EditUserCredentials></EditUserCredentials>
        )}
      </section>
    </div>
  );
};

export default Profile;
