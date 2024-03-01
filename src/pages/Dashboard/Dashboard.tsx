import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faEnvelope, faRss, faGears, faXmark } from "@fortawesome/free-solid-svg-icons";
import UserProfilePill from "../../components/UserProfilePill/UserProfilePill";
import CalendarEventPill from "../../components/CalendarEventPill/CalendarEventPill";
import ActionPill from "../../components/Action-Pill/ActionPill";
import WelcomeSign from "../../components/dashboard/Welcome Sign/WelcomeSign";
import MessageInfoCard from "../../components/dashboard/InfoCards/MessageInfoCard";
import FeedInfoCard from "../../components/dashboard/InfoCards/FeedInfoCard";
import CalendarInfoPill from "../../components/dashboard/InfoCards/CalendarInfoPill";

function Dashboard() {
  const auth = useAuth();
  
  const today = new Date();
  const date = `${today.toLocaleString("default", {
    weekday: "long",
  })}, ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getDate()}, ${today.getFullYear()}`;

  return (
   
    
      <div className="flex flex-col w-4/5 h-full gap-14">
       <WelcomeSign today={today} firstName={auth.user?.firstName || ""} />
        <div className="flex flex-col gap-8">
          <div className="card w-full p-4">
            <div className="icon-button-secondary">
              <button>
                <FontAwesomeIcon icon={faCalendarDays} size="xl" />
              </button>
            </div>
          </div>
          <div className="flex flex-row gap- justify-around">
            <div className="flex flex-row justify-center gap-4 w-full">
              <CalendarInfoPill />
              <MessageInfoCard title="Messages" newMessagesCount={3} name="John Doe" role="Admin" />
            </div>
            <FeedInfoCard title="Feed" />
          </div>
        </div>
      </div>
      
  
  );
}

export default Dashboard;
