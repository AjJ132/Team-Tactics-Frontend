import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarLinksProto: React.FC = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const navRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to update the slider indicator position based on the active button
  const updateIndicatorPosition = (buttonName: string) => {
    const buttonElement = navRef.current?.querySelector(
      `button[data-button-name="${buttonName}"]`
    );
    if (buttonElement) {
      const { offsetLeft, clientWidth } = buttonElement as HTMLButtonElement;
      setIndicatorStyle({
        left: `${offsetLeft}px`,
        width: `${clientWidth}px`,
      });
    }
  };

  useEffect(() => {
    console.log("navbar link loaded");
  }, []);

  useEffect(() => {
    const pathToButtonNameMap: { [key: string]: string } = {
      "/": "Dashboard",
      "/calendar": "Calendar",
      "/messages": "Messages",
      "/files": "Files",
    };

    //check local storage for role, if 2 then coach else player
    const role = localStorage.getItem("role");

    if (role === "2") {
      pathToButtonNameMap["/teams"] = "MyTeam";
    }

    const activeButtonName = pathToButtonNameMap[location.pathname];
    if (activeButtonName) {
      setActiveButton(activeButtonName);
      // Wait for the next tick to ensure all elements are rendered
      setTimeout(() => updateIndicatorPosition(activeButtonName), 0);
    }
  }, [location.pathname]);

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    updateIndicatorPosition(buttonName);

    // Navigate based on the buttonName
    const buttonNameToPathMap: { [key: string]: string } = {
      Dashboard: "/",
      Calendar: "/calendar",
      Messages: "/messages",
      Files: "/files",
      MyTeam: "/teams", // Add MyTeam to the map
    };

    const path = buttonNameToPathMap[buttonName];
    if (path) {
      navigate(path);
    }
  };

  const isActive = (buttonName: string) => {
    return activeButton === buttonName ? "navbar-links-active" : "";
  };

  //check local storage for role, if 2 then coach else player
  const role = localStorage.getItem("role");
  const buttonNames = ["Dashboard", "Calendar", "Messages", "Files"];
  if (role === "2") {
    buttonNames.push("MyTeam");
  }

  return (
    <div className="proto-navbar-links ml-auto mr-auto" ref={navRef}>
      <div className="slider-indicator" style={indicatorStyle}></div>
      {buttonNames.map(
        (buttonName) => (
          <button
            key={buttonName}
            data-button-name={buttonName} // Added data attribute for selector
            onClick={() => handleButtonClick(buttonName)}
            className={`${isActive(buttonName)} navbar-link`}
            style={{textWrap: 'nowrap'}}
          >
            <p>{buttonName}</p>
          </button>
        )
      )}
    </div>
  );
};

export default NavbarLinksProto;