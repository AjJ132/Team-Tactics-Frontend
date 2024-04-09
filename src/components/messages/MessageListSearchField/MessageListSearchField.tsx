import React from 'react';

interface MessageListSearchFieldProps {
    performSearch: (searchTerm: string) => void;
}

const MessageListSearchField: React.FC<MessageListSearchFieldProps> = ({performSearch}) => {
    // component logic goes here

    return (
        <div className='w-full flex flex-row'>
            <input type="text" placeholder="Search messages" className='w-full px-2 py-1 border border-gray-300 rounded-lg' onChange={(e) => performSearch(e.target.value)} />
        </div>
    );
};

export default MessageListSearchField;