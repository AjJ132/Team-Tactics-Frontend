export interface User {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
    role: string;
    teamId?: string;
}

export interface User_DTO{
    firstName?: string;
    lastName?: string;
    id?: string;
}

export interface SigninModel {
    email: string;
    password: string;
}

export interface Team {
    teamId: string;
    ownerName: string;
    teamName: string;
    teamSport: string;
    teamCity: string;
    teamState: string;
    teamJoinCode: string;
    dateCreated: string;

    teamMembers?: TeamMemberDTO[];
}   

export interface TeamMemberDTO{
    userId: string;
    userName: string;
    email: string;
}

export interface NewTeamDTO {
    teamName: string;
    teamSport: string;
    teamCity: string;
    teamState: string;
}

