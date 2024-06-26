import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/SigninSignup/Signin";
import AuthProvider from "./providers/AuthProvider";
import ProtectedRoute from "./components/Protected Route/ProtectedRoute";
import { Layout } from "./components/Layout/Layout";

// CSS IMPORTS ------------------------------

import "./styles/Navbar.css";
import "./styles/TeamCreation.css";
import "./styles/Dashboard.css";
import "./styles/Signin.css";
import "./styles/Messages.css";
import "./styles/Message.css";
import "./index.css";
import CalendarProvider from "./providers/CalendarProvider";
import CalendarPage from "./pages/Calendar/CalendarPage";
import MessagesPage from "./pages/Messages/MessagesPage";
import FilesPage from "./pages/files/FilesPage";
import TeamManagement from "./pages/TeamCreation/TeamManagement";
import Signup from "./pages/SigninSignup/Signup";
import { ModalVisibilityProvider } from "./providers/ModalVisibilityManager";
import { MessagesProvider } from "./providers/MessagesProvider";
import TeamSignup from "./pages/TeamSignup/TeamSignup";
import TeamProvider from "./providers/TeamProvider";
import SettingsPage from "./pages/Settings/Settings";

// Adjust your router configuration to include a single layout that wraps around your routes
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <TeamProvider>
          <CalendarProvider>
              <MessagesProvider>
              <ModalVisibilityProvider>
                <BrowserRouter>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/signin" element={<SignIn />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/files" element={<FilesPage />} />
                      <Route path="/teams" element={<TeamManagement />} />
                      <Route path="/team-signup" element={<TeamSignup />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      {/* Define other routes here */}
                    </Routes>
                  </Layout>
                </BrowserRouter>
              </ModalVisibilityProvider>
            </MessagesProvider>
          </CalendarProvider>
        </TeamProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
