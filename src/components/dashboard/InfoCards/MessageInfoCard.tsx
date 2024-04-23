import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import UserProfilePill from '../../UserProfilePill/UserProfilePill';

interface MessageCardProps {
  title: string;
  newMessagesCount: number;
  name: string;
  role: string;
}

const MessageInfoCard: React.FC<MessageCardProps> = ({ title, newMessagesCount, name, role }) => (
  <div className="flex flex-col">
    <div className="flex flex-row">
      <h3>{title}</h3>
      <div className="icon-button-transparent ml-auto">
        <button className="p-0 ml-auto">
          <div className="w-fit h-fit ml-auto">
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </button>
      </div>
    </div>
    <p>
      <strong style={{ color: 'var(--accent-color)' }}>{newMessagesCount}</strong> new messages
    </p>
    <div className="mt-auto">
      <UserProfilePill name={name} role={role} />
    </div>
  </div>
);

export default MessageInfoCard;