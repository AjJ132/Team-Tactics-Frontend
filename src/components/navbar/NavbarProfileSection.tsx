import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
    // Define your component's props here
};

const NavbarProfileSection: React.FC<Props> = (props) => {
    const auth = useAuth();

    return (
        <div className='navbar-profile-section ml-auto'>
            <button className='flex flex-row'>
                <img src="https://via.placeholder.com/70" alt="Placeholder Image" />
                <div className='flex flex-col text-start'>
                    <p><strong>{auth.user?.firstName + ' ' + auth.user?.lastName}</strong></p>
                    <p>Coach</p>
                </div>
                <div className='profile-dropdown-chevron-btn ml-14'>
                    <button>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                </div>
            </button>
        </div>
    );
};

export default NavbarProfileSection;