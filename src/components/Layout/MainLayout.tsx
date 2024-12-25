import { Box } from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

interface User {
  name: string;
  picture: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/user`, {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
        setUser(undefined);
      }
    };

    if (apiUrl) {
      checkAuth();
    }
  }, [apiUrl]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${apiUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthenticated(false);
      setUser(undefined);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setIsAuthenticated(false);
      setUser(undefined);
      navigate("/login");
    }
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <Box flex="1">{children}</Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
