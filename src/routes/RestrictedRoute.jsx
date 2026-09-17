import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RestrictedRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? <Navigate to="/recommended" replace /> : children;
}
