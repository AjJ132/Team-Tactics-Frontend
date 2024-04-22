import {  useEffect, useState } from "react";
import { useTeam } from "../../providers/TeamProvider";
import { Team } from "../../Interfaces/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy, faRotateRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

interface TeamManagementProps {
}

const TeamManagement: React.FC<TeamManagementProps> = ({}) => {
  const teamProvider = useTeam();

  const [myTeam, setMyTeam] = useState<Team>({} as Team);

  const [teamName, setTeamName] = useState<string>('');
  const [teamSport, setTeamSport] = useState<string>('');
  const [teamCity, setTeamCity] = useState<string>('');
  const [teamState, setTeamState] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);
  const [loadingNewCode, setLoadingNewCode] = useState<boolean>(false);


  useEffect(() => {
    const getMyTeam = async () => {
      const team = await teamProvider.handleGetMyTeam();
      setMyTeam(team);

      setTeamName(team.teamName);
      setTeamSport(team.teamSport);
      setTeamCity(team.teamCity);
      setTeamState(team.teamState);

    }
    
    getMyTeam();
  }, []);

  const getNewTeamCode = async () => {
    setLoadingNewCode(true);

    const code = await teamProvider.handleGenerateTeamCode();
    
    //if code is empty, then there was an error else set to new team code
    if(code === ''){
      alert('Failed to generate team code');
    } else {
      setMyTeam({...myTeam, teamJoinCode: code});
    }

    setLoadingNewCode(false);
  }

  const copyTeamCode = () => {
    navigator.clipboard.writeText(myTeam.teamJoinCode);

    //set copied to true, wait 5 seconds then set to false
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);

  }

  const updateTeam = async () => {
    const newTeam: Team = {
      ...myTeam,
      teamName: teamName,
      teamSport: teamSport,
      teamCity: teamCity,
      teamState: teamState
    }

    const updatedTeam = await teamProvider.handleUpdateTeam(newTeam);

    if(updatedTeam.teamId){
      alert('Team updated successfully');

      //set my team
      setMyTeam(updatedTeam);
    } else {
      alert('Failed to update team');
    }
  };

  const removeUserFromTeam = async (userId: string) => {
    const removed = await teamProvider.handleRemoveUserFromTeam(userId);

    if(removed){
      alert('User removed from team');

      //refresh page
      window.location.reload();
    } else {
      alert('Failed to remove user from team');
    }
  }

  const contactMember = (userId: string) => {
    //find users email
    const member = myTeam.teamMembers?.find(m => m.userId === userId);

    if(member){
      window.open(`mailto:${member.email}`);
    } else {
      alert('Failed to find user');
    }
  }


  return (
    <div className="h-full w-4/5 flex flex-col justify-start items-center">
      <h2>Manage {myTeam.teamName}</h2>
      <div className="horizontal-divider mt-4 mb-4"></div>
      <div className="w-full flex flex-row justify-center content-start mt-8">
        <div className="flex flex-col w-full justify-start items-center">
          <h3>Team Information</h3>
          <div className="flex flex-col w-1/2">
            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Team Name</p>

                <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                    <input type="text" placeholder="Team Name" className="" maxLength={40} value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Team Sport</p>

                <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                    <input type="text" placeholder="Team Sport" className="" maxLength={40} value={teamSport} onChange={(e) => setTeamSport(e.target.value)} />
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
                <p>Team City & State</p>

                <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                  <input type="text" placeholder="City" className="" maxLength={40} value={teamCity} onChange={(e) => setTeamCity(e.target.value)} />
                  <select className="" value={teamState} onChange={(e) => setTeamState(e.target.value)}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </div>
            </div>
            <div className="w-full flex flex-col items-start justify-center mt-8 gap-2">
              <p>Team Join Code</p>

             <div className='w-full flex flex-row h-full justify-center items-center gap-4'>
                <input type="text" placeholder="Team Join Code" className="" maxLength={40} value={myTeam.teamJoinCode} disabled />

                <button className="copy-button" onClick={copyTeamCode}>
                    {copied ? (
                        <FontAwesomeIcon icon={faCheck} />
                    ) : (
                        <FontAwesomeIcon icon={faCopy} />
                    )}
                </button>
                <button className="reset-button" onClick={getNewTeamCode}>
                    {loadingNewCode ? (
                        <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                        <FontAwesomeIcon icon={faRotateRight} />
                    )}
                </button>
            </div>

            </div>

            <div className="w-full flex flex-col items-center justify-center mt-8 gap-2">
              <button className="update-button" onClick={updateTeam}>Update Team</button>
            </div>

          </div>
        </div>
        <div className="vertical-divider"></div>
        <div className="flex flex-col w-full justify-start items-center">
          <h3>Team Members</h3>
          <table className="table-auto mt-8">
            <thead>
              <tr>
                <th className="mr-8">Name</th>
                <th>Contact</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {myTeam.teamMembers?.map((member) => (
                <tr key={member.userId}>
                  <td>{member.userName}</td>
                  <td>
                    <button className="update-button" onClick={() => contactMember(member.userId)}>Contact</button>
                  </td>
                  <td>
                    <button className="update-button" onClick={() => removeUserFromTeam(member.userId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TeamManagement;
