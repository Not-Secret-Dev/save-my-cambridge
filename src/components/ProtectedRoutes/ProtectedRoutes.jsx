import { Navigate } from "react-router-dom";
import NotFound from "../../pages/NotFound";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const user = localStorage.getItem("userRole");

  if (!user || !allowedRoles.includes(user)) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoutes;
