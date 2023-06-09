import React, { ReactNode, useEffect, useState } from "react";
import useRefreshToken from "../axios/useRefreshToken";
type Props = {
  children: ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const [checkedStatus, setCheckedStatus] = useState(false);
  const refreshToken = useRefreshToken();
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.log(`auth status expired`);
      } finally {
        setCheckedStatus(true);
      }
    };
    fetchAuthStatus();
  }, []);
  return <>{checkedStatus && children}</>;
};

export default AuthProvider;
