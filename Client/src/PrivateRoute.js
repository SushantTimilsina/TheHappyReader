import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {
  const { children } = props;

  const isLoggedIn = localStorage.getItem("user");

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
