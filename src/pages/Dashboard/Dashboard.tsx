import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

function Dashboard() {
  const auth = useAuth();
  
  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <div className="dashboard-body">
    
      <h1>
        Good {today.getHours() < 12 ? "Morning" : today.getHours() < 18 ? "Afternoon" : "Evening"}, {auth.user?.firstName}!
      </h1>
      {/* <div>hello</div> */}
      {/* <div>
        <div className="dashboard-component-headings">
          <h2>My Events</h2>
          <p>See all</p>
        </div>

        <div className="Dashboard-my-events-container">
          <p>No events scheduled</p>
        </div>
        <div className="dashboard-component-headings">
          <h2>Teams</h2>
          <p>See all</p>
        </div>

        <div className="Dashboard-my-events-container">
          <p>No teams displayed</p>
        </div>
        <div className="dashboard-component-headings">
          <h2>Messages</h2>
          <p>See all</p>
        </div>

        <div className="Dashboard-my-events-container">
          <p>No messages</p>
        </div>
      </div> */}
    
  </div>
  );
}

export default Dashboard;
