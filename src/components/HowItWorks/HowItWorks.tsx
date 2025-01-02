import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorMode,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaChrome, FaMicrophone, FaKeyboard, FaMagic } from "react-icons/fa";

interface StepProps {
  icon: React.ComponentType;
  title: string;
  description: string;
  index: number;
}

const Step = ({ icon, title, description, index }: StepProps) => {
  const { colorMode } = useColorMode();

  return (
    <HStack
      spacing={6}
      align="flex-start"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      p={6}
      borderRadius="xl"
      boxShadow="lg"
      position="relative"
      _hover={{
        transform: "translateX(8px)",
        boxShadow: "xl",
      }}
      transition="all 0.3s"
    >
      <Flex
        position="relative"
        w={12}
        h={12}
        align="center"
        justify="center"
        borderRadius="lg"
        bg="purple.500"
        flexShrink={0}
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "lg",
          background: "purple.500",
          filter: "blur(12px)",
          opacity: 0.3,
        }}
      >
        <Icon as={icon} w={6} h={6} color="white" zIndex={1} />
      </Flex>
      <VStack align="start" spacing={2}>
        <HStack spacing={3}>
          <Text fontSize="sm" fontWeight="bold" color="purple.500">
            Step {index}
          </Text>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </HStack>
        <Text color={colorMode === "dark" ? "gray.400" : "gray.600"}>
          {description}
        </Text>
      </VStack>
    </HStack>
  );
};

const HowItWorks = () => {
  const { colorMode } = useColorMode();
  const steps = [
    {
      icon: FaChrome,
      title: "Install Extension",
      description:
        "Get started by installing our Chrome extension from the Web Store. One-click setup, no configuration needed.",
    },
    {
      icon: FaMicrophone,
      title: "Activate Voice Input",
      description:
        "Click the microphone icon in any text field to start voice recognition. Our AI is ready to listen.",
    },
    {
      icon: FaKeyboard,
      title: "Speak Naturally",
      description:
        "Just speak naturally and watch as your words are transformed into text in real-time with high accuracy.",
    },
    {
      icon: FaMagic,
      title: "Edit and Perfect",
      description:
        "Use voice commands or keyboard to edit, format, and perfect your text. AI helps ensure accuracy.",
    },
  ];

  return (
    <Box bg={colorMode === "dark" ? "gray.900" : "gray.50"} py={24}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading
              fontSize="3xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Start Using Voice Input Today
            </Heading>
            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="2xl"
            >
              Get up and running with Notype.ai in just a few simple steps.
              Experience the future of text input.
            </Text>
          </VStack>
          <VStack spacing={6} align="stretch" width="100%" maxW="3xl" mx="auto">
            {steps.map((step, index) => (
              <Step
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                index={index + 1}
              />
            ))}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default HowItWorks;
