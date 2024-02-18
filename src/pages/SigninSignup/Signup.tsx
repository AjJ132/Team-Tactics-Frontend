import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

 
  return (
    <>
      <div className="Signin">
        <div className="form-container">
          <form>
            <div className="signin-container">
              <h1>Sign Up</h1>
              <label className="signin-label-username">First Name</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                value={email}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />{" "}
              <br />
              <label className="signin-label-password">Last Name</label>
              <br />
              <input
                type="text"
                id="username"
                name="username"
                value={email}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
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
                <label>Agree to terms</label>
              </div>
              <button className="login-btn">SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
