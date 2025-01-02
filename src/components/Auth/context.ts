import { createContext } from 'react';
import { AuthContextType, defaultAuthContext } from './types';

export const AuthContext = createContext<AuthContextType>(defaultAuthContext); 