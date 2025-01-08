import {
  Box,
  Button,
  Checkbox,
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
  useToast,
} from "@chakra-ui/react";
import { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "./useAuth";
import { AxiosError } from "axios";
import aiBackground from "../../assets/ai-background.jpg";
import logo from "../../assets/Group 14.png";
import { preloadImages } from "../../utils/imagePreloader";

interface ErrorResponse {
  message: string;
  errors?: Array<{ msg: string }>;
}

const Login = () => {
  const inputBg = useColorModeValue("gray.50", "gray.700");
  const inputBorder = useColorModeValue("gray.300", "gray.600");
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const imagesToPreload = [aiBackground, logo];
    preloadImages(imagesToPreload).catch((error) => {
      console.error("Failed to preload images:", error);
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          toast({
            title: "Error",
            description: "Passwords do not match",
            status: "error",
            duration: 3000,
          });
          return;
        }
        if (!agreeToTerms) {
          toast({
            title: "Error",
            description: "Please agree to the Terms of Service",
            status: "error",
            duration: 3000,
          });
          return;
        }
        await register(email, password, firstName);
      }
      navigate("/dashboard");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      const errorMessage =
        error.response?.data?.message ||
        (isLogin ? "Login failed" : "Registration failed");
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "/auth/google";
  };

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  const formFields = isLogin ? (
    <Stack spacing={4}>
      <FormControl id="email" isInvalid={email !== "" && !validateEmail(email)}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          bg={inputBg}
          borderColor={inputBorder}
          _hover={{ borderColor: "purple.400" }}
          _focus={{
            borderColor: "purple.500",
            boxShadow: "0 0 0 1px purple.500",
          }}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: "purple.400" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
          />
          <InputRightElement h="full">
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              icon={showPassword ? <FiEyeOff /> : <FiEye />}
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Stack>
  ) : (
    <Stack spacing={4}>
      <Flex gap={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your name"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: "purple.400" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
          />
        </FormControl>
        <FormControl
          id="registerEmail"
          isRequired
          isInvalid={email !== "" && !validateEmail(email)}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: "purple.400" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
          />
        </FormControl>
      </Flex>
      <FormControl id="registerPassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: "purple.400" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
          />
          <InputRightElement h="full">
            <IconButton
              aria-label={showPassword ? "Hide password" : "Show password"}
              icon={showPassword ? <FiEyeOff /> : <FiEye />}
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="registerPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            bg={inputBg}
            borderColor={inputBorder}
            _hover={{ borderColor: "purple.400" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 1px purple.500",
            }}
          />
          <InputRightElement h="full">
            <IconButton
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              icon={showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              variant="ghost"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={2}>
        <Checkbox
          colorScheme="purple"
          isChecked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
        >
          I agree to Notype.ai's{" "}
          <Link href="/terms" isExternal color="purple.500">
            Terms of Service
          </Link>
        </Checkbox>
        <Checkbox
          colorScheme="purple"
          isChecked={subscribeNewsletter}
          onChange={(e) => setSubscribeNewsletter(e.target.checked)}
        >
          I wish to receive Notype.ai news and offers on my email
        </Checkbox>
      </Stack>
    </Stack>
  );

  return (
    <Flex minH="100vh">
      <Box
        display={{ base: "none", md: "flex" }}
        flex="1"
        position="relative"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        bgGradient="linear(to-b, purple.900, purple.700, purple.500)"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient="radial(circle at center, rgba(159, 122, 234, 0.2) 0%, transparent 70%)"
          animation="pulse 8s infinite"
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.1}
          backgroundImage="url('/assets/grid-pattern.png')"
          backgroundSize="30px 30px"
          backgroundRepeat="repeat"
          mixBlendMode="overlay"
        />

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.4}
          backgroundImage={`url(${aiBackground})`}
          backgroundSize="cover"
        />

        <Image
          src={logo}
          alt="Logo"
          width="200px"
          position="relative"
          zIndex={1}
          mb={4}
          filter="drop-shadow(0 0 20px rgba(255,255,255,0.3))"
        />

        <Text
          color="white"
          fontSize="xl"
          textAlign="center"
          maxW="80%"
          position="relative"
          zIndex={1}
          mt={4}
          fontWeight="bold"
          letterSpacing="wide"
        >
          <Link href="/" color="white" fontSize="xl" fontWeight="bold">
            <Heading>Notype.ai</Heading>
          </Link>
          <span>
            Experience the future of typing with our AI-powered voice
            recognition. Type with your voice anywhere on the web, seamlessly
            and accurately.
          </span>
        </Text>
      </Box>

      <Flex
        flex="1"
        align="center"
        justify="center"
        bg={useColorModeValue("gray.50", "gray.900")}
        p={8}
      >
        <Stack spacing={8} mx="auto" w="full" maxW="md">
          <Stack align="center" spacing={6}>
            <Heading fontSize="4xl">
              <Text
                as="span"
                bgGradient="linear(to-r, purple.400, purple.600)"
                bgClip="text"
              >
                Hello, there!
              </Text>{" "}
              <Text as="span" color="inherit">
                👋
              </Text>
            </Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.800")}
            p={8}
            w="full"
            boxShadow="lg"
          >
            <form onSubmit={handleSubmit}>
              {formFields}
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                  pt={2}
                >
                  <Link color="purple.500">Forgot Password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg="purple.500"
                  color="white"
                  size="lg"
                  _hover={{
                    bg: "purple.600",
                  }}
                  isLoading={isLoading}
                  isDisabled={!isFormValid}
                >
                  {isLogin ? "Log in" : "Register"}
                </Button>
                <Button
                  w="full"
                  size="lg"
                  variant="outline"
                  leftIcon={<FcGoogle />}
                  borderColor="purple.500"
                  color="purple.500"
                  _hover={{
                    bg: "purple.50",
                  }}
                  onClick={handleGoogleLogin}
                >
                  Sign in/up with Google
                </Button>
              </Stack>
            </form>
            <Text align="center" mt={6}>
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <Button
                variant="link"
                color="purple.500"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Register" : "Login"}
              </Button>
            </Text>
          </Box>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Login;
