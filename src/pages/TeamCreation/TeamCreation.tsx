import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

function TeamCreation() {
  const auth = useAuth();

  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
    <div className="Dashboard-body">
    <div className="dashboard-components-container">
      {/* <div>hello</div> */}
      <div>
        <h1>Teams</h1>
      </div>
    </div>
  </div>
  );
}

export default TeamCreation;