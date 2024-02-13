import { useState } from "react";
import Message from "./Message.jsx";

function Messages() {
  return (
    <>
      <div className="Messages">
        <div className="Dashboard-heading">
          <h2>Messages</h2>
        </div>
        <div className="Messages-container">
          <div className="Messages-message-list">
            <div className="Message-search">
              <input type="text" value="" placeholder="search" />
              <div className="Message-search-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                  color="black"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
              </div>
            </div>
            {/* This amount of <Message /> components is temporary, logic will change when backend is implemented */}
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <div className="load-more-messages-container">
              <div className="load-more-messages">Load more</div>
            </div>
          </div>
          <div></div>
          <div className="Messages-message-chat">
            <div className="Messages-chat-heading">
              <div className="profile-pic-small">
                <p>UP</p>
              </div>
              <div className="Message-chat-heading-name">New User</div>
            </div>
            <div className="Messages-body"></div>
            <div className="Message-footer">
              <input type="text" value="" placeholder="Type a message" />
              <button className="send-message-button">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Messages;
