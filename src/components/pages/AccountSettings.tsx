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
import { usePreferences } from "../../hooks/usePreferences";
import {
  FiEdit2,
  FiCamera,
  FiMail,
  FiUser,
  FiCheck,
  FiGlobe,
  FiMoon,
  FiStar,
} from "react-icons/fi";
import Sidebar from "../Dashboard/Sidebar";
import { useTranslation } from "../../i18n";

interface ErrorResponse {
  message: string;
}

const languages = [
  { code: "ha", name: "Hausa" },
  { code: "yo", name: "Yorùbá" },
  { code: "ig", name: "Igbo" },
  { code: "zu", name: "Zulu" },
  { code: "fr", name: "French" },
  { code: "ar", name: "Arabic" },
  { code: "en", name: "English" },
];

const AccountSettings = () => {
  const { user, updateUser } = useAuth();
  const { preferences, updatePreferences } = usePreferences();
  const { getText, setLanguage } = useTranslation();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleLanguageChange = async (newLanguage: string) => {
    try {
      await updatePreferences({ language: newLanguage });
      setLanguage(newLanguage);
      toast({
        title: "Language updated",
        status: "success",
        duration: 3000,
      });
    } catch {
      toast({
        title: "Failed to update language",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleThemeChange = async (isDark: boolean) => {
    try {
      await updatePreferences({ theme: isDark ? "dark" : "light" });
      toast({
        title: "Theme updated",
        status: "success",
        duration: 3000,
      });
    } catch {
      toast({
        title: "Failed to update theme",
        status: "error",
        duration: 3000,
      });
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/update-profile`,
        {
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
      if (response.data) {
        updateUser(response.data);
      }
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
      });
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast({
        title: "Error updating profile",
        description: err.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          <Box>
            <Sidebar />
          </Box>
          <Box gridColumn={{ base: "1", md: "2 / span 3" }}>
            <VStack spacing={8} align="stretch">
              {/* Personal Details Section */}
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">{getText("personalDetails")}</Heading>
                </CardHeader>
                <CardBody>
                  <VStack spacing={6} align="stretch">
                    <HStack spacing={6}>
                      <Box position="relative">
                        {isLoading ? (
                          <SkeletonCircle size="100px" />
                        ) : (
                          <Avatar
                            size="xl"
                            src={user?.picture}
                            name={user?.name}
                          />
                        )}
                        <Tooltip label="Upload new picture">
                          <IconButton
                            aria-label="Upload picture"
                            icon={<Icon as={FiCamera} />}
                            size="sm"
                            colorScheme="purple"
                            position="absolute"
                            bottom="0"
                            right="0"
                            onClick={() => fileInputRef.current?.click()}
                          />
                        </Tooltip>
                        <Input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          display="none"
                        />
                      </Box>
                      <VStack align="stretch" flex="1">
                        <FormControl>
                          <FormLabel>{getText("displayName")}</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <Icon as={FiUser} color="gray.500" />
                            </InputLeftElement>
                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              disabled={!isEditing}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl>
                          <FormLabel>{getText("emailAddress")}</FormLabel>
                          <InputGroup>
                            <InputLeftElement>
                              <Icon as={FiMail} color="gray.500" />
                            </InputLeftElement>
                            <Input value={user?.email} isReadOnly />
                          </InputGroup>
                        </FormControl>
                      </VStack>
                    </HStack>
                    <HStack justify="flex-end" spacing={4}>
                      {isEditing ? (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => setIsEditing(false)}
                          >
                            {getText("cancel")}
                          </Button>
                          <Button
                            colorScheme="purple"
                            leftIcon={<Icon as={FiCheck} />}
                            onClick={handleSave}
                            isLoading={isLoading}
                          >
                            {getText("saveChanges")}
                          </Button>
                        </>
                      ) : (
                        <Button
                          leftIcon={<Icon as={FiEdit2} />}
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
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">{getText("preferences")}</Heading>
                </CardHeader>
                <CardBody>
                  <List spacing={4}>
                    <ListItem>
                      <HStack justify="space-between">
                        <HStack>
                          <ListIcon as={FiGlobe} color="purple.500" />
                          <Text>Language</Text>
                        </HStack>
                        <Select
                          value={preferences?.language || "en"}
                          onChange={(e) => handleLanguageChange(e.target.value)}
                          width="200px"
                        >
                          {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                              {lang.name}
                            </option>
                          ))}
                        </Select>
                      </HStack>
                    </ListItem>
                    <ListItem>
                      <HStack justify="space-between">
                        <HStack>
                          <ListIcon as={FiMoon} color="purple.500" />
                          <Text>{getText("darkMode")}</Text>
                        </HStack>
                        <Switch
                          isChecked={preferences?.theme === "dark"}
                          onChange={(e) => handleThemeChange(e.target.checked)}
                          colorScheme="purple"
                        />
                      </HStack>
                    </ListItem>
                  </List>
                </CardBody>
              </Card>

              {/* Current Plan Section */}
              <Card bg={bgColor} borderWidth="1px" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md">{getText("currentPlan")}</Heading>
                </CardHeader>
                <CardBody>
                  <HStack justify="space-between">
                    <VStack align="start" spacing={2}>
                      <HStack>
                        <Text fontSize="lg" fontWeight="bold">
                          Free Plan
                        </Text>
                        <Badge colorScheme="purple">Current</Badge>
                      </HStack>
                      <Text color="gray.500">
                        Basic features and functionality
                      </Text>
                    </VStack>
                    <Button
                      colorScheme="purple"
                      variant="outline"
                      leftIcon={<Icon as={FiStar} />}
                    >
                      {getText("upgradeToPro")}
                    </Button>
                  </HStack>
                </CardBody>
              </Card>
            </VStack>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default AccountSettings;
