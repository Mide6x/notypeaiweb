import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/pages/Home";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/privacy"
            element={
              <MainLayout>
                <PrivacyPolicy />
              </MainLayout>
            }
          />
          <Route
            path="/terms"
            element={
              <MainLayout>
                <TermsOfService />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
