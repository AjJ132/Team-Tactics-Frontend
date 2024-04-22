import React, { useState, useEffect } from 'react';
import ModalBody from '../Modal Body/ModalBody';
import { ConversationUser, NewConversation } from '../../Interfaces/Messages';
import { useMessages } from '../../providers/MessagesProvider';
import { json } from 'stream/consumers';

type CreateConversationModalProps = {
    onClose: (conversation?: NewConversation) => void;
    hideModal: boolean;
};

const CreateConversationModal: React.FC<CreateConversationModalProps> = ({ onClose, hideModal }) => {

    const [conversationName, setConversationName] = useState<string>('');
    const [userSearch, setUserSearch] = useState<string>('');
    const messagesProvider = useMessages();
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [foundUsers, setFoundUsers] = useState<ConversationUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<ConversationUser[]>([]);

    const handleCancel = () => {
        onClose();
    }

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchTerm(userSearch);
        }, 500);

        return () => {
            clearTimeout(timerId);
        };
    }, [userSearch]);

    useEffect(() => {
        if (debouncedSearchTerm) {
            handleSearchUsers();
        }
    }, [debouncedSearchTerm]);

    const handleCreateConversation = async () => {

        //esnure conversation name is not empty
        if(conversationName === ''){
            alert('Please enter a conversation name');
            return;
        }

        //ensure selected users is not empty
        if(selectedUsers.length === 0){
            alert('Please select at least one user');
            return;
        }

        console.log('Creating conversation with users: ', conversationName, selectedUsers);
        const newConversation: NewConversation = {
            conversationName: conversationName,
            userIds: selectedUsers.map(user => user.userId),
            isGroup: false,
        };

        console.log('Creating new conversation: ', JSON.stringify(newConversation));

        onClose(newConversation);
    }

    const handleSearchUsers = async () => {
        const users = await messagesProvider.searchUsers(debouncedSearchTerm);
        setFoundUsers(users);
    }

    const handleUserSelect = (user: ConversationUser) => {
        setSelectedUsers(prevUsers => [...prevUsers, user]);
    }

    if (hideModal) {
        return null;
    }

    return (
        <ModalBody title='Create Conversation' subtitle='Select Users to create a new conversation with.' actionText='Create' cancelText='Cancel' hideCancel={false} onCancel={handleCancel} onActionSuccessful={handleCreateConversation} modalContent={
        <div className='flex flex-col items-start content-start gap-4'>

            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Conversation Name</p>

                <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                    <input type="text" placeholder="Conversation Name" className="" maxLength={40} value={conversationName} onChange={(e) => setConversationName(e.target.value)} />
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Search Users</p>

                <div className='flex flex-row gap-4'>
                    <input type="text" placeholder="Search Users" className='w-full' value={userSearch} onChange={(e) => setUserSearch(e.target.value)} />
                    <button className='text-nowrap pr-4 pl-4' onClick={handleSearchUsers}>
                        Add User
                    </button>
                </div>

                {/* Display found users as a dropdown */}
                <div className='mt-4 w-full max-h-64 overflow-auto' style={{backgroundColor: "var(--accent-color)", borderRadius: "12px"}}>
                    {foundUsers.map((user, index) => (
                        <div key={index} className='cursor-pointer p-2 hover:bg-gray-500' onClick={() => handleUserSelect(user)}>
                            {user.userName}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Selected Users</p>

                <div className='flex flex-row gap-4 w-full'>
                    {selectedUsers.map((user, index) => (
                        <div key={index} className='flex flex-row justify-betweencursor-pointer w-full p-2 hover:bg-gray-500' onClick={() => setSelectedUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId))}>
                            {user.userName}

                            <button className='text-nowrap pr-4 pl-4 ml-auto' onClick={() => setSelectedUsers(prevUsers => prevUsers.filter(u => u.userId !== user.userId))}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

            </div>
            
        </div>
        
        }/>
    );
};

export default CreateConversationModal;