import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const user = useSelector((state) => state.allUsers.user);
  const location = useLocation();
  const token = localStorage.getItem("accessToken");

  if (user?.email || token) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequireAuth;
