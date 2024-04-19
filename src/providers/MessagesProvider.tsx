import { createContext, PropsWithChildren, useContext, useState, useEffect, ReactNode } from "react";
import { CheckAuthentication } from '../api/AuthAPIFunctions';
import { User } from "../Interfaces/User";
import { CalendarEvent, NewEvent } from "../Interfaces/Events";
import { Conversation, ConversationUser, NewConversation, SendMessage } from "../Interfaces/Messages";

// Update your context type to include user and isAuthenticated
// Provide an initial context value that matches the AuthContextType
interface MessagesContextType {
    isLoading: boolean;
    createNewConversation: (newConversation: NewConversation) => Promise<Conversation>;
    addConversationUser: (newConversationUser: ConversationUser) => Promise<boolean>;
    sendMessage: (newMessage: SendMessage) => Promise<boolean>;
    getConversations: () => Promise<Conversation[]>;
};

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessages = (): MessagesContextType => {
    const context = useContext(MessagesContext);
    
    if (context === undefined){
        throw new Error('useMessages must be used within an MessagesProvider');
    }

    return context;
}

interface UserProviderProps {
    children: ReactNode;
  }




export const MessagesProvider = ({ children }: UserProviderProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const apiUrl = "http://localhost:7071";


    const HandleCreateNewConversation = async (newConversation: NewConversation): Promise<Conversation> => {
        try {
            // Create the new event
            const response = await fetch(`${apiUrl}/messages/create-conversation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newConversation),
            });

            const conversation: Conversation = await response.json();

            return conversation;
        } catch (error) {
            console.error("Error creating new conversation: ", error);
            throw error;
        }
    };

    const HandleAddConversationUser = async (newConversationUser: ConversationUser): Promise<boolean> => {
        try {
            // Create the new event
            const response = await fetch(`${apiUrl}/messages/add-conversation-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newConversationUser),
            });

            //if not 200, return false
            if (!response.ok) {
                return false;
            }

            return true;

        } catch (error) {
            console.error("Error adding conversation user: ", error);
            return false;
        }
    };

    const HandleSendMessage = async (newMessage: SendMessage): Promise<boolean> => {
        try {
            // Create the new event
            const response = await fetch(`${apiUrl}/messages/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newMessage),
            });

            //if not 200, return false
            if (!response.ok) {
                return false;
            }

            return true;

        } catch (error) {
            console.error("Error sending message: ", error);
            return false;
        }
    };

    const HandleGetConversations = async (): Promise<Conversation[]> => {
        try {
            // Create the new event
            const response = await fetch(`${apiUrl}/messages/get-conversations`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const conversations: Conversation[] = await response.json();

            return conversations;
        } catch (error) {
            console.error("Error getting conversations: ", error);
            throw error;
        }
    }

    return (
        <MessagesContext.Provider value={{ 
            isLoading: isLoading,
            createNewConversation: HandleCreateNewConversation,
            addConversationUser: HandleAddConversationUser,
            sendMessage: HandleSendMessage,
            getConversations: HandleGetConversations,

            }}>
            {children}
        </MessagesContext.Provider>
    );
}

