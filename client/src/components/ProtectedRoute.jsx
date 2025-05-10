// This component restricts access to certain routes based on user role.
// If the user's role is not in allowedRoles, they are redirected to the "forbidden" page.

import { Navigate } from "react-router-dom";
import AuthContext from "../helpers/AuthContext";
import { useContext } from "react";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const {authState} = useContext(AuthContext);

  if (!allowedRoles.includes(authState.role)) return <Navigate to="/forbidden" />;

  return children;
};

export default ProtectedRoute;