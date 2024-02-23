import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard/Dashboard'
import SignIn from './pages/SigninSignup/Signin'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/Protected Route/ProtectedRoute'
import { Layout } from './components/Layout/Layout'

// CSS IMPORTS ------------------------------

import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Signin.css";
import "./styles/Messages.css";
import "./styles/Message.css";
import "./index.css";
import { UserContext } from './contexts/UserContext'
import { User } from './Interfaces/User'
import CalendarProvider from './providers/CalendarProvider'
import CalendarPage from './pages/Calendar/CalendarPage'
import MessagesPage from './pages/Messages/MessagesPage'
import FilesPage from './pages/files/FilesPage'
import Signup from './pages/SigninSignup/Signup'


// ------------OLD CODE. Keeping for awhile just in case :) AJ. (Removing this so the navbar doesnt re render on every page change)
/*
const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <ProtectedRoute> 
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/Calendar',
    element: 
      <ProtectedRoute>
        <Layout>
          <CalendarPage />
        </Layout>
      </ProtectedRoute>,
  },
  {
    path: '/messages',
    element: 
      <ProtectedRoute>
        <Layout>
          <MessagesPage />
        </Layout>
      </ProtectedRoute>,
  },
]) */

// Adjust your router configuration to include a single layout that wraps around your routes
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AuthProvider>
        <CalendarProvider>
          
            <BrowserRouter>
              <Layout> {/* Layout is now outside and wraps around the routes */}
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<Signup />} /> 
                  <Route path="/calendar" element={<CalendarPage />} />
                  <Route path="/messages" element={<MessagesPage />} />
                  <Route path='/files' element={<FilesPage />} />
                  {/* Define other routes here */}
                </Routes>
              </Layout>
            </BrowserRouter>
          
        </CalendarProvider>
      </AuthProvider>
    </React.StrictMode>,
  );
}
