import React from "react";
import style from "./Layout.module.css";
import { Genre } from "../../types/product";
import useGetAllGenres from "../../hooks/requests/genres/useGetAllGenres";
import useUpdatePrefferences from "../../hooks/requests/user/useUpdatePrefferences";
import { KeyedMutator } from "swr";
type Props = {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  created_at: Date;
  prefferences?: Prefferences | null;
  mutate: KeyedMutator<any>;
};
type Prefferences = {
  genre: {
    id: number;
    name: string;
  };
};
const Layout = ({
  name,
  last_name,
  email,
  created_at,
  phone_number,
  prefferences,
  mutate,
}: Props) => {
  const { data } = useGetAllGenres();
  const setPrefferences = useUpdatePrefferences();
  return (
    <header className={style["profile-overview"]}>
      <h2>User-information</h2>
      <ul className={style["user-information__items"]}>
        <li className={style["user-information"]}>
          <div className={style["user-cover"]}>
            <img
              alt="user"
              className={style["user-avatar"]}
              src="https://www.knjizare-vulkan.rs/nb-public/themes/nbshop5_v5_8/_static/images/core/user.png"
            ></img>
            <h3 className={style["user-name"]}>{`${name} ${last_name}`}</h3>
          </div>
        </li>
        <li className={style["user-email"]}>
          <div>
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
        <li>
          <div className={style["preferences"]}>
            <h4>Favourite genre</h4>
            {data && (
              <select
                value={prefferences?.genre.id || undefined}
                onChange={async (event) => {
                  if (event.target.value !== "Pick a category") {
                    await setPrefferences(+event.target.value);
                    mutate();
                  }
                }}
                placeholder="Add a favourite Category"
              >
                <option>Pick a category</option>
                {data.map((genre) => {
                  return (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Layout;
