// WelcomeSign.tsx
import React from 'react';
import ActionPill from '../../Action-Pill/ActionPill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faEnvelope, faGear } from '@fortawesome/free-solid-svg-icons';
import RotatingGear from './RotatingGear';
import { NewEvent } from '../../../Interfaces/Events';

// WelcomeSignProps.ts
export interface WelcomeSignProps {
    today: Date;
    firstName: string;
  }

const WelcomeSign: React.FC<WelcomeSignProps> = ({ today, firstName }) => {
  const handleNewCreateEvent = (newEvent : NewEvent) => {
    //null check
    console.log(newEvent);
  };

  return (
    <div className="flex flex-row justify-between items-center">
      <div className='flex flex-col items-start'>
        <h1>
            Good {today.getHours() < 12 ? "Morning" : today.getHours() < 18 ? "Afternoon" : "Evening"}, {firstName}!
        </h1>
        <div className="flex flex-row gap-4">
            <ActionPill action="New Message" icon={<FontAwesomeIcon icon={faEnvelope} />} modalType='none' returnData={undefined}/>
            <ActionPill action="New Event" icon={<FontAwesomeIcon icon={faCalendarDays} />} modalType='CreateEventModal' returnData={handleNewCreateEvent}/>
        </div>
      </div>
      <RotatingGear />
    </div>
  );
};

export default WelcomeSign;