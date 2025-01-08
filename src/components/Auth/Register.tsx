import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Link,
  Flex,
  Image,
  InputGroup,
  InputRightElement,
  IconButton,
  useColorModeValue,
  Heading,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "./useAuth";
import { useTranslation } from "../../i18n";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();
  const { getText } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // Handle password mismatch
      return;
    }
    try {
      await register(email, password, `${firstName} ${lastName}`);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <Flex minH="100vh">
      {/* Left side - Image and Logo */}
      <Box
        display={{ base: "none", md: "flex" }}
        flex="1"
        bg="gray.900"
        position="relative"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/ai-background.jpg"
          alt="AI Background"
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          objectFit="cover"
          opacity={0.6}
        />
        <Image
          src="/logo.png"
          alt="Notype AI Logo"
          width="200px"
          position="relative"
          zIndex={1}
          mb={4}
        />
      </Box>

      {/* Right side - Registration Form */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.900")}
        p={8}
      >
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6} w="full">
          <Stack align="center">
            <Heading fontSize="4xl">{getText("createAccount")}</Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="lg"
            p={8}
            w="full"
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Flex gap={4}>
                  <FormControl id="firstName">
                    <FormLabel>{getText("firstName")}</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder={getText("enterFirstName")}
                    />
                  </FormControl>
                  <FormControl id="lastName">
                    <FormLabel>{getText("lastName")}</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder={getText("enterLastName")}
                    />
                  </FormControl>
                </Flex>
                <FormControl id="email">
                  <FormLabel>{getText("email")}</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={getText("enterEmail")}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>{getText("password")}</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={getText("enterPassword")}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="confirmPassword">
                  <FormLabel>{getText("confirmPassword")}</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={getText("confirmPassword")}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={
                          showConfirmPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Stack spacing={4}>
                    <Checkbox>{getText("agreeToTerms")}</Checkbox>
                    <Checkbox>{getText("receiveUpdates")}</Checkbox>
                  </Stack>
                  <Button
                    type="submit"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    {getText("createAccount")}
                  </Button>
                  <Button w="full" variant="outline" leftIcon={<FcGoogle />}>
                    {getText("signUpWithGoogle")}
                  </Button>
                </Stack>
              </Stack>
            </form>
            <Text align="center" mt={6}>
              {getText("alreadyHaveAccount")}{" "}
              <Link as={RouterLink} to="/login" color="blue.500">
                {getText("loginHere")}
              </Link>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Register;
