import { Box, Container, Flex, Button, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box as="header" py={4} bg="white" boxShadow="sm">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Flex align="center">
            <Image
              src="src/assets/ntype.png"
              alt="Notype.ai logo"
              h="24px"
              mr={2}
            />
            <Box fontSize="xl" fontWeight="bold">
              Notype.ai
            </Box>
          </Flex>
          <Button
            colorScheme="purple"
            variant="ghost"
            onClick={() =>
              document.getElementById("waitlist")?.scrollIntoView()
            }
          >
            Join Waitlist
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
