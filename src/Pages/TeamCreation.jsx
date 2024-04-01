import React, { useState } from 'react';

const TeamCreation = () => {
  const [teamName, setTeamName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [teamDescription, setTeamDescription] = useState('');

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleUpdateTeamInfo = () => {
    //  logic to update team information
    console.log('Updated Team Name:', teamName);
    console.log('Updated Team Description:', teamDescription);
    console.log('Updated Profile Picture:', profilePic);
  };

  return (
    <div>
      <h2>Create Team</h2>
      <div>
        <label htmlFor="teamName">Team Name:</label> <br/>
        <input
          type="text"
          id="teamName"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="teamDescription">Team Description:</label> <br/>
        <textarea
          id="teamDescription"
          value={teamDescription}
          onChange={(e) => setTeamDescription(e.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="profilePic">Profile Picture:</label>
        <input type="file" id="profilePic" onChange={handleProfilePicChange} />
      </div>
      <div> <br/>
        <button onClick={handleUpdateTeamInfo}>Create Team </button>
      </div>
    </div>
  );
};

export default TeamCreation;


