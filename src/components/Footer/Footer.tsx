import { Box, Container, Text, Stack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box bg="gray.50" py={8}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify="space-between"
          align="center"
        >
          <Text>© 2024 Notype AI. All rights reserved.</Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={6}>
            <Link as={RouterLink} to="/privacy" color="gray.600">
              Privacy Policy
            </Link>
            <Link
              href="https://www.unesco.org/en/artificial-intelligence/recommendation-ethics"
              color="gray.600"
              isExternal
            >
              Ethical AI
            </Link>
            <Link as={RouterLink} to="/terms" color="gray.600">
              Terms of Service
            </Link>
            <Link href="mailto:adewoleolumide05@gmail.com" color="gray.600">
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
