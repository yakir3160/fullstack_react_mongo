import { useAuthStore } from "../store/authStore";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
   
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (isAuthenticated()) {
        return <Navigate to="/standings" replace />;
    }

    return children;
};
export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuthStore();

    if (isLoading) {
        return <div>Loading...</div>; 
    }

    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return children;
};
