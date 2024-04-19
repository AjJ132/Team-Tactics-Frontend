import { useState } from "react";
import logo from '../../../public/vite.svg'
import SwitchSelector from "react-switch-selector";
import { UserSignup } from "../../api/AuthAPIFunctions";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function Signup() {

  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');



  const options = [
    {
      label: "Athlete",
      value: "Athlete",
      selectedBackgroundColor: "#f57e5a",
      innerHeight: 50
    },
    {
      label: "Coach",
      value: "Coach",
      selectedBackgroundColor: "#9f9f9f"
    }
  ];

  // Add a state variable for the selected option
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const onChange = (newValue: string) => {
    setSelectedOption(newValue); // Update the selected option when it changes
  };

  const handleSignup = async () => {
    const response = await UserSignup(email, password, firstName, lastName, selectedOption);

    if (response) {
      console.log('User signed up');

      //sign user in in auth provider
      auth.loginSuccess(response);
      window.location.href = '/';
      
    } else {
      console.error("Failed: Error signing up");
    }
  };

  const initialSelectedIndex = options.findIndex(({ value }) => value === "bar");

  return (
    <div className='signin-page'>
      <div className="modal-content p-8">
        <div className="flex flex-row items-center justify-start gap-2 w-full pb-8">
          <img src={logo} alt="logo" width={75}/>
          <h1>Team Tactics</h1>
        </div>

        <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
          <h2>Sign Up</h2>
        </div>  

        <div className="w-full flex flex-row items-center justify-center mt-8">
          <p style={{ height: "50px", width: "200px" }}>
            <SwitchSelector
              onChange={onChange as (selectedOptionValue: unknown) => void}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#2f2f2f"}
              fontColor={"#f5f5f5"}
            />
          </p>
        </div>

        {/* Conditional rendering based on the selected option */}
        {selectedOption === 'Athlete' && (
         <div>
          <div className="flex flex-row gap-2 content-center justify-start w-full pt-8">
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>First Name<strong>*</strong></p>
                <input type="text" placeholder="First Name" className="" onChange={(e) => setFirstName(e.target.value)} maxLength={30}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>Last Name<strong>*</strong></p>
                <input type="text" placeholder="Last Name" className="" onChange={(e) => setLastName(e.target.value)} maxLength={30}/>
            </div>
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Email<strong>*</strong></p>
              <input type="text" placeholder="Email" className="" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Password<strong>*</strong></p>
              <input type="password" placeholder="Password" className="" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Confirm Password<strong>*</strong></p>
              <input type="password" placeholder="Confirm Password" className="" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        )}
        {selectedOption === 'Coach' && (
          <div>
          <div className="flex flex-row gap-2 content-center justify-start w-full pt-8">
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>First Name<strong>*</strong></p>
                <input type="text" placeholder="First Name" className="" onChange={(e) => setFirstName(e.target.value)} maxLength={30}/>
            </div>
            <div className="flex flex-col content-center justify-start gap-0 w-full ">
                <p>Last Name<strong>*</strong></p>
                <input type="text" placeholder="Last Name" className="" onChange={(e) => setLastName(e.target.value)} maxLength={30}/>
            </div>
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Email<strong>*</strong></p>
              <input type="text" placeholder="Email" className="" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Password<strong>*</strong></p>
              <input type="password" placeholder="Password" className="" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
              <p>Confirm Password<strong>*</strong></p>
              <input type="password" placeholder="Confirm Password" className="" onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
        </div>
        )}

        <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
            <button className="signin-btn" onClick={handleSignup}>Register</button>
        </div>

        <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
            <p>Already have an account? <a href="/signin">Sign In</a></p>
        </div>

      </div>
    </div>
  );
}

export default Signup;