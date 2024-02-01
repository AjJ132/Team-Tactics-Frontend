import { useState } from "react";
import { signin_service } from "./services/loginservice";

import "./App.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await signin_service(email, password);
      if (res) {
        console.log("successfull signin");
      } else {
        console.log("failed signin");
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
