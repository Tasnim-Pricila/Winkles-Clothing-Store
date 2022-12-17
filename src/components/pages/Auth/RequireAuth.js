
import { Navigate, useLocation } from "react-router-dom";
import useUsers from "../../../Custom Hook/useUsers";


const RequireAuth = ({ children }) => {
     const [ user ] = useUsers();
    const location = useLocation();
    const token = localStorage.getItem('accessToken');

        if (user?.email || token) {
            // console.log(user)
            return children;
        }
        else {
            return <Navigate to='/login' state={{ from: location }} replace />
        }
}

export default RequireAuth;