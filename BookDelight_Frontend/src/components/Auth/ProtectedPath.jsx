import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./SessionHandling";

const ProtectedPath = ({ children }) => {
    const { authData } = useAuth();

    if (!authData) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedPath;
