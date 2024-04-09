import React from 'react';
import MessageListSearchField from '../../components/messages/MessageListSearchField/MessageListSearchField';
import MessagesList from '../../components/messages/MessagesList/MessagesList';
import { Conversation } from '../../Interfaces/Messages';


interface MessagesProps {
    
}

const MessagesPage: React.FC<MessagesProps> = ({ }) => {
    const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);

    const handleConversationSelect = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };


    return (
        <div className='messages-page-container'>
            <div className='messages-page-hotbar'>

            </div>
            <div className='messages-page-body-wrapper'>
                <div className='messages-page-message-list'>
                    <div className='p-4'>
                        <MessageListSearchField performSearch={(searchTerm) => console.log(searchTerm)} />
                    </div>
                    <div className='messages-list'>
                        <MessagesList onConversationSelect={handleConversationSelect} />
                    </div>
                </div>
                <div className='messages-page-messages'>

                </div>
            </div>
        </div>
    );
};

export default MessagesPage;