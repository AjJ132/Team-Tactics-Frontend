import { useState } from "react";
import "./App.css";

function Dashboard() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="Dashboard">
        <div className="Dashboard-heading">
          <h2>Welcome, User</h2>
          <p>Tuesday, January 30, 2024</p>
        </div>
        <div className="Dashboard-body"></div>
      </div>
    </>
  );
}

export default Dashboard;
