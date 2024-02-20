import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import UserProfilePill from "../../components/UserProfilePill/UserProfilePill";
import CalendarEventPill from "../../components/CalendarEventPill/CalendarEventPill";

function Dashboard() {
  const auth = useAuth();
  
  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
   
    
      <div className="flex flex-col w-full h-full gap-14">
        <div className="w-full h-fit flex justify-center items-center">
          <h1>
            Good {today.getHours() < 12 ? "Morning" : today.getHours() < 18 ? "Afternoon" : "Evening"}, {auth.user?.firstName}!
          </h1>
          <div className="flex flex-row gap-16 ml-auto">
            <div className="flex flex-row gap-4">
              <div className="card p-20">
                <FontAwesomeIcon className="scale-150" icon={faEnvelope} size="2xl"/>
              </div>
              <div className="flex flex-col">
                <h2>Messages</h2>
                <p><strong style={{color: 'var(--accent-color)'}}>3</strong> new messages</p>
                <div className="mt-auto">
                  <UserProfilePill name={auth.user?.firstName + ' ' + auth.user?.lastName} role="Coach" />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="card p-20">
                <FontAwesomeIcon className="scale-150" icon={faCalendarDays} size="2xl"/>
              </div>
              <div className="flex flex-col">
                <h2>Events</h2>
                <p><strong style={{color: 'var(--accent-color)'}}>1</strong> upcoming events</p>
                <div className="mt-auto">
                  <CalendarEventPill eventName="Yoga Class" eventType="Exercise" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="icon-button">
                <button className="p-12">
                  <FontAwesomeIcon icon={faCalendarDays} size="2xl" />
                </button>
              </div>
              <div className="icon-button">
                <button className="p-12">
                  <FontAwesomeIcon icon={faXmark} size="2xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card w-full p-4">
            <div className="icon-button-secondary">
              <button>
                <FontAwesomeIcon icon={faCalendarDays} size="xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
  
  );
}

export default Dashboard;
