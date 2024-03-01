// CalendarHeader.tsx

import React from 'react';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useModalVisibility } from '../../providers/ModalVisibilityManager';
import CreateEventModal from '../Create Event Modal/CreateEventModal';

interface CalendarHeaderProps {
    currentMonth: Date;
    toNextMonth: () => void;
    toPreviousMonth: () => void;
    toToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentMonth, toNextMonth, toPreviousMonth, toToday }) => {
    const { showModal, hideModal } = useModalVisibility();

    const returnData = (data: any) => {
        // Hide the modal
        // setShowCreateEventModal(false);
        // if (props.returnData) {
        //     props.returnData(data);
        // }
    }
    
    const handleOpenModal = () => {
        showModal({
            title: 'Create Event',
            subtitle: 'Fill in the event details',
            actionText: 'Save',
            cancelText: 'Cancel',
            modalContent: <CreateEventModal onClose={hideModal}/>,
            onActionSuccessful: (returnData) => {
                console.log('Event created', returnData);
            }
        });
    };


    return (
        <div className="flex flex-row justify-between content-center w-full mb-4 pl-4 pr-4 mt-4">
            <button onClick={handleOpenModal} className="flex flex-row justify-center items-center p-2 w-fit h-fit gap-2">
                <FontAwesomeIcon icon={faPlus} /> <p>Add Event</p>
            </button>
            <h2 className="text-center calendar-text font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
            
            <div className="date-change-button">
                <button className="no-border-radius" onClick={toToday}>
                    <div>Today</div>
                </button>
                <button onClick={toPreviousMonth}>
                    <svg className="w-6 h-6 ml-auto mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="no-border-radius">
                    <div>{currentMonth.toLocaleString('default', { month: 'short' })}</div>
                </button>
                <button onClick={toNextMonth}>
                    <svg className="w-6 h-6 ml-auto mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default CalendarHeader;
