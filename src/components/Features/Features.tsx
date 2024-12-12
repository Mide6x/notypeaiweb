import {
  Box,
  Container,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  useColorMode,
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
    <Stack align="center" textAlign="center">
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="purple.500"
        mb={1}
      >
        <Icon as={icon} w={8} h={8} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={colorMode === "dark" ? "gray.400" : "gray.600"}>{text}</Text>
    </Stack>
  );
};

const Features = () => {
  const { colorMode } = useColorMode();

  return (
    <Box bg={colorMode === "dark" ? "gray.800" : "gray.50"} py={20}>
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, md: 4 }} spacingX={10} spacingY={10}>
          <Feature
            icon={FaMicrophone}
            title="Voice Input"
            text="Speak naturally and watch your words appear on screen"
          />
          <Feature
            icon={FaKeyboard}
            title="Any Text Field"
            text="Works with any input field across the web"
          />
          <Feature
            icon={FaChrome}
            title="Chrome Integration"
            text="Seamlessly integrated with your browser"
          />
          <Feature
            icon={FaLock}
            title="Privacy First"
            text="Your voice data never leaves your browser"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
