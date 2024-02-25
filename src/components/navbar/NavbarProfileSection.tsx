import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCog, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../providers/AuthProvider';
import { UserSignout } from '../../api/AuthAPIFunctions';

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

    const handleLogout = async () => {
        const response = await UserSignout();

        if (response) {
            auth.logout();
        } else {
            alert('Failed to logout');
        };
    };
        
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
                <div className="dropdown-item">
                    <FontAwesomeIcon icon={faCog} />
                    <p>Settings</p>
                </div>
                <div className="dropdown-item" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <p>Logout</p>
                </div>
            </div>
        )}
    </div>
);
}
export default NavbarProfileSection;