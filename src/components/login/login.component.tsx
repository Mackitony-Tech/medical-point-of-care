import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Authenticate } from "./login.resource";

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
    console.log(username, password);
  };
  return (
    <div>
      <h1 className="login">Login User</h1>
      <form onSubmit={handleSubmit} className="loginForm">
        <label>Username</label>
        <br />
        <input
          type="text"
          placeholder="UserName"
          onChange={(event) => setUserName(event.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />
        <input type="button" value="Sign In" onClick={handleSubmit} />
        <br />
        {invalidPassword && (
          <div>
            <label title="Invalid password or Username" />
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
