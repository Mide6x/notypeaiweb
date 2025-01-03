import { useState, useEffect, ReactNode, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { User } from "./types";
import { AuthContext } from "./context";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Add custom axios instance with specific config for auth requests
const authAxios = axios.create({
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const checkAuth = useCallback(async () => {
    try {
      const response = await authAxios.get(`${apiUrl}/auth/user`);
      if (response.data && response.data.id) {
        setUser(response.data);
      } else {
        setUser(null);
      }
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
    const response = await authAxios.post(`${apiUrl}/auth/login`, {
      email,
      password,
    });
    if (response.data && response.data.user) {
      setUser(response.data.user);
      // Force a page reload after successful login
      window.location.reload();
    }
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await authAxios.post(`${apiUrl}/auth/register`, {
      email,
      password,
      name,
    });
    if (response.data && response.data.user) {
      setUser(response.data.user);
      // Force a page reload after successful registration
      window.location.reload();
    }
  };

  const logout = async () => {
    await authAxios.post(`${apiUrl}/auth/logout`);
    setUser(null);
    // Force a page reload after logout
    window.location.reload();
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
