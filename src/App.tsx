import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import theme from "./theme";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./components/pages/Home";
import LoginPage from "./components/pages/LoginPage";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import TermsOfService from "./components/pages/TermsOfService";
import DashboardPage from "./components/pages/DashboardPage";
import NotFound from "./components/pages/NotFound";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import AccountSettings from "./components/pages/AccountSettings";
import { AuthProvider } from "./components/Auth/AuthContext";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account-settings"
                element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainLayout>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
