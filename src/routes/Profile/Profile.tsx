import useGetProfileData from "../../hooks/requests/user/useGetUserProfileData";
import EditUserForm from "../../components/Forms/EditUserForm/EditUserForm";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import style from "./Profile.module.css";
import EditUserCredentials from "../../components/Forms/EditUserCredentials/EditCredentialsForm";
import Layout from "./Layout";
const Profile = () => {
  const { data, mutate } = useGetProfileData();
  const { subroute } = useParams();
  return (
    <div className={style["profile-main"]}>
      {data && (
        <Layout
          created_at={data.created_at}
          email={data.email}
          phone_number={data.phone_number}
          last_name={data.last_name}
          name={data.name}
        ></Layout>
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
                  className={({ isActive }) => {
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
        {data && (subroute === "general-information" || !subroute) && (
          <EditUserForm
            onSuccess={() => mutate()}
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
