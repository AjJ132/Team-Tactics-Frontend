import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendar, faEnvelope, faCog } from "@fortawesome/free-solid-svg-icons";


function SideNavbar() {
  return (
    <div className="side-nav">
      <div className="mt-8">
      <ul>
        <li>
          <Link to="/"><FontAwesomeIcon icon={faHome} /><p>Home</p></Link>
        </li>
        <li>
          <Link to="/calendar"><FontAwesomeIcon icon={faCalendar} /> <p>Calendar</p></Link>
        </li>
        <li>
          <Link to="/messages"><FontAwesomeIcon icon={faEnvelope} /> <p>Messages</p></Link>
        </li>
        <li>
          <Link to="/settings"><FontAwesomeIcon icon={faCog} /> <p>Settings</p></Link>
        </li>
      </ul>
      </div>
    </div>
  );
}

export default SideNavbar;
