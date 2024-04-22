import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface MessageListSearchFieldProps {
    performSearch: (searchTerm: string) => void;
    createNewMessage: () => void;
}

const MessageListSearchField: React.FC<MessageListSearchFieldProps> = ({performSearch, createNewMessage}) => {

    return (
        <div className='w-full flex flex-row gap-4'>
            <input type="text" placeholder="Search messages" className='w-full px-2 py-1 border border-gray-300 rounded-lg' onChange={(e) => performSearch(e.target.value)} />
            <button className='create-new-message-button' onClick={createNewMessage}>
                <FontAwesomeIcon icon={faPlusSquare} className='cursor-pointer' />
            </button>
        </div>
    );
};

export default MessageListSearchField;