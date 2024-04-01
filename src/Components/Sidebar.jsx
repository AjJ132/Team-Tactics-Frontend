
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Manage Team</h2>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/team/creation">Create Team</Link>
        </li>
        <li>
          <Link to="/team/update">Update Team</Link>
        </li>
        <li>
          <Link to="/team/members">Team Members</Link>
        </li>
        <li>
          <Link to="/team/organization">Team Organization</Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;

