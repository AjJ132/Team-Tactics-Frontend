import { useState } from "react";
import "./App.css";

function Navbar() {
  // useState hook to toggle the side navbar
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <>
      {/* This is the top navbar */}
      <div className="Navbar">
        <div className="nav-elements-1-2">
          <div className="menu" onClick={() => setToggleMenu(!toggleMenu)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
          <div>TEAM TACTICS</div>
        </div>

        <div className="nav-elements-3-4">
          <div className="profile-pic-small"></div>
          <div>User Profile</div>
        </div>
      </div>

      {/* This is the side navbar. It uses state "toggleMenu" to open and close the side navbar. */}
      {toggleMenu && (
        <div className="side-nav">
          <div>Dashboard</div>
          <div>Profile</div>
          <div>Messages</div>
          <div>Schedule</div>
          <div>Manage Teams</div>
          <div>Logout</div>
        </div>
      )}
    </>
  );
}

export default Navbar;
