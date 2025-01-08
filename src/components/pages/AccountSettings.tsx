import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  HStack,
  Avatar,
  Skeleton,
  SkeletonCircle,
  IconButton,
  useColorModeValue,
  Tooltip,
  InputGroup,
  InputLeftElement,
  Icon,
  Switch,
  Badge,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListIcon,
  Select,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../Auth/useAuth";
import {
  FiEdit2,
  FiCamera,
  FiMail,
  FiUser,
  FiCheck,
  FiGlobe,
  FiVolume2,
  FiMoon,
  FiBell,
  FiStar,
} from "react-icons/fi";

interface ErrorResponse {
  message: string;
}

interface UserPreferences {
  language: string;
  voiceEnabled: boolean;
  darkMode: boolean;
  notifications: boolean;
}

const languages = [
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" },
  { code: "zu", name: "Zulu" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
];

// Translations for UI text
const translations: Record<string, Record<string, string>> = {
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
  },
};

const AccountSettings = () => {
  const { user, updateUser, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>({
    language: "en",
    voiceEnabled: true,
    darkMode: false,
    notifications: true,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const accentColor = "purple.500";

  // Get text based on current language
  const getText = (key: keyof typeof translations.en) => {
    return translations[preferences.language]?.[key] || translations.en[key];
  };

  // Get default name from email
  const getDefaultName = (email: string) => {
    return email.split("@")[0];
  };

  useEffect(() => {
    if (user?.email) {
      setName(user.name || getDefaultName(user.email));
    }
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          status: "error",
          duration: 3000,
        });
        return;
      }

      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await axios.put(
        `${apiUrl}/auth/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      updateUser(response.data.user);
      setIsEditing(false);
      setAvatarFile(null);
      setAvatarPreview(null);

      toast({
        title: "Success",
        description: "Profile updated successfully",
        status: "success",
        duration: 3000,
      });
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to update profile",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLanguage = event.target.value;
    setPreferences((prev) => ({
      ...prev,
      language: newLanguage,
    }));
    // Here you could also save the language preference to the backend
  };

  const handlePreferenceChange = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (isLoading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Skeleton height="40px" width="200px" />
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box p={6} borderWidth="1px" borderRadius="lg">
              <VStack align="stretch" spacing={6}>
                <Skeleton height="24px" width="150px" />
                <HStack spacing={4}>
                  <SkeletonCircle size="96px" />
                  <VStack align="start" spacing={1} flex="1">
                    <Skeleton height="24px" width="200px" />
                    <Skeleton height="20px" width="150px" />
                  </VStack>
                </HStack>
              </VStack>
            </Box>
            <Skeleton height="300px" />
          </SimpleGrid>
        </VStack>
      </Container>
    );
  }

  const displayName =
    user?.name || (user?.email ? getDefaultName(user.email) : "User");

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">{getText("accountSettings")}</Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          {/* Personal Details Section */}
          <Card
            bg={bgColor}
            borderColor={borderColor}
            boxShadow="sm"
            transition="all 0.2s"
            _hover={{ boxShadow: "md" }}
          >
            <CardHeader>
              <Heading size="md">{getText("personalDetails")}</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                {/* Avatar Section */}
                <VStack spacing={4} align="center">
                  <Box position="relative">
                    <Avatar
                      size="2xl"
                      src={avatarPreview || user?.picture}
                      name={displayName}
                      cursor="pointer"
                      onClick={handleAvatarClick}
                    />
                    <Tooltip label={getText("uploadPicture")} placement="top">
                      <IconButton
                        aria-label={getText("uploadPicture")}
                        icon={<FiCamera />}
                        size="sm"
                        colorScheme="purple"
                        position="absolute"
                        bottom="0"
                        right="0"
                        rounded="full"
                        onClick={handleAvatarClick}
                      />
                    </Tooltip>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </Box>
                  <Text fontSize="sm" color="gray.500">
                    {getText("uploadPicture")}
                  </Text>
                </VStack>

                {/* User Details Form */}
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel>{getText("displayName")}</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiUser} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={displayName}
                        isReadOnly={!isEditing}
                        bg={isEditing ? "transparent" : "gray.50"}
                        _hover={{ bg: isEditing ? hoverBg : "gray.50" }}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel>{getText("emailAddress")}</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <Icon as={FiMail} color="gray.500" />
                      </InputLeftElement>
                      <Input
                        value={user?.email || ""}
                        isReadOnly
                        bg="gray.50"
                        _hover={{ bg: "gray.50" }}
                      />
                    </InputGroup>
                  </FormControl>
                </VStack>

                {/* Action Buttons */}
                <HStack justify="flex-end" spacing={4}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsEditing(false);
                          setName(displayName);
                          setAvatarPreview(null);
                          setAvatarFile(null);
                        }}
                      >
                        {getText("cancel")}
                      </Button>
                      <Button
                        colorScheme="purple"
                        leftIcon={<FiEdit2 />}
                        onClick={handleUpdateProfile}
                      >
                        {getText("saveChanges")}
                      </Button>
                    </>
                  ) : (
                    <Button
                      colorScheme="purple"
                      variant="outline"
                      leftIcon={<FiEdit2 />}
                      onClick={() => setIsEditing(true)}
                    >
                      {getText("editProfile")}
                    </Button>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Preferences Section */}
          <VStack spacing={6} align="stretch">
            <Card
              bg={bgColor}
              borderColor={borderColor}
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ boxShadow: "md" }}
            >
              <CardHeader>
                <Heading size="md">{getText("preferences")}</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <FormControl>
                    <HStack justify="space-between">
                      <HStack>
                        <Icon as={FiGlobe} color={accentColor} />
                        <Text>Language</Text>
                      </HStack>
                      <Select
                        value={preferences.language}
                        onChange={handleLanguageChange}
                        width="auto"
                        variant="filled"
                      >
                        <option value="en">English</option>
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </Select>
                    </HStack>
                  </FormControl>
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiVolume2} color={accentColor} />
                      <Text>{getText("voiceRecognition")}</Text>
                    </HStack>
                    <Switch
                      colorScheme="purple"
                      isChecked={preferences.voiceEnabled}
                      onChange={() => handlePreferenceChange("voiceEnabled")}
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiMoon} color={accentColor} />
                      <Text>{getText("darkMode")}</Text>
                    </HStack>
                    <Switch
                      colorScheme="purple"
                      isChecked={preferences.darkMode}
                      onChange={() => handlePreferenceChange("darkMode")}
                    />
                  </HStack>
                  <HStack justify="space-between">
                    <HStack>
                      <Icon as={FiBell} color={accentColor} />
                      <Text>{getText("notifications")}</Text>
                    </HStack>
                    <Switch
                      colorScheme="purple"
                      isChecked={preferences.notifications}
                      onChange={() => handlePreferenceChange("notifications")}
                    />
                  </HStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Current Plan Section */}
            <Card
              bg={bgColor}
              borderColor={borderColor}
              boxShadow="sm"
              transition="all 0.2s"
              _hover={{ boxShadow: "md" }}
            >
              <CardHeader>
                <HStack justify="space-between">
                  <Heading size="md">{getText("currentPlan")}</Heading>
                  <Badge colorScheme="purple" fontSize="0.8em" px={2} py={1}>
                    Free
                  </Badge>
                </HStack>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={FiCheck} color={accentColor} />
                      Basic text summarization
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FiCheck} color={accentColor} />
                      Grammar checking (limited)
                    </ListItem>
                    <ListItem>
                      <ListIcon as={FiCheck} color={accentColor} />
                      Translation (2 languages)
                    </ListItem>
                  </List>
                  <Button
                    leftIcon={<FiStar />}
                    colorScheme="purple"
                    variant="outline"
                    size="lg"
                    w="100%"
                  >
                    {getText("upgradeToPro")}
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </VStack>
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default AccountSettings;
