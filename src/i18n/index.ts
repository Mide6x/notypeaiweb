import { useState, useCallback, useEffect } from 'react';
import { translateText } from '../utils/translate';
import { useAuth } from '../components/Auth/useAuth';

interface Translations {
  [key: string]: string;
}

const translations: Record<string, Translations> = {
  ha: {
    accountSettings: "Saituttuka na Asusun",
    personalDetails: "Bayanin Sirri",
    preferences: "Zaɓuɓɓuka",
    currentPlan: "Tsarin Yanzu",
    displayName: "Suna na Nuna",
    emailAddress: "Adireshin Imel",
    uploadPicture: "Danna don ɗora hoton profile",
    voiceRecognition: "Gane Murya",
    darkMode: "Yanayin Duhu",
    notifications: "Sanarwa",
    editProfile: "Gyara Bayani",
    saveChanges: "Ajiye Canje-canje",
    cancel: "Soke",
    upgradeToPro: "Haɓaka zuwa Pro",
    aiSummarizer: "Mai Taƙaitawa na AI",
    grammarEditor: "Mai Gyaran Rubutu",
    localTranslator: "Mai Fassara na Gida",
    welcomeMessage: "Barka Mide! Me kake son yi yau?",
    aiSummarizerDesc: "Taƙaita rubutun dogon cikin sauri",
    grammarEditorDesc: "Gyara kuskuren rubutu da haɗi",
    localTranslatorDesc: "Fassara rubutu zuwa harsuna daban-daban"
  },
  yo: {
    accountSettings: "Ètò Àkáǹtì",
    personalDetails: "Alaye Àdáni",
    preferences: "Àwọn Àṣàyàn",
    currentPlan: "Ètò Lọ́wọ́lọ́wọ́",
    displayName: "Orúkọ Ìfihàn",
    emailAddress: "Àdírẹ́ẹ̀sì Ímeèlì",
    uploadPicture: "Tẹ láti gbé àwòrán profaìlì sókè",
    voiceRecognition: "Ìdámọ̀ Ohùn",
    darkMode: "Ipò Òkùnkùn",
    notifications: "Ìfitọ́nilétí",
    editProfile: "Ṣe Àtúnṣe Profaìlì",
    saveChanges: "Fi Àwọn Àyípadà Pamọ́",
    cancel: "Parẹ́",
    upgradeToPro: "Gbe sí Pro",
    aiSummarizer: "Aṣàkójọ AI",
    grammarEditor: "Olóòtú Gírámà",
    localTranslator: "Atúmọ̀ Àdúgbò",
    welcomeMessage: "Káàbọ̀ Mide! Kí ni o fẹ́ ṣe lónìí?",
    aiSummarizerDesc: "Ṣe àkójọ àwọn ọ̀rọ̀ gígùn ní kíákíá",
    grammarEditorDesc: "Ṣe àtúnṣe àṣìṣe gírámà àti ìṣọwọ́-ọ̀rọ̀",
    localTranslatorDesc: "Túmọ̀ ọ̀rọ̀ sí ọ̀pọ̀lọpọ̀ èdè"
  },
  ig: {
    accountSettings: "Ntọala Akaụntụ",
    personalDetails: "Nkọwa Onwe",
    preferences: "Nhọrọ",
    currentPlan: "Atụmatụ Ugbu a",
    displayName: "Aha Ngosi",
    emailAddress: "Adreesị Email",
    uploadPicture: "Pịa iji bulite foto profaịlụ",
    voiceRecognition: "Nghọta Olu",
    darkMode: "Ọnọdụ Ọchịchịrị",
    notifications: "Ọkwa",
    editProfile: "Dezie Profaịlụ",
    saveChanges: "Chekwaa Mgbanwe",
    cancel: "Kagbuo",
    upgradeToPro: "Bulite na Pro",
    aiSummarizer: "Nchịkọta AI",
    grammarEditor: "Ndezi Grammar",
    localTranslator: "Ntụgharị Asụsụ",
    welcomeMessage: "Nnọọ Mide! Kedu ihe ị chọrọ ime taa?",
    aiSummarizerDesc: "Chịkọta ederede ogologo ngwa ngwa",
    grammarEditorDesc: "Dozie njehie grammar na mkpụrụ okwu",
    localTranslatorDesc: "Tụgharịa ederede n'asụsụ dị iche iche"
  },
  zu: {
    accountSettings: "Izilungiselelo ze-Akhawunti",
    personalDetails: "Imininingwane Yomuntu",
    preferences: "Okuthandwayo",
    currentPlan: "Uhlelo Lwamanje",
    displayName: "Igama Lokubonisa",
    emailAddress: "Ikheli le-imeyili",
    uploadPicture: "Chofoza ukuze ulayishe isithombe sephrofayela",
    voiceRecognition: "Ukubona Izwi",
    darkMode: "Indlela Emnyama",
    notifications: "Izaziso",
    editProfile: "Hlela Iphrofayela",
    saveChanges: "Londoloza Izinguquko",
    cancel: "Khansela",
    upgradeToPro: "Thuthukela ku-Pro",
    aiSummarizer: "Umfinyezi we-AI",
    grammarEditor: "Umhleli Wegrama",
    localTranslator: "Umhumushi Wendawo",
    welcomeMessage: "Sawubona Mide! Ufuna ukwenzani namuhla?",
    aiSummarizerDesc: "Finyeza umbhalo omude ngokushesha",
    grammarEditorDesc: "Lungisa amaphutha egrama nokupela",
    localTranslatorDesc: "Humusha umbhalo ngezilimi eziningi"
  },
  fr: {
    accountSettings: "Paramètres du Compte",
    personalDetails: "Détails Personnels",
    preferences: "Préférences",
    currentPlan: "Plan Actuel",
    displayName: "Nom d'Affichage",
    emailAddress: "Adresse Email",
    uploadPicture: "Cliquez pour télécharger une photo de profil",
    voiceRecognition: "Reconnaissance Vocale",
    darkMode: "Mode Sombre",
    notifications: "Notifications",
    editProfile: "Modifier le Profil",
    saveChanges: "Enregistrer les Modifications",
    cancel: "Annuler",
    upgradeToPro: "Passer à Pro",
    aiSummarizer: "Résumeur IA",
    grammarEditor: "Éditeur de Grammaire",
    localTranslator: "Traducteur Local",
    welcomeMessage: "Bonjour Mide! Que voulez-vous faire aujourd'hui?",
    aiSummarizerDesc: "Résumez rapidement des textes longs",
    grammarEditorDesc: "Corrigez les erreurs de grammaire et d'orthographe",
    localTranslatorDesc: "Traduisez du texte en plusieurs langues"
  },
  ar: {
    accountSettings: "إعدادات الحساب",
    personalDetails: "التفاصيل الشخصية",
    preferences: "التفضيلات",
    currentPlan: "الخطة الحالية",
    displayName: "اسم العرض",
    emailAddress: "البريد الإلكتروني",
    uploadPicture: "انقر لتحميل صورة الملف الشخصي",
    voiceRecognition: "التعرف على الصوت",
    darkMode: "الوضع المظلم",
    notifications: "الإشعارات",
    editProfile: "تعديل الملف الشخصي",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    upgradeToPro: "الترقية إلى Pro",
    aiSummarizer: "ملخص الذكاء الاصطناعي",
    grammarEditor: "محرر القواعد",
    localTranslator: "المترجم المحلي",
    welcomeMessage: "مرحباً ميد! ماذا تريد أن تفعل اليوم؟",
    aiSummarizerDesc: "لخص النصوص الطويلة بسرعة",
    grammarEditorDesc: "صحح أخطاء القواعد والإملاء",
    localTranslatorDesc: "ترجم النص إلى لغات متعددة"
  },
  en: {
    accountSettings: "Account Settings",
    personalDetails: "Personal Details",
    preferences: "Preferences",
    currentPlan: "Current Plan",
    displayName: "Display Name",
    emailAddress: "Email Address",
    uploadPicture: "Click to upload profile picture",
    voiceRecognition: "Voice Recognition",
    darkMode: "Dark Mode",
    notifications: "Notifications",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    upgradeToPro: "Upgrade to Pro",
    aiSummarizer: "AI Summarizer",
    grammarEditor: "Grammar Editor",
    localTranslator: "Local Translator",
    welcomeMessage: "Hi Mide! What would you like to do today?",
    aiSummarizerDesc: "Summarize long texts quickly",
    grammarEditorDesc: "Fix grammar and spelling mistakes",
    localTranslatorDesc: "Translate text to multiple languages"
  },
};

