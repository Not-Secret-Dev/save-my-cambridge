import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const RedirectIfAuth = ({ children }) => {
  const user = useAuth();

  if (user && user.role) {
    const dashboardPath =
      user.role === "admin" ? "/admin/dashboard" : "/dashboard";
    console.log("Auth State:", user);
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default RedirectIfAuth;
