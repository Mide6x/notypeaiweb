export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark';
}

export interface User {
  _id: string;
  email: string;
  name: string;
  picture: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  updateUser: (user: User) => void;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => Promise<void>;
}

export const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  updateUser: () => {},
  login: async () => {
    throw new Error('Not implemented');
  },
  register: async () => {
    throw new Error('Not implemented');
  },
  logout: async () => {
    throw new Error('Not implemented');
  },
}; 