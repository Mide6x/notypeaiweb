import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorMode,
} from "@chakra-ui/react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How accurate is the voice recognition?",
    answer:
      "Our AI-powered voice recognition system achieves over 95% accuracy in most environments. The accuracy improves over time as our AI learns from more usage patterns.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "We currently support English, Hausa, Yorùbá, Igbo, Zulu, French, and Arabic. Our voice recognition and translation services work seamlessly across these languages.",
  },
  {
    question: "Does it work in noisy environments?",
    answer:
      "Yes! Our advanced noise cancellation technology helps filter out background noise to maintain high accuracy even in moderately noisy environments.",
  },
  {
    question: "How secure is my voice data?",
    answer:
      "Your privacy is our top priority. All voice data is processed locally on your device and is never stored on our servers. We use end-to-end encryption for any necessary data transmission.",
  },
  {
    question: "Can I use it offline?",
    answer:
      "The Chrome extension's voice transcription features work offline. However, web app features like grammar checking, summarization, and translation require an internet connection.",
  },
  {
    question: "What browsers are supported?",
    answer:
      "Our Chrome extension works on all Chromium-based browsers including Google Chrome, Microsoft Edge, and Brave. Support for Firefox and Safari is coming soon.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply install our Chrome extension to start using voice transcription for free. Create an account to access additional features like grammar checking, summarization, and translation. Our interactive tutorial will guide you through all the features.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "We offer email support for all users. Standard tier users receive priority email support, while Premium users get priority 24/7 support. All support is handled by our dedicated team to ensure quick and helpful responses.",
  },
  {
    question: "Are there any usage limits?",
    answer:
      "Voice transcription with our Chrome extension is always free and unlimited. Web app features have daily limits based on your plan: Starter (free) includes 500 words for grammar checking, 2 summaries, and 250 words for translation. Standard tier increases these limits significantly, and Premium tier offers unlimited usage of all features.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll immediately get access to the higher tier features. If you downgrade, your new limits will apply at the start of your next billing cycle.",
  },
];

const FAQPage = () => {
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
              Frequently Asked Questions
            </Heading>
            <Text
              fontSize="xl"
              color={colorMode === "dark" ? "gray.400" : "gray.600"}
              maxW="2xl"
            >
              Find answers to common questions about Notype.ai and our voice
              recognition technology.
            </Text>
          </VStack>

          <Box w="100%" maxW="3xl" mx="auto">
            <Accordion allowMultiple>
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  border="none"
                  mb={4}
                  bg={colorMode === "dark" ? "gray.800" : "white"}
                  borderRadius="lg"
                  boxShadow="md"
                  _hover={{ boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  <AccordionButton
                    p={6}
                    _hover={{ bg: "transparent" }}
                    borderRadius="lg"
                  >
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      {item.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    pb={6}
                    px={6}
                    color={colorMode === "dark" ? "gray.400" : "gray.600"}
                  >
                    {item.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default FAQPage;
