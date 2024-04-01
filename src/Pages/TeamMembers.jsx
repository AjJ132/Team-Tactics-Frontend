import React, { useState } from 'react';

const TeamMembers = () => {
  const [email, setEmail] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', expiration: 'Never' },
    { id: 2, name: 'Alice Smith', email: 'alice@example.com', expiration: 'Never' },
  ]);

  const handleAddMemberByEmail = () => {
    if (email) {
      const newMember = {
        id: members.length + 1,
        name: '', //  logic to fetch member name
        email: email,
        expiration: 'Never',
      };
      setMembers([...members, newMember]);
      setEmail('');
    }
  };

  const handleAddMemberByJoinCode = () => {
    if (joinCode) {
      //logic to join member by join code
    }
  };

  const handleAddMemberByCustomLink = () => {
    if (customLink) {
      //logic to join member by custom link
    }
  };

  const handleRemoveMember = (memberId) => {
    setMembers(members.filter((member) => member.id !== memberId));
  };

  return (
    <div>
      <h2>Team Members</h2>
      <div>
        <h3>Add Member by Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleAddMemberByEmail}>Add Member</button>
      </div>
      <div>
        <h3>Add Member by Join Code</h3>
        <input
          type="text"
          placeholder="Join Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={handleAddMemberByJoinCode}>Join</button>
      </div>
      <div>
        <h3>Add Member by Custom Link</h3>
        <input
          type="text"
          placeholder="Custom Link"
          value={customLink}
          onChange={(e) => setCustomLink(e.target.value)}
        />
        <button onClick={handleAddMemberByCustomLink}>Join</button>
      </div>
      <div>
        <h3>Team Members List</h3>
        <ul>
          {members.map((member) => (
            <li key={member.id}>
              {member.name || 'Unknown'} - {member.email} - Expires: {member.expiration}
              <button onClick={() => handleRemoveMember(member.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamMembers;


