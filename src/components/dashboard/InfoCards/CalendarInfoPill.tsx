import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CalendarInfoPill: React.FC = () => (
  <div className="card p-20 cursor-pointer">
    <FontAwesomeIcon className="scale-150" icon={faEnvelope} size="2xl"/>
  </div>
);

export default CalendarInfoPill;