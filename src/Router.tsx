import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Role } from "./redux/authentication/authenticationSlice";
const ProtectedRoute = lazy(() => {
  return import("./components/ProtectedRoute/ProtectedRoute");
});
const Testroute = lazy(() => {
  return import("./routes/Testroute/Testroute");
});
const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login"></Route>
        <Route path="/register"></Route>
        <Route path="/forbidden"></Route>
        <Route
          element={
            <ProtectedRoute
              isAuthenticated
              role={["USER"] as unknown as Role[]}
            ></ProtectedRoute>
          }
        >
          <Route path="/test" element={<Testroute></Testroute>}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
