import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
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
import { useAuth } from "./components/Auth/useAuth";
import BlogPage from "./components/pages/BlogPage";
import BlogPost1 from "./components/pages/blog/BlogPost1";
import BlogPost2 from "./components/pages/blog/BlogPost2";
import BlogPost3 from "./components/pages/blog/BlogPost3";
import PricingPage from "./components/pages/PricingPage";
import FAQPage from "./components/pages/FAQPage";

const ThemeInitializer = () => {
  const { user } = useAuth();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    if (user?.preferences?.theme) {
      setColorMode(user.preferences.theme);
    }
  }, [user?.preferences?.theme, setColorMode]);

  return null;
};

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <ThemeInitializer />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/blog"
              element={
                <MainLayout>
                  <BlogPage />
                </MainLayout>
              }
            />
            <Route
              path="/blog/future-of-voice-to-text"
              element={
                <MainLayout>
                  <BlogPost1 />
                </MainLayout>
              }
            />
            <Route
              path="/blog/maximizing-productivity"
              element={
                <MainLayout>
                  <BlogPost2 />
                </MainLayout>
              }
            />
            <Route
              path="/blog/voice-recognition-languages"
              element={
                <MainLayout>
                  <BlogPost3 />
                </MainLayout>
              }
            />
            <Route
              path="/pricing"
              element={
                <MainLayout>
                  <PricingPage />
                </MainLayout>
              }
            />
            <Route
              path="/faq"
              element={
                <MainLayout>
                  <FAQPage />
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
            <Route
              path="/dashboard/*"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="/account-settings"
              element={
                <MainLayout>
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                </MainLayout>
              }
            />
            <Route
              path="*"
              element={
                <MainLayout>
                  <NotFound />
                </MainLayout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
