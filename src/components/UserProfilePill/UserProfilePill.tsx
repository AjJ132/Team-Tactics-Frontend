import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReply } from '@fortawesome/free-solid-svg-icons';
import './UserProfilePill.css';

type UserProfilePillProps = {
    name: string;
    role: string;
};

const UserProfilePill: React.FC<UserProfilePillProps> = (props) => {
    return (
        <div className='profile-pill-container ml-auto'>
            <button className='flex flex-row'>
                <img src="https://via.placeholder.com/70" alt="Placeholder Image" />
                <div className='flex flex-col text-start'>
                    <p><strong>{props.name}</strong></p>
                    <p style={{color: 'var(--accent-color)'}}>{props.role}</p>
                </div>
                <div className='profile-dropdown-reply-btn ml-8'>
                    <button>
                        <FontAwesomeIcon icon={faReply} flip="horizontal" />
                    </button>
                </div>
            </button>
        </div>
    );
};

export default UserProfilePill;