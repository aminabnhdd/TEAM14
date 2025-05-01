import { Navigate } from "react-router-dom";
import AuthContext from "../helpers/AuthContext";
import { useContext } from "react";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const {authState} = useContext(AuthContext);

  if (!allowedRoles.includes(authState.role)) return <Navigate to="/forbidden" />;

  return children;
};

export default ProtectedRoute;