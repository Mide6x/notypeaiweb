import { useCallback } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { useAuth } from '../components/Auth/useAuth';
import axios from 'axios';

export const usePreferences = () => {
  const { user, updateUser } = useAuth();
  const { setColorMode } = useColorMode();
  const apiUrl = import.meta.env.VITE_API_URL;

  const updatePreferences = useCallback(async (preferences: { language?: string; theme?: 'light' | 'dark' }) => {
    try {
      const response = await axios.put(`${apiUrl}/auth/update-profile`, {
        preferences: {
          ...user?.preferences,
          ...preferences,
        },
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.data) {
        // Update the user data in context
        updateUser(response.data);

        // Update theme if it was changed
        if (preferences.theme) {
          setColorMode(preferences.theme);
          localStorage.setItem('chakra-ui-color-mode', preferences.theme);
        }

        // Update language if it was changed
        if (preferences.language) {
          localStorage.setItem('app-language', preferences.language);
        }
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      throw error;
    }
  }, [user?.preferences, updateUser, setColorMode, apiUrl]);

  return {
    preferences: user?.preferences,
    updatePreferences,
  };
}; 