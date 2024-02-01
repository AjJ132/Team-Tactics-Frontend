import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Signin from "./Signin.jsx";
import Signup from "./Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard.jsx";

import "./App.css";

function App() {
  //  Signin and Signup will have own separate page without the Navbar component present.
  //  I have it set up the way it is right now in order to navigate between the different components.
  //  React router is just a temporary way to navigate between components. Not sure if we will end up
  //  keeping React router.
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
