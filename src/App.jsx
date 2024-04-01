// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import TeamCreation from './Pages/TeamCreation';
import TeamUpdate from './Pages/TeamUpdate';
import TeamMembers from './Pages/TeamMembers';
import TeamOrganization from './Pages/TeamOrganization';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/team/creation" element={<TeamCreation/>} />   
            <Route path="/team/update" element={<TeamUpdate/>} />
            <Route path="/team/members" element={<TeamMembers/>} />
            <Route path="/team/organization" element={<TeamOrganization/>} />
            {/* Add more routes for other pages */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;








