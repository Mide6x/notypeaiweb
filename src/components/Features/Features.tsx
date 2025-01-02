import {
  Box,
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { FaMicrophone, FaKeyboard, FaChrome, FaLock } from "react-icons/fa";

interface FeatureProps {
  title: string;
  text: string;
  icon: React.ComponentType;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  const { colorMode } = useColorMode();

  return (
    <Stack
      align="center"
      textAlign="center"
      bg={colorMode === "dark" ? "gray.800" : "white"}
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
      }}
      transition="all 0.3s"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-20%"
        left="-20%"
        width="140%"
        height="140%"
        opacity="0.05"
        bgGradient="radial(circle at 50% 50%, purple.500 0%, transparent 70%)"
        pointerEvents="none"
      />
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="xl"
        bg="purple.500"
        mb={4}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "xl",
          background: "purple.500",
          filter: "blur(15px)",
          opacity: 0.3,
        }}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={700} fontSize="lg" mb={2}>
        {title}
      </Text>
      <Text color={colorMode === "dark" ? "gray.400" : "gray.600"}>{text}</Text>
    </Stack>
  );
};

const Features = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === "dark" ? "gray.900" : "gray.50"} py={24}>
      <Container maxW="container.xl">
        <Stack spacing={12}>
          <Stack spacing={4} textAlign="center">
            <Heading
              fontSize="3xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Powered by Advanced AI
            </Heading>
            <Text
              fontSize="lg"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="2xl"
              mx="auto"
            >
              Experience seamless voice-to-text conversion with our cutting-edge
              features designed for maximum productivity.
            </Text>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={8}
            px={{ base: 4, md: 8 }}
          >
            <Feature
              icon={FaMicrophone}
              title="Voice Input"
              text="Advanced AI speech recognition for accurate text conversion"
            />
            <Feature
              icon={FaKeyboard}
              title="Universal Input"
              text="Works seamlessly with any text field across the web"
            />
            <Feature
              icon={FaChrome}
              title="Chrome Integration"
              text="Native browser integration for a smooth experience"
            />
            <Feature
              icon={FaLock}
              title="Privacy First"
              text="Secure, local processing keeps your data private"
            />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Features;
