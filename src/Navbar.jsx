import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function Navbar() {
  // useState hook to toggle the side navbar
  const [toggleMenu, setToggleMenu] = useState(true);

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

          {/* Need to come up with a logo */}
          <h3 id="team-tactics-logo">TEAM TACTICS</h3>
        </div>

        <div className="nav-elements-3-4">
          {/* Signin and Signup links will not stay in this place, 
          only here temporarily to be able to navigate to see 
          the signin/signup pages.  */}
          <div>
            <Link to="/signup" className="signin-link">
              Signup
            </Link>
          </div>
          <div>
            <Link to="/signin" className="signin-link">
              Signin
            </Link>
          </div>
          <div className="profile-pic-small">
            <p>UP</p>
          </div>
          <div className="nav-username">User Profile</div>

          {/* Bootstrap icons */}
          <div className="nav-message-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              class="bi bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
            </svg>

            <div className="nav-search-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* *************
       Have not decided yet if the side navigation bar will always stay open. It's always open for now.
       The logic to toggle the side nav is commented out below.
       ************* */}

      {/* This is the side navbar. It uses state "toggleMenu" to open and close the side navbar. */}
      {toggleMenu && (
        <div className="side-nav">
          <div className="profile-container">
            <div className="profile-pic-large-container">
              <div className="profile-pic-large">
                <div>
                  <p>UP</p>
                </div>
              </div>
            </div>
            <div id="side-nav-username">
              <h3>User Profile</h3>
            </div>
          </div>
          <div className="divider"></div>

          <ul>
            <li>
              <Link to="/" className="nav-dashboard">
                Dashboard
              </Link>
            </li>
            <li>Profile</li>
            <li>Messages</li>
            <li>Schedule</li>
            <li>Manage Teams</li>
            <li>Logout</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
