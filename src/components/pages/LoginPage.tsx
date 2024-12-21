import Login from "../Login";
import { Box, Container } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Box py={{ base: 10, md: 20 }}>
      <Container maxW="container.sm">
        <Login />
      </Container>
    </Box>
  );
};

export default LoginPage;
