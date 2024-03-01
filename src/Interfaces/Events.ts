import { User_DTO } from "./User"

export interface NewEvent {
    title: string;
    description: string;
    startDate: Date; 
    endDate: Date;   
    color: string;
    assignMe: boolean;
    UserIds: string[];
}


export interface CalendarEvent {
    id: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    color: string,
    canUpdate: boolean,
    creatorId: string,
    creatorName: string,
    AssignedUsers: User_DTO[]
}
