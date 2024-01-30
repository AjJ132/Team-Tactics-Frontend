import { useState } from "react";
import Navbar from "./Navbar.jsx";
import Dashboard from "./Dashboard.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Dashboard />
    </>
  );
}

export default App;
