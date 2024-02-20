import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import NavbarLinksProto from "./NavbarLinksProto";
import NavbarProfileSection from "./NavbarProfileSection";

function ProtoTypeNavbar() {
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
        <h3>TeamTactics</h3>
        <NavbarLinksProto />
        <NavbarProfileSection />
    </div>
  );
}

export default ProtoTypeNavbar;