import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalendar, faEnvelope, faCog, faXmark, faBars, faUser } from "@fortawesome/free-solid-svg-icons";


function SideNavbar() {
  const [selected, setSelected] = useState('home');
  const [navWidth, setNavWidth] = useState('250px');
  const [isOpen, setIsOpen] = useState(true);

  const closeMenu = () => {
    setSelected('close');
    setNavWidth('50px');
    setIsOpen(false);
  };

  const openMenu = () => {
    setSelected('home');
    setNavWidth('250px');
    setIsOpen(true);
  };

  return (
    <div className={`side-nav ${!isOpen ? 'side-nav-closed' : ''}`} style={{ width: navWidth }}>
      {isOpen ? (
        <>
          {/* Existing content */}
          <div className="side-nav-buttons">
            <button className={selected === 'close' ? 'selected' : ''} onClick={closeMenu}>
              <FontAwesomeIcon icon={faXmark} />
              {isOpen && <p>Close Menu</p>}
            </button>
            <button className={selected === 'close' ? 'selected' : ''}>
              <FontAwesomeIcon icon={faHome} />
              {isOpen && <p>Dashboard</p>}
            </button>
            <button className={selected === 'calendar' ? 'selected' : ''}>
              <FontAwesomeIcon icon={faCalendar} />
              {isOpen && <p>Calendar</p>}
            </button>
            <button className={selected === 'envelope' ? 'selected' : ''}>
              <FontAwesomeIcon icon={faEnvelope} />
              {isOpen && <p>Messages</p>}
            </button>
            <button className={selected === 'envelope' ? 'selected' : ''}>
            <FontAwesomeIcon icon={faUser} />
              {isOpen && <p>Team Creation</p>}
            </button>
            <button className={`mt-auto ${selected === 'cog' ? 'selected' : ''}`}>
              <FontAwesomeIcon icon={faCog} />
              {isOpen && <p>Settings</p>}
            </button>
          </div>
        </>
      ) : (
        <div className="side-nav-buttons">
          <button onClick={openMenu}>
            <FontAwesomeIcon icon={faBars}/>
            {isOpen && <p>Open Menu</p>}
          </button>
          <button>
            <FontAwesomeIcon icon={faHome}/>
            {isOpen && <p>Open Menu</p>}
          </button>
          <button>
            <FontAwesomeIcon icon={faCalendar}/>
            {isOpen && <p>Open Menu</p>}
          </button>
          <button>
            <FontAwesomeIcon icon={faEnvelope}/>
            {isOpen && <p>Open Menu</p>}
          </button>
          <button className="mt-auto">
            <FontAwesomeIcon icon={faCog}/>
            {isOpen && <p>Open Menu</p>}
          </button>
        </div>
      )}
    </div>
  );
}

export default SideNavbar;