export const useTranslation = () => {
  const { user } = useAuth();
  const [language, setLanguage] = useState<string>(user?.preferences?.language || "en");
  const [dynamicTranslations, setDynamicTranslations] = useState<Record<string, Record<string, string>>>({});
  const [loadedTranslations, setLoadedTranslations] = useState<Record<string, string>>({});

  // Initialize language from user preferences
  useEffect(() => {
    if (user?.preferences?.language) {
      setLanguage(user.preferences.language);
    }
  }, [user?.preferences?.language]);

  const getTextAsync = useCallback(async (key: string, defaultText?: string): Promise<string> => {
    // If we're in English, return the default text or key
    if (language === 'en') {
      return defaultText || translations.en[key] || key;
    }

    // Check if we have a predefined translation
    if (translations[language]?.[key]) {
      return translations[language][key];
    }

    // Check if we have a cached dynamic translation
    if (dynamicTranslations[language]?.[key]) {
      return dynamicTranslations[language][key];
    }

    // If no translation found, use OpenAI translation
    try {
      const textToTranslate = defaultText || translations.en[key] || key;
      const translatedText = await translateText(textToTranslate, language);
      
      // Cache the translation
      setDynamicTranslations(prev => ({
        ...prev,
        [language]: {
          ...(prev[language] || {}),
          [key]: translatedText
        }
      }));

      return translatedText;
    } catch (error) {
      console.error('Translation error:', error);
      return defaultText || translations.en[key] || key;
    }
  }, [language, dynamicTranslations]);

  const getText = useCallback((key: string, defaultText?: string): string => {
    if (language === 'en') {
      return defaultText || translations.en[key] || key;
    }

    return loadedTranslations[key] || 
           translations[language]?.[key] || 
           dynamicTranslations[language]?.[key] || 
           defaultText || 
           translations.en[key] || 
           key;
  }, [language, dynamicTranslations, loadedTranslations]);

  // Load translations for the current language
  useEffect(() => {
    const loadTranslations = async () => {
      const keys = Object.keys(translations.en);
      const newTranslations: Record<string, string> = {};

      await Promise.all(
        keys.map(async (key) => {
          try {
            const text = await getTextAsync(key);
            newTranslations[key] = text;
          } catch (error) {
            console.error(`Error loading translation for key ${key}:`, error);
            newTranslations[key] = translations.en[key] || key;
          }
        })
      );

      setLoadedTranslations(newTranslations);
    };

    if (language !== 'en') {
      loadTranslations();
    }
  }, [language, getTextAsync]);

  return {
    getText,
    getTextAsync,
    setLanguage,
    language,
  };
}; 