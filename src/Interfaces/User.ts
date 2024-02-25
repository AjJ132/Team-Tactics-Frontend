export interface User {
    firstName: string;
    lastName: string;
    userId: string;
    email: string;
    role: string;
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

