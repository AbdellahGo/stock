import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const PublicRoute = () => {
    const { isAuthenticated, isLoadingUserData } = useAppContext()

    if (isLoadingUserData) return <div>Loading...</div>;

    return !isAuthenticated ? <Outlet /> : <Navigate to="/products" replace />;
}

export default PublicRoute