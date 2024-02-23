import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';

interface FeedCardProps {
  title: string;
}

const FeedInfoCard: React.FC<FeedCardProps> = ({ title }) => (
  <div className="card w-full p-4 flex flex-col">
    <div className='flex w-full flex-row justify-start items-center gap-4'>
        <div className="icon-button-secondary">
        <button>
            <FontAwesomeIcon icon={faRss} size="xl" />
        </button>
        </div>
        <h3>{title}</h3>
    </div>
  </div>
);

export default FeedInfoCard;