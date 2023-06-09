import { Outlet, Navigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { authenticationSelector } from "../../redux/authentication/authenticationSlice";
import { Role } from "../../redux/authentication/authenticationSlice";
type ProtectedRouteProps = {
  isAuthenticated: boolean;
  role?: Role[];
};
const ProtectedRoute = ({ isAuthenticated, role }: ProtectedRouteProps) => {
  const location = useLocation();
  const authentication = useSelector(authenticationSelector);
  if (isAuthenticated && !authentication.isAuthenticated) {
    return (
      <Navigate to={"/login"} state={{ from: location }} replace></Navigate>
    );
  }
  if (role) {
    if (!authentication.role || !role.includes(authentication.role as Role)) {
      return (
        <Navigate
          to={"/forbidden"}
          state={{ from: location }}
          replace
        ></Navigate>
      );
    }
  }
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
