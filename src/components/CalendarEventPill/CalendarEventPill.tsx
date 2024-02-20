import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import './CalendarEventPill.css';

type CalendarEventPillProps = {
    eventName: string;
    eventType: string;
};

const CalendarEventPill: React.FC<CalendarEventPillProps> = (props) => {
    return (
        <div className='calendar-event-pill-container ml-auto'>
            <button className='flex flex-row'>
                <div className='flex flex-col text-start ml-1'>
                    <p><strong>{props.eventName}</strong></p>
                    <p style={{color: 'var(--accent-color)'}}>{props.eventType}</p>
                </div>
                <div className='calendar-event-dropdown-reply-btn'>
                    <button>
                        <FontAwesomeIcon icon={faArrowUpFromBracket}/>
                    </button>
                </div>
            </button>
        </div>
    );
};

export default CalendarEventPill;