import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useContext,
} from "react";
import axios, { AxiosError } from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Export the context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  updateUser: () => {},
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/user`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err: unknown) {
      const error = err as AxiosError;
      console.error("Auth check failed:", error.message);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      `${apiUrl}/auth/login`,
      { email, password },
      { withCredentials: true }
    );
    setUser(response.data.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await axios.post(
      `${apiUrl}/auth/register`,
      { email, password, name },
      { withCredentials: true }
    );
    setUser(response.data.user);
  };

  const logout = async () => {
    await axios.post(`${apiUrl}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    updateUser,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the hook directly from AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
