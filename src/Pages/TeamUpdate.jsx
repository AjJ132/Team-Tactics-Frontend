// TeamUpdate.js
import React from 'react';

const TeamUpdate = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    //  form submission
  };

  return (
    <div>
      <h2>Update Team</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="teamName">Team Name:</label>
        <input type="text" id="teamName" name="teamName" />
        <button type="submit">Update Team</button>
      </form>
    </div>
  );
};

export default TeamUpdate;

