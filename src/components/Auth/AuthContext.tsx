import { useState, useEffect, ReactNode, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { User } from "./types";
import { AuthContext } from "./context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
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
