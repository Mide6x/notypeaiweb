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