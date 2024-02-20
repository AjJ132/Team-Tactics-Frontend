import React, { useRef, useState } from 'react';

interface Props {
    // Define the props for your component here
}

const NavbarLinksProto: React.FC<Props> = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const navRef = useRef<HTMLDivElement>(null); // Reference to the nav container
  
    const handleButtonClick = (buttonName: string, buttonRef: HTMLButtonElement) => {
        setActiveButton(buttonName);
        // Calculate the position and width based on the button's dimensions
        const { offsetLeft, clientWidth } = buttonRef;
        setIndicatorStyle({
          left: `${offsetLeft}px`,
          width: `${clientWidth}px`,
        });
      };
      
      const isActive = (buttonName: string) => {
        return activeButton === buttonName ? 'navbar-links-active' : '';
      };

  return (
      <div className='proto-navbar-links ml-auto mr-auto' ref={navRef}>
        <div className="slider-indicator" style={indicatorStyle}></div>
        {['Dashboard', 'Calendar', 'Messages', 'Files'].map((buttonName, index) => (
          <button 
            key={index} 
            onClick={(e) => handleButtonClick(buttonName, e.currentTarget)} 
            className={`${isActive(buttonName)} navbar-link`} // Corrected class name usage
        >
            <p>{buttonName}</p>
        </button>
      
        ))}
    </div>
  );

}

export default NavbarLinksProto;
