import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = () => {
    const { isAuthenticated, isLoadingUserData } = useAppContext()

  if (isLoadingUserData) return <div>Loading...</div>; 

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute