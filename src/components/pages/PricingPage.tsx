import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Button,
  List,
  ListItem,
  ListIcon,
  useColorMode,
  Badge,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "Free",
    description: "Basic features for casual users",
    features: [
      "✨ Unlimited Voice Transcription (Chrome Extension)",
      "Grammar Checker (500 words/day)",
      "Text Summarizer (2 summaries/day)",
      "Translator (250 words/day)",
      "Basic email support",
    ],
  },
  {
    name: "Standard",
    price: "$4.99",
    description: "Perfect for regular users",
    features: [
      "✨ Unlimited Voice Transcription (Chrome Extension)",
      "Grammar Checker (5,000 words/day)",
      "Text Summarizer (10 summaries/day)",
      "Translator (2,500 words/day)",
      "Priority email support",
      "Save correction history",
      "Custom writing style preferences",
    ],
    isPopular: true,
  },
  {
    name: "Premium",
    price: "$9.99",
    description: "For power users and professionals",
    features: [
      "✨ Unlimited Voice Transcription (Chrome Extension)",
      "Unlimited Grammar Checking",
      "Unlimited Text Summarization",
      "Unlimited Translation",
      "Priority 24/7 support",
      "Advanced writing analytics",
      "Custom templates & shortcuts",
      "API access for personal use",
    ],
  },
];

const PricingPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box py={20}>
      <Container maxW="container.xl">
        <VStack spacing={16}>
          <VStack spacing={4} textAlign="center">
            <Heading
              size="2xl"
              bgGradient="linear(to-r, blue.400, purple.500)"
              bgClip="text"
            >
              Choose Your Plan
            </Heading>
            <Text
              fontSize="xl"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="2xl"
            >
              Voice transcription is always free with our Chrome extension.
              Upgrade to unlock more features and higher usage limits.
            </Text>
          </VStack>

          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={10}
            alignItems="stretch"
          >
            {pricingTiers.map((tier, index) => (
              <VStack
                key={index}
                spacing={6}
                p={8}
                bg={colorMode === "dark" ? "gray.800" : "white"}
                borderRadius="xl"
                borderWidth="2px"
                borderColor={tier.isPopular ? "purple.500" : "transparent"}
                position="relative"
                transition="transform 0.2s"
                _hover={{ transform: "translateY(-4px)" }}
                boxShadow="xl"
              >
                {tier.isPopular && (
                  <Badge
                    colorScheme="purple"
                    position="absolute"
                    top="-3"
                    right="-3"
                    px={3}
                    py={1}
                    borderRadius="full"
                    textTransform="none"
                    fontSize="sm"
                  >
                    Most Popular
                  </Badge>
                )}

                <VStack spacing={4} align="stretch" w="100%">
                  <Heading size="md">{tier.name}</Heading>
                  <HStack align="baseline">
                    <Heading size="2xl">{tier.price}</Heading>
                    {tier.price !== "Free" && (
                      <Text
                        color={colorMode === "dark" ? "gray.400" : "gray.600"}
                      >
                        /month
                      </Text>
                    )}
                  </HStack>
                  <Text color={colorMode === "dark" ? "gray.400" : "gray.600"}>
                    {tier.description}
                  </Text>

                  <Divider my={2} />

                  <List spacing={3} flex="1">
                    {tier.features.map((feature, featureIndex) => (
                      <ListItem
                        key={featureIndex}
                        display="flex"
                        alignItems="center"
                      >
                        <ListIcon
                          as={CheckCircleIcon}
                          color="purple.500"
                          marginRight={2}
                        />
                        {feature}
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    colorScheme="purple"
                    size="lg"
                    w="100%"
                    variant={tier.isPopular ? "solid" : "outline"}
                    mt={4}
                  >
                    {tier.price === "Free" ? "Get Started" : "Upgrade Now"}
                  </Button>
                </VStack>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default PricingPage;
