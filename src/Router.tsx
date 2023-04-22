import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Role } from "./redux/authentication/authenticationSlice";
const ProtectedRoute = lazy(() => {
  return import("./components/ProtectedRoute/ProtectedRoute");
});
const Register = lazy(() => {
  return import("./routes/Register/Register");
});
const Login = lazy(() => {
  return import("./routes/Login/Login");
});
const Home = lazy(() => {
  return import("./routes/Home/Home");
});
const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/forbidden"></Route>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated
              role={["USER"] as unknown as Role[]}
            ></ProtectedRoute>
          }
        ></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
