import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${apiUrl}/auth/user`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        toast({
          title: "Authentication Error",
          description: "Please log in to access this page",
          status: "error",
          duration: 3000,
        });
      }
    };

    checkAuth();
  }, [apiUrl, toast]);

  if (isAuthenticated === null) {
    return null; // or a loading spinner
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;