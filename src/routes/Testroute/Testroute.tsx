import React, { useState, useEffect } from "react";
import useAuthenticetedAxios from "../../axios/useAuthenticatedAxios";
import { useCallback } from "react";
type GreetResponse = {
  greet: string;
  user: number;
};
const Testroute = () => {
  const [data, setData] = useState<null | GreetResponse>(null);
  const axios = useAuthenticetedAxios();
  const getGreetMessage = useCallback(() => {
    const request = async () => {
      try {
        const response = await axios.get("account/protectedRoute");
        setData(response.data as GreetResponse);
      } catch (error) {}
    };
    request();
  }, []);
  const buttonHandler = () => {
    getGreetMessage();
  };
  return (
    <>
      <div>Test route {data && `${data.greet} ${data.user}`}</div>
      <button onClick={buttonHandler}>Some button</button>
    </>
  );
};

export default Testroute;
