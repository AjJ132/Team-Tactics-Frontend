import React from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type Props = {
    firstName?: string;
    lastName?: string;
    role?: string;
    profileIconUrl?: string;
};

const NavbarProfileSection: React.FC<Props> = (props) => {
    

    return (
        <div className='navbar-profile-section ml-auto'>
            <button className='flex flex-row'>
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
        </div>
    );
};

export default NavbarProfileSection;