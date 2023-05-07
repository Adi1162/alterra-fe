import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const user = localStorage.getItem("user");
  return isLoggedIn && user ? children : <Navigate to={"/login"} />;
};

export default PrivateRoutes;
