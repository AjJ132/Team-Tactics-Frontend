import React, {useState} from 'react';
import './signin-signup.css';
import {useNavigate} from 'react-router-dom';
import { UserSignin } from '../../api/AuthAPIFunctions';
import logo from '../../../public/vite.svg'
import { useContext } from 'react';
import { useAuth } from '../../providers/AuthProvider'

const UserSigninPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = useAuth();

    const navigate = useNavigate();

    const handlesignin = async () => {
      try {
          const response = await UserSignin(email, password);
  
          if (response) {
              // If the response is not null, then the user is signed in
              //set the user object in the context and set isAuthenticated to true
              auth.loginSuccess(response);

              navigate('/');
          } else {
              // Handle sign-in failure without throwing an error, as error is logged in UserSignin
              console.error("Failed: Error signing in");
          }
      } catch (error) {
          // Handle unexpected errors that might occur outside the try-catch in UserSignin
          console.error("Unexpected error: ", error);
      }
  };

  const handleOfflineMode = () => {
    console.log('offline mode');
    auth.toggleOfflineMode(true)
    navigate('/');
  };
  

    

    return (
        <div className='signin-page'>
            <div className="modal-content p-8">
                <div className="flex flex-row items-center justify-start gap-2 w-full pb-8">
                    <img src={logo} alt="logo" width={75}/>
                    <h1>Team Tactics</h1>
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-8">
                    <h2>Sign In</h2>
                </div>  
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-8">
                    <p>Email<strong>*</strong></p>
                    <input type="text" placeholder="Email" className="" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col content-center justify-start gap-0 w-full pt-6">
                    <p>Password<strong>*</strong></p>
                    <input type="password" placeholder="Password" className="" onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="flex flex-row content-center justify-start gap-2 w-full pt-2">
                    <p>Forgot password? <a >Reset Password</a></p>
                </div>

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <button className="modal-content-btn signin-btn" onClick={handlesignin}>Sign In</button>
                </div>

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>

                <div className="flex flex-row content-center justify-center gap-2 w-full pt-14">
                    <p>DEV__OFFLINE_MODE</p>
                    <button onClick={handleOfflineMode}>Offline</button>
                </div>

            </div>
        </div>
    );
};

export default UserSigninPage;