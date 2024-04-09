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
import TeamCreation from "./pages/TeamCreation/TeamCreation";
import Signup from "./pages/SigninSignup/Signup";
import { ModalVisibilityProvider } from "./providers/ModalVisibilityManager";
import MessagesProvider from "./providers/MessagesProvider";

// Adjust your router configuration to include a single layout that wraps around your routes
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
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
                    <Route path="/teams" element={<TeamCreation />} />
                    {/* Define other routes here */}
                  </Routes>
                </Layout>
              </BrowserRouter>
            </ModalVisibilityProvider>
          </MessagesProvider>
        </CalendarProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
