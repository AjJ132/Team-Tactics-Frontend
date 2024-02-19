import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

function TopNavbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [offlineMode, setOfflineMode] = useState(false);

    const auth = useAuth();

    //method to get offline mode and set it to the state
    useEffect(() => {
      setOfflineMode(auth.offlineMode ?? false);
    }, [auth.offlineMode]);

    const handleOfflineMode = (value: boolean) => {
      auth.toggleOfflineMode(value);
    };

  return (
    <div className="top-navbar">
      <div className="flex flex-row justify-center items-center ml-auto">
        <p>Offline Mode</p>
        <label className="switch ml-1">
            <input type="checkbox" checked={offlineMode} onChange={(e) => handleOfflineMode(e.target.checked)} />
            <span className="slider round"></span>
        </label>
      </div>
      <div className="h-full ml-4 flex items-center circle-image-transparent">
        <img src="https://via.placeholder.com/35" alt="Placeholder Image" />
      </div>
      <button className="ml-4">
        Logout
      </button>
    </div>
  );
}

export default TopNavbar;