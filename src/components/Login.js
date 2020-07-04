import React from "react";
import * as services from "./../services/UserService";
import { AppContext } from "./../reducers/AppContext";

function Login() {
  const [username, setUsername] = React.useState(null);
  const { currentUser } = React.useContext(AppContext);

  async function authUsername() {
    const result = await services.CheckUser(username);
    currentUser.dispatch({
      type: "set",
      payload: result,
    });
  }

  return (
    <div className="container">
      <div
        className="mx-auto"
        style={{
          width: "30%",
          marginTop: "20%",
          marginLeft: "35%",
        }}
      >
        <input
          type="text"
          className="form-control"
          name="usr"
          placeholder="Username"
          style={{ width: "100%", margin: "2px" }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button
          className="btn btn-primary btn-sm"
          style={{ width: "100%", margin: "2px" }}
          onClick={authUsername}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
