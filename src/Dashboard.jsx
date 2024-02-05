import { useState } from "react";

function Dashboard() {
  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <>
      <div className="Dashboard">
        <div className="Dashboard-heading">
          <h2>Welcome, User</h2>

          <p>{date}</p>
        </div>
        <div className="Dashboard-body">
          {/* <div className="Dashboard-my-events-container">
            <h2>Hello</h2>
          </div>
          <div className="Dashboard-my-events-container">
            <h2>Hello</h2>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;