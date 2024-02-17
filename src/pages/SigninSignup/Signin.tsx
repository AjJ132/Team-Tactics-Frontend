import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { UserSignin } from "../../api/AuthAPIFunctions";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();
  const navigate = useNavigate();

  const formSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
       const response = await UserSignin(email, password);
      if (response) {
        console.log("successfull signin");

        // Update auth context with the user object, also sets isAuthenticated to true
        auth.loginSuccess(response);

        //redirect to dashboard
        navigate("/", { replace: true });

      } else {
        console.log("failed signin");

        //DEV
        alert("Failed to sign in");
      }
    } catch (error) {
      console.error("Sign in has failed", error);
    }
  };

  return (
    <>
      <div className="Signin">
        <div className="form-container">
          <form onSubmit={formSubmission}>
            <div className="signin-container">
              <h1>Sign In</h1>
              <label className="signin-label-username">Email</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />{" "}
              <br />
              <label className="signin-label-password">Password</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div className="signin-checkbox-container">
                <input type="checkbox" id="keepmesignedin" />
                <label>Keep me signed in</label>
              </div>
              <button type="submit" className="login-btn">
                SIGN IN
              </button>
              <div className="signin-forgot-user-container">
                <a>Forgot username?</a>
                <a>Help center</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
