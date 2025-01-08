import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const translateText = async (text: string, targetLanguage: string): Promise<string> => {
  try {
    if (!text) return '';
    
    const response = await axios.post(
      `${API_URL}/translate`,
      {
        text,
        targetLanguage
      },
      {
        withCredentials: true
      }
    );

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
}; 