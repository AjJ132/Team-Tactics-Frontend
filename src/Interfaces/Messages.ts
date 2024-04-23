export interface NewConversation {
    conversationName: string;
    userIds: string[];
    isGroup: boolean;
}

export interface Conversation {
    conversationId: string;
    conversationName: string;
    lastMessageSent: string;
    lastMessageSentTime: Date;
    users: ConversationUser[];
}

export interface ConversationUser {
    conversationId: string;
    userId: string;
    userName: string;
}

export interface SendMessage {
    conversationId: string;
    message: string;
}