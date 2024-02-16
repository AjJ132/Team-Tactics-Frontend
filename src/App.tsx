import Navbar from "./components/navbar/Navbar.jsx";
import Signin from "./pages/signin-signup/Signin.jsx";
import Signup from "./pages/signin-signup/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Messages from "./pages/messages/Messages.jsx";
import "./styles/App.css";
import "./styles/Navbar.css";
import "./styles/Dashboard.css";
import "./styles/Signin.css";
import "./styles/Messages.css";
import "./styles/Message.css";
import React from "react";
import { UserContext } from "./contexts/userContext.js";
import { User } from "./interfaces/User";

function App() {
  //  Signin and Signup will have own separate page without the Navbar component present.
  //  I have it set up the way it is right now in order to navigate between the different components.
  //  React router is just a temporary way to navigate between components. Not sure if we will end up
  //  keeping React router.

  //TEMP VALUE for USER
  const user: User = {
    firstName: "John",
    lastName: "Doe",
    userId: 1,
    email: "testuser@gmail.com",
  };
  


  return (
    <Router>
        <Routes>
          {/* The root component of the application.
          * It handles the routing and provides the UserContext to its child components. */}
          <Route path="/" element={
            <UserContext.Provider value={user}>
              <Dashboard />
              </UserContext.Provider>
            }>

          </Route>
          <Route path="/messages" element={<Messages />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </Router>
  );
}

export default App;
