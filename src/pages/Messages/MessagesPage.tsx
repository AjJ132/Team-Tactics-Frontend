import React from 'react';
import MessageListSearchField from '../../components/messages/MessageListSearchField/MessageListSearchField';
import MessagesList from '../../components/messages/MessagesList/MessagesList';
import { Conversation, NewConversation } from '../../Interfaces/Messages';
import CreateConversationModal from '../../components/messages/CreateConversationModal';
import { useMessages } from '../../providers/MessagesProvider';


interface MessagesProps {
    
}

const MessagesPage: React.FC<MessagesProps> = ({ }) => {
    const [selectedConversation, setSelectedConversation] = React.useState<Conversation | null>(null);
    const [showCreateConversationModal, setShowCreateConversationModal] = React.useState<boolean>(false);

    const messagesProvider = useMessages();

    const handleConversationSelect = (conversation: Conversation) => {
        setSelectedConversation(conversation);
    };

    const handleCreateNewConversation = () => {
        setShowCreateConversationModal(true);
    }

    const handleModalClose = async (conversation? : NewConversation) => {
        //check if conversation is passed back
        if(conversation){
            //handle create new conversation in provider
            const newConversation = await messagesProvider.createNewConversation(conversation);

            //check if new conversation is created
            if(newConversation){
                //close
                setShowCreateConversationModal(false);
            } else {
                //handle error
                alert('Error creating new conversation');
            }

        } else {
            //close
            setShowCreateConversationModal(false);
        }
    }


    return (
        <>
        <CreateConversationModal onClose={handleModalClose} hideModal={!showCreateConversationModal} />
        <div className='messages-page-container'>
            <div className='messages-page-hotbar'>

            </div>
            <div className='messages-page-body-wrapper'>
                <div className='messages-page-message-list'>
                    <div className='p-4'>
                        <MessageListSearchField performSearch={(searchTerm) => console.log(searchTerm)}  createNewMessage={handleCreateNewConversation} />
                    </div>
                    <div className='messages-list'>
                        <MessagesList onConversationSelect={handleConversationSelect} />
                    </div>
                </div>
                <div className='messages-page-messages'>

                </div>
            </div>
        </div>
        </>
    );
};

export default MessagesPage;