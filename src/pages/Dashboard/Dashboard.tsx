import { useState } from "react";
import Navbar from "../../components/navbar/SideNavbar";
import { useAuth } from "../../providers/AuthProvider";
import DashboardHeader from "../../components/Dashboard Header/DashboardHeader";
import SideNavbar from "../../components/navbar/SideNavbar";
import TopNavbar from "../../components/navbar/TopNavbar";

function Dashboard() {
  const auth = useAuth();
  
  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
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
  );
}

export default Dashboard;
