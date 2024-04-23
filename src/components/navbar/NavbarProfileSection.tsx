import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../providers/AuthProvider';
import { UserSignout } from '../../api/AuthAPIFunctions';
import SwitchSelector from "react-switch-selector";

type Props = {
    firstName?: string;
    lastName?: string;
    role?: string;
    profileIconUrl?: string;
};

const NavbarProfileSection: React.FC<Props> = (props) => {
    const auth = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const options = [
        { label: "Online", value: "online", selectedBackgroundColor: "#4caf50" },
        { label: "Offline", value: "offline", selectedBackgroundColor: "#f44336" }
    ];
    const currentStatus = auth.offlineMode ? "offline" : "online";


    const onChange = (newValue: string): void => {
        //if online then set online else set offline
        if (newValue === "online") {
            //set online
            auth.toggleOfflineMode(false);
        } else {
            //set offline
            auth.toggleOfflineMode(true);
        }
    };

    const handleLogout = async () => {
        const response = await UserSignout();

        if (response) {
            auth.logout();
        } else {
            alert('Failed to logout');
        }
    };

    const showSettings = () => {
        window.location.href = '/settings';  }
        
    return (
        <div className={`navbar-profile-section ml-auto ${isDropdownOpen ? 'open' : ''}`}>
            <button className='flex flex-row' onClick={toggleDropdown}>
                <img src="https://via.placeholder.com/70" alt="Placeholder Image" />
                <div className='flex flex-col text-start'>
                    <p><strong>{props.firstName + ' ' + props.lastName}</strong></p>
                    <p>{props.role}</p>
                </div>
                <div className='profile-dropdown-chevron-btn ml-14'>
                    <button>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </button>
            {isDropdownOpen && (
                <div className="dropdown-container" >
                    <div className="mt-4"></div>
                    <div className="dropdown-item" onClick={showSettings}>
                        <FontAwesomeIcon icon={faCog} />
                        <p>Settings</p>
                    </div>
                    <div className="dropdown-item">
                        <p style={{ height: "50px", width: "200px" }}>
                            <SwitchSelector
                                options={options}
                                initialSelectedIndex={currentStatus === "online" ? 0 : 1}
                                onChange={onChange as (selectedOptionValue: unknown) => void}
                                backgroundColor={"#2f2f2f"}
                                fontColor={"#f5f5f5"}
                            />
                        </p>
                    </div>
                    <div className="dropdown-item" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        <p>Logout</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavbarProfileSection;