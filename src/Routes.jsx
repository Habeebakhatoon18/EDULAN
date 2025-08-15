import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VideoTranslationStudio from './pages/video-translation-studio';
import DashboardRoleBased from './pages/dashboard-role-based';
import AuthenticationPage from './pages/authentication-login-register';
import TextTranslationWorkspace from './pages/text-translation-workspace';
import LanguageLearningHub from './pages/language-learning-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/video-translation-studio" element={<VideoTranslationStudio />} />
        <Route path="/dashboard-role-based" element={<DashboardRoleBased />} />
        <Route path="/authentication-login-register" element={<AuthenticationPage />} />
        <Route path="/text-translation-workspace" element={<TextTranslationWorkspace />} />
        <Route path="/language-learning-hub" element={<LanguageLearningHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
