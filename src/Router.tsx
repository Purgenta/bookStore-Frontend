import { lazy, Suspense } from "react";
import { useEffect } from "react";
import useRefreshToken from "./axios/useRefreshToken";
import { Route, Routes } from "react-router-dom";
import { Role } from "./redux/authentication/authenticationSlice";
const ProtectedRoute = lazy(() => {
  return import("./components/ProtectedRoute/ProtectedRoute");
});
const Register = lazy(() => {
  return import("./routes/Register/Register");
});
const Profile = lazy(() => {
  return import("./routes/Profile/Profile");
});
const Login = lazy(() => {
  return import("./routes/Login/Login");
});
const Home = lazy(() => {
  return import("./routes/Home/Home");
});
const Product = lazy(() => {
  return import("./routes/Product/Product");
});
const Cart = lazy(() => {
  return import("./routes/Cart/Cart");
});
const Search = lazy(() => {
  return import("./routes/Search/Search");
});
const Router = () => {
  const refresh = useRefreshToken();
  useEffect(() => {
    const attemptLogin = async () => {
      try {
        await refresh();
      } catch (error) {}
    };
    attemptLogin();
  }, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/forbidden"></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated
              role={["USER"] as unknown as Role[]}
            ></ProtectedRoute>
          }
        >
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/profile/:subroute" element={<Profile />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order/:id"></Route>
        </Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
