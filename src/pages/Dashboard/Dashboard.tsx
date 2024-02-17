import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
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
    <>
      <Navbar />
      <div className="Dashboard">
        <div className="Dashboard-heading">
          <h2>Welcome, {auth.user?.firstName}</h2>

          <p>{date}</p>
        </div>
        <div className="Dashboard-body">
          <div className="dashboard-components-container">
            {/* <div>hello</div> */}
            <div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
