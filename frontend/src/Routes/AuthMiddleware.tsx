import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthCheckProps {
  children: JSX.Element;
}

const AuthMiddleware = ({ children }: AuthCheckProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/user/check-auth");
        setIsAuthenticated(response.data.isAuthenticated);

      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthMiddleware;
