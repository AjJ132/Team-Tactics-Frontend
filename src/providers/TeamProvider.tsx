import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react";
import { NewTeamDTO, Team } from "../Interfaces/User";

// Define the context type for team-related information and operations
type TeamProviderProps = PropsWithChildren & {
    myTeam: Team;
    handleSearchTeamViaCode: (teamCode: string) => Promise<Team>;
    handleCreateNewteam: (newTeam: NewTeamDTO) => Promise<Team>;
    handleJoinTeam: (teamId: string) => Promise<boolean>;
    handleGetMyTeam: () => Promise<Team>;
    handleGenerateTeamCode: () => Promise<string>;
    handleUpdateTeam: (team: Team) => Promise<Team>;
    handleRemoveUserFromTeam: (userId: string) => Promise<boolean>;

};

// Initialize the context with defaults
const TeamContext = createContext<TeamProviderProps>({ 
    myTeam: {} as Team,
    handleSearchTeamViaCode: async () => ({} as Team),
    handleCreateNewteam: async () => ({} as Team),
    handleJoinTeam: async () => false,
    handleGetMyTeam: async () => ({} as Team),
    handleGenerateTeamCode: async () => '',
    handleUpdateTeam: async () => ({} as Team),
    handleRemoveUserFromTeam: async () => false,
});

export default function TeamProvider({ children }: PropsWithChildren<{}>) {
    const apiUrl = "https://team-tactics-backend-linux.azurewebsites.net";
//const apiUrl = "http://localhost:7071"
    const [myTeam, setMyTeam] = useState<Team>({} as Team);


    const HandleSearchTeamViaCode = async (teamCode: string): Promise<Team> => {
        try{
            const response = await fetch(`${apiUrl}/teams/GetTeamViaCode?teamCode=${teamCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok){ //404 means team not found
                return {} as Team;
            }

            const data = await response.json();
            return data as Team;
        }
        catch (error){
            console.error('Failed to search team:', error);
            return {} as Team;
        }

    }

    const HandleCreateNewteam = async (newTeam: NewTeamDTO): Promise<Team> => {
        try{
            const response = await fetch(`${apiUrl}/teams/CreateNewTeam`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(newTeam),
            });

            if (!response.ok){
                return {} as Team;
            }

            const data = await response.json();

            //set my team
            setMyTeam(data as Team);

            //set team id in local storage
            localStorage.setItem('teamId', data.teamId);

            return data as Team;
        }
        catch (error){
            console.error('Failed to create team:', error);
            return {} as Team;
        }
    }

    const HandleJoinTeam = async (teamId: string): Promise<boolean> => {
        try{
            const response = await fetch(`${apiUrl}/teams/JoinTeam?teamId=${teamId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok){
                return false;
            }

            return true;
        }
        catch (error){
            console.error('Failed to join team:', error);
            return false;
        }
    }

    const HandleGetMyTeam = async (): Promise<Team> => {
        try{
            const response = await fetch(`${apiUrl}/teams/MyTeam`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok){
                return {} as Team;
            }

            const data = await response.json();

            //set my team
            setMyTeam(data as Team);

            //set team id in local storage
            localStorage.setItem('teamId', data.teamId);

            return data as Team;
        }
        catch (error){
            console.error('Failed to get my team:', error);
            return {} as Team;
        }


    };

    const HandleGenerateTeamCode = async (): Promise<string> => {

        try{

            //get team id from myTeam 
            const teamId = myTeam.teamId;
            const response = await fetch(`${apiUrl}/teams/GenerateTeamCode?teamId=${teamId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok){
                return '';
            }

            const data = await response.json();
            return data.teamJoinCode as string;
        }
        catch (error){
            console.error('Failed to generate team code:', error);
            return '';
        }
    }

    const HandleUpdateTeam = async (team: Team): Promise<Team> => {
        try{
            const response = await fetch(`${apiUrl}/teams/UpdateTeam`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(team),
            });

            if (!response.ok){
                return {} as Team;
            }

            const data = await response.json();
            return data as Team;
        }
        catch (error){
            console.error('Failed to update team:', error);
            return {} as Team;
        }
    }

    const HandleRemoveUserFromTeam = async (userId: string): Promise<boolean> => {
        try{
            const response = await fetch(`${apiUrl}/teams/RemoveUserFromTeam?teamId=${myTeam.teamId}&userId=${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok){
                return false;
            }

            return true;
        }
        catch (error){
            console.error('Failed to remove user from team:', error);
            return false;
        }
    }


    return (
        <TeamContext.Provider value={{ myTeam, handleSearchTeamViaCode: HandleSearchTeamViaCode,
            handleCreateNewteam: HandleCreateNewteam, 
            handleJoinTeam: HandleJoinTeam, 
            handleGetMyTeam: HandleGetMyTeam ,
            handleGenerateTeamCode: HandleGenerateTeamCode,
            handleUpdateTeam: HandleUpdateTeam,
            handleRemoveUserFromTeam: HandleRemoveUserFromTeam
         }}>
            {children}
        </TeamContext.Provider>
    );
}

// Custom hook for consuming the team context
export const useTeam = () => {
    const context = useContext(TeamContext);

    if (context === undefined){
        throw new Error('useTeam must be used within a TeamProvider');
    }

    return context;
}
