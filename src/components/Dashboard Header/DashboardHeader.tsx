import { useAuth } from "../../providers/AuthProvider";

const DashboardHeader: React.FC = () => {
    const auth = useAuth();
    return (
      <div className="Dashboard-heading">
        <h2>Welcome, {auth.user?.firstName}</h2>
        <p>Date</p>
      </div>
    );
};

export default DashboardHeader;