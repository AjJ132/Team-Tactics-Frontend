import { SetStateAction, useState } from "react";
import { useAuth } from "../../providers/AuthProvider";

function TeamCreation() {
  const [addMember, setAddMember] = useState<string>("");
  const [members, setMembers] = useState<string[]>([]);

  const AddMember = () => {
    if (addMember.trim()) {
      setMembers([...members, addMember]);
    }
    setAddMember("");
  };

  const handleAddMemberValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddMember(event.target.value);
  };

  return (
    <div className="flex flex-col w-4/5 h-full gap-14">
      <div className="flex justify-center items-center">
        <h1 className="">Teams</h1>
      </div>
      <div>
        <div className="mb-10">
          <h2>Create new team</h2>
        </div>
        <div>
          <div className="mb-3.5">
            <h3>Team Name: </h3>
          </div>
          <input
            type="text"
            className="w-80 mb-6"
            onChange={handleAddMemberValue}
          />
          <div className="mb-4">
            <h3>Team Members: </h3>
          </div>
          <div className="mb-3.5">
            <button className="mr-3" onClick={AddMember}>
              Add
            </button>
            <button>Remove</button>
          </div>

          <div>Send invite via email</div>
        </div>
      </div>
    </div>
  );
}

export default TeamCreation;
