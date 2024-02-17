import { useState } from "react";

 function TopNavbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="top-navbar">
      <div>
        <img src="vite.svg" />
      </div>
      <div className="h-full ml-auto mr-6">
        <img src="https://via.placeholder.com/35" alt="Placeholder Image" />
      </div>
      <button className="">
        Logout
      </button>
    </div>
  );
}

export default TopNavbar;