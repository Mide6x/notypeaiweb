import { Box } from "@chakra-ui/react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default MainLayout;
