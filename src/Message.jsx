import { useState } from "react";

function Message() {
  return (
    <>
      <div className="Message">
        <div className="Message-preview">
          <div className="profile-pic-small">
            <p>UP</p>
          </div>
          <div className="Message-headings-container">
            <div>New User</div>
            <p>Hello World</p>
          </div>
          <div className="Message-time">
            <div>9:23 AM</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
