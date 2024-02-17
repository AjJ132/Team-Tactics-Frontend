import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import Dashboard from './pages/Dashboard/Dashboard'
import SignIn from './pages/SigninSignup/Signin'
import AuthProvider from './providers/AuthProvider'
import ProtectedRoute from './components/Protected Route/ProtectedRoute'

// CSS IMPORTS ------------------------------

import "./styles/App.css";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Signin.css";
import "./styles/Messages.css";
import "./styles/Message.css";
import "./index.css";
import { UserContext } from './contexts/UserContext'
import { User } from './Interfaces/User'


// ------------------------------------------

const user: User = {
  firstName: "John",
  lastName: "Doe",
  userId: "1234",
  email: "testuser@gmail.com",
};

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <ProtectedRoute> {/* 👈 This is the ProtectedRoute component. It ensures that the user is signed in/authenticated before going to this page. */}
        <Dashboard />
      </ProtectedRoute>,
  },
  {
    path: '/signin',
    element: <SignIn />,
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider isSignedIn={true}>
      <UserContext.Provider value={user}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </AuthProvider>
  </React.StrictMode>,
)
