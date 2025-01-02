import {
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Box,
  useColorMode,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { FaMicrophone, FaRobot } from "react-icons/fa";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const Hero = () => {
  const { colorMode } = useColorMode();
  const pulseAnimation = `${pulse} 2s infinite`;

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg={colorMode === "dark" ? "gray.900" : "gray.50"}
      py={32}
    >
      {/* Decorative background elements */}
      <Box
        position="absolute"
        top="-10%"
        left="-5%"
        width="120%"
        height="120%"
        opacity="0.1"
        bgGradient="radial(circle at 30% 20%, purple.500 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom="-10%"
        right="-5%"
        width="120%"
        height="120%"
        opacity="0.1"
        bgGradient="radial(circle at 70% 80%, blue.500 0%, transparent 70%)"
        pointerEvents="none"
      />

      <Container maxW="container.xl" position="relative">
        <Stack spacing={12} alignItems="center" textAlign="center">
          <Box position="relative">
            <Icon
              as={FaRobot}
              w={20}
              h={20}
              color="purple.500"
              animation={pulseAnimation}
              mb={8}
            />
          </Box>

          <Stack spacing={6} maxW="800px">
            <Heading
              size="3xl"
              bgGradient="linear(to-r, blue.400, purple.500, purple.700)"
              bgClip="text"
              letterSpacing="tight"
              lineHeight="1.2"
            >
              Transform Your Voice Into Text, Instantly
            </Heading>
            <Text
              fontSize="xl"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="600px"
              mx="auto"
            >
              Experience the future of typing with our AI-powered voice
              recognition. Type with your voice anywhere on the web, seamlessly
              and accurately.
            </Text>
          </Stack>

          <HStack spacing={4}>
            <Button
              size="lg"
              colorScheme="purple"
              onClick={() =>
                document.getElementById("waitlist")?.scrollIntoView()
              }
              leftIcon={<FaMicrophone />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              transition="all 0.2s"
            >
              Join Early Access
            </Button>
            <Button
              size="lg"
              variant="outline"
              colorScheme="purple"
              as="a"
              href="https://chromewebstore.google.com/detail/notypeai/jddchfnkcmclhijghgplffidgkcjkedd"
              target="_blank"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
                bg: "purple.50",
              }}
              transition="all 0.2s"
            >
              Get Chrome Extension
            </Button>
          </HStack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
