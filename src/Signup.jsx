import { useState } from "react";

import "./App.css";

function Signup() {
  return (
    <>
      <div className="Signin">
        <div className="form-container">
          <form>
            <div className="signin-container">
              <h1>Sign Up</h1>
              <label className="signin-label-username">Email</label>
              <br />
              <input type="text" id="username" name="username" /> <br />
              <label className="signin-label-password">Password</label>
              <br />
              <input type="text" id="username" name="username" />
              <div className="signin-checkbox-container">
                <input type="checkbox" id="keepmesignedin" />
                <label>Keep me signed in</label>
              </div>
              <button className="login-btn">SIGN UP</button>
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

export default Signup;
