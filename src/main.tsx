import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
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


// ------------------------------------------

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <ProtectedRoute> {/* 👈 This is the ProtectedRoute component. It ensures that the user is signed in/authenticated before going to this page. */}
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>,
  },
  {
    path: '/signin',
    element: <SignIn />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <CalendarProvider>
        <RouterProvider router={router} />
      </CalendarProvider>
    </AuthProvider>
  </React.StrictMode>,
)
