import { useState } from "react";

 function TopNavbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="top-navbar">
      {/* <div>
        <img src="vite.svg" />
      </div> */}
      <div className="h-full ml-auto mr-4 flex items-center circle-image-transparent">
        <img src="https://via.placeholder.com/35" alt="Placeholder Image" />
      </div>
      <button>
        Logout
      </button>
    </div>
  );
}

export default TopNavbar;