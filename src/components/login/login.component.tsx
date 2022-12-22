import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticate } from "./login.resource";
import Openmrs from "../../images/Openmrs.png";
import "./login.component.css";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    Authenticate(username, password).then(
      ({ authenticated, sessionId, user }) => {
        authenticated ? navigate("/dashboard") : setInvalidPassword(true);
        window.sessionStorage.setItem("auth.credentials", authenticated);
        window.sessionStorage.setItem("auth.sessionId", sessionId);
        window.sessionStorage.setItem("auth.user.uuid", user.uuid);
        window.sessionStorage.setItem("auth.user.username", user.username);
      }
    );
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Login User</h1>
      <img className="logo" src={Openmrs} alt="Logo" />
      <form onSubmit={handleSubmit} className="loginForm">
        <label className="label">Username</label>
        <br />
        <input
          className="input"
          type="text"
          placeholder="UserName"
          onChange={(event) => setUserName(event.target.value)}
        />
        <br />
        <label className="label">Password</label>
        <br />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input
          className="loginBtn"
          type="button"
          value="Sign In"
          onClick={handleSubmit}
        />
        <br />
        {invalidPassword ? <label title="Invalid password or Username" /> : ""}
      </form>
    </div>
  );
}

export default Login;
