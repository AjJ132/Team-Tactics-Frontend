import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import './ActionPill.css';
import CreateEventModal from '../Create Event Modal/CreateEventModal';


type ActionPillProps = {
    action: string;
    icon: React.ReactNode;
    modalType: string;
    returnData?: (data?: any) => void; // Modify the type of returnData to be a void callback
};

const ActionPill: React.FC<ActionPillProps> = (props) => {
    const [showCreateEventModa, setShowCreateEventModal] = useState(false);
    

    const handleClicked = () => {
        // Show the modal
        if (props.modalType === 'CreateEventModal'){
            setShowCreateEventModal(true);
        }
        else if (props.modalType === 'none'){
            if (props.returnData) {
                props.returnData();
            }
        }
    };

    return (
        <div>
            <div className='action-pill-container mt-4'>
            <button className='flex flex-row' onClick={handleClicked}>
                <p className='ml-4'>{props.action}</p>
                <div className='action-btn ml-8 mr-4'>
                    <FontAwesomeIcon icon={faReply} />
                </div>
            </button>
            </div>
        </div>
    );
};


export default ActionPill;