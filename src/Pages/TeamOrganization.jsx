import React, { useState } from 'react';

const TeamOrganization = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: 'Group A', color: '#ff0000', members: ['John', 'Alice'] },
    { id: 2, name: 'Group B', color: '#00ff00', members: ['Bob', 'Emily'] },
  ]);

  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('');
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddGroup = () => {
    if (newGroupName && newGroupColor) {
      const newGroup = {
        id: groups.length + 1,
        name: newGroupName,
        color: newGroupColor,
        members: [],
      };
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setNewGroupColor('');
    }
  };

  const handleDeleteGroup = (groupId) => {
    setGroups(groups.filter((group) => group.id !== groupId));
  };

  const handleAddMember = (groupId) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);
    if (groupIndex !== -1 && newMemberName) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].members.push(newMemberName);
      setGroups(updatedGroups);
      setNewMemberName('');
    }
  };

  const handleDeleteMember = (groupId, memberIndex) => {
    const groupIndex = groups.findIndex((group) => group.id === groupId);
    if (groupIndex !== -1) {
      const updatedGroups = [...groups];
      updatedGroups[groupIndex].members.splice(memberIndex, 1);
      setGroups(updatedGroups);
    }
  };

  return (
    <div>
      <h2>Team Organization</h2>
      <div>
        <h3>Create New Group</h3>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
        />
        <input
          type="color"
          value={newGroupColor}
          onChange={(e) => setNewGroupColor(e.target.value)}
        />
        <button onClick={handleAddGroup}>Add Group</button>
      </div>
      {groups.map((group) => (
        <div key={group.id}>
          <h3 style={{ color: group.color }}>{group.name}</h3>
          <ul>
            {group.members.map((member, index) => (
              <li key={index}>
                {member}
                <button onClick={() => handleDeleteMember(group.id, index)}>Remove</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Member Name"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
          />
          <button onClick={() => handleAddMember(group.id)}>Add Member</button>
          <button onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
        </div>
      ))}
    </div>
  );
};

export default TeamOrganization;

