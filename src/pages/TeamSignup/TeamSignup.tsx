import React, { useEffect, useState } from 'react';
import { NewTeamDTO, Team, User } from '../../Interfaces/User';
import logo from '../../../public/vite.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useTeam } from '../../providers/TeamProvider';
import { useNavigate } from 'react-router-dom';

interface TeamSignupProps {
    user?: User | null;
}

const TeamSignup: React.FC<TeamSignupProps> = ({user}) => {
    const navigate = useNavigate();
    const teamProvider = useTeam();

    const [teamCodeValid, setTeamCodeValid] = useState<boolean>(false);
    const [teamCode, setTeamCode] = useState<string>('');
    const [foundTeam, setFoundTeam] = useState<boolean>(false);
    const [isCoach, setIsCoach] = useState<boolean>(false);
    const [team, setTeam] = useState<Team>({} as Team);


    const [teamName, setTeamName] = useState<string>('');
    const [teamSport, setTeamSport] = useState<string>('');
    const [teamCity, setTeamCity] = useState<string>('');
    const [teamState, setTeamState] = useState<string>('');

    const [states, setStates] = useState<string[]>([]);

    useEffect(() => {
        setStates([
            'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
        ]);
    }, []);


    useEffect(() => {
        //check local storage for role, if 2 then coach else player
        const role = localStorage.getItem('role');
        if(role === '2') {
            console.log('is coach');
            setIsCoach(true);
        }

    }, []);

    const handleSignout = async () => {
        const apiUrl = "http://localhost:7071";

        try {
            const response = await fetch(`${apiUrl}/auth/signout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                // Throw an error with the status code for non-2xx responses
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            //remove local storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('role');
            localStorage.removeItem('teamId');

            //redirect to login
            navigate('/signin');

        } catch (error) {
            console.error("Error in User Signout: ", (error as Error).message);
            return null; // Return null in case of error
        }
    }

    

    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.toUpperCase();
        const code = event.target.value;
        setTeamCode(code);
        if(code.length === 6) {
            const team = await teamProvider.handleSearchTeamViaCode(code);

            console.log('team:', team);

            if(team.teamId) {

                //set team
                setTeam(team);

                setFoundTeam(true);
                setTeamCodeValid(true);
            } else {
                setFoundTeam(false);
                setTeamCodeValid(false);
            }

        } else {
            setTeamCodeValid(false);
            setFoundTeam(false);
        }
    }
    
    const handleCreateNewTeam = async () => {
        const newTeam: NewTeamDTO = {
            teamName: teamName,
            teamSport: teamSport,
            teamCity: teamCity,
            teamState: teamState
        }

        const team = await teamProvider.handleCreateNewteam(newTeam);

        if(team.teamId) {
            console.log('team created:', team);

            //navigate to dashboard
            navigate('/');

        }
    }

    const handleJoinTeam = async () => {
        const teamId = team.teamId;

        const joined = await teamProvider.handleJoinTeam(teamId);

        if(joined) {
            console.log('team joined:', team);

            //navigate to dashboard
            navigate('/');
        } else {
            alert('Failed to join team');
        }
    }

    return (
        <div className='signin-page'>
            { isCoach ? (
                <div className="modal-content p-8">
                    <div className="flex flex-row items-center justify-start gap-2 w-full pb-8">
                        <img src={logo} alt="logo" width={75}/>
                        <h1>Team Tactics</h1>
                    </div>

                    <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                        <h2>Create Your Team</h2>
                    </div>  

                    <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                        <p>Please enter your team's name:</p>

                        <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                            <input type="text" placeholder="Team Name" className="" maxLength={40} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                        <p>Please enter your team's sport:</p>

                        <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                            <input type="text" placeholder="Team Sport" className="" maxLength={40} value={teamSport} onChange={(e) => setTeamSport(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                        <p>Please enter your team's city & state:</p>

                        <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                            <input type="text" placeholder="City" className="" maxLength={40} value={teamCity} onChange={(e) => setTeamCity(e.target.value)} />
                            <select className="" value={teamState} onChange={(e) => setTeamState(e.target.value)}>
                                {states.map((state, index) => (
                                    <option key={index} value={state}>{state}</option>
                                ))}
                            </select>

                            </div>
                    </div>

                    <div className="flex flex-col content-center justify-start gap-2 w-full pt-8">
                        
                        <button className="modal-content-btn signin-btn" onClick={handleCreateNewTeam}>Create Team</button>

                    </div>

                    <div className='w-full flex flex-col items-center justify-center mt-8 gap-2'>
                        <a href="#" onClick={handleSignout}>Sign Out</a>
                    </div>


                </div>
            ) : (
                <div className="modal-content p-8">
                    <div className="flex flex-row items-center justify-start gap-2 w-full pb-8">
                        <img src={logo} alt="logo" width={75}/>
                        <h1>Team Tactics</h1>
                    </div>

                    <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                        <h2>Find Your Team</h2>
                    </div>  

                    <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                        <p>Please enter your 6-digit team code:</p>

                        <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                            <input type="text" placeholder="Example Team Code: ABC123" className="" onChange={handleInputChange} maxLength={6}/>
                            { teamCodeValid ? <FontAwesomeIcon icon={faCircleCheck} color='green' size='2xl' style={{color: "green"}} /> : <FontAwesomeIcon icon={faCircleXmark} style={{color: "red"}} size='2xl' /> }
                        </div>
                    </div>
                   { foundTeam ? (
                       <div className="team-card flex flex-col items-center justify-start gap-2 w-full pt-8 shadow-lg rounded-lg">
                            <h3 className="team-name text-2xl font-bold"> {team.teamName} </h3>
                            <p className="owner-name text-lg">Owner: {team.ownerName}</p>
                            <p className="team-sport text-md">{team.teamSport} </p>
                            <p className="team-location text-sm">{team.teamCity}, {team.teamState} </p>

                            <button className="modal-content-btn signin-btn mt-8" onClick={handleJoinTeam}>Join Team</button>
                        </div>
                    ) : (
                        <></>
                    )}

                    <div className='w-full flex flex-col items-center justify-center mt-8 gap-2'>
                        <a href="#" onClick={handleSignout}>Sign Out</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeamSignup;