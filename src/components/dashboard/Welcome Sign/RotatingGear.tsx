import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import './WelcomeSign.css'; // Ensure your CSS file is imported

const RotatingGear = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="icon-button welcome-sign-settings-icon">
            <button
                className="p-12"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <FontAwesomeIcon
                    className={`rotate-icon ${isHovered ? 'rotated' : ''}`}
                    icon={faGear}
                    size="2xl"
                />
            </button>
        </div>
    );
};

export default RotatingGear;
