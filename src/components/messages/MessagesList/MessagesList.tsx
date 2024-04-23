import React, { useEffect, useState } from 'react';
import { useMessages } from '../../../providers/MessagesProvider';
import { Conversation } from '../../../Interfaces/Messages';

interface MessagesListProps {
    onConversationSelect: (conversation: Conversation) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({ onConversationSelect }) => {
    const messagesProvider = useMessages();

    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        const fetchConversations = async () => {
            const conversations = await messagesProvider.getConversations();
            setConversations(conversations);
        };

        fetchConversations();
    }, []);

    const handleConversationSelect = (conversation: Conversation) => {
        onConversationSelect(conversation);
    };

    return (
        <div>
            {conversations.map((conversation) => (
                <div key={conversation.conversationId} className="conversation-row" onClick={() => handleConversationSelect(conversation)}>
                    <h3>{conversation.conversationName.length > 20 ? conversation.conversationName.substring(0, 20) + '...' : conversation.conversationName}</h3>
                    {/* <p>{conversation.lastMessageSent.length > 50 ? conversation.lastMessageSent.substring(0, 50) + '...' : conversation.lastMessageSent}</p> */}
                </div>
            ))}
        </div>
    );
}

export default MessagesList;