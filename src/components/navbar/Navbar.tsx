import { useEffect, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import NavbarLinksProto from "./NavbarLinksProto";
import NavbarProfileSection from "./NavbarProfileSection";

function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [offlineMode, setOfflineMode] = useState(false);

    const auth = useAuth();

    useEffect(() => {
      console.log("navbar loaded");
    } , []);

    //method to get offline mode and set it to the state
    useEffect(() => {
      setOfflineMode(auth.offlineMode ?? false);
    }, [auth.offlineMode]);

    const handleOfflineMode = (value: boolean) => {
      auth.toggleOfflineMode(value);
    };

  return (
    <div className="top-navbar">
        <h3 className="font-bold">TeamTactics</h3>
        <NavbarLinksProto />
        <NavbarProfileSection firstName={auth.user?.firstName} lastName={auth.user?.lastName} role={auth.user?.role} profileIconUrl="_"/>
    </div>
  );
}

export default Navbar;