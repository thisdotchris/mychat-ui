import React from "react";
import * as services from "./../services/UserService";
import { AppContext } from "./../reducers/AppContext";
import * as proptypes from "prop-types";

function Login(props) {
  const [username, setUsername] = React.useState(null);
  const { currentUser } = React.useContext(AppContext);

  async function authUsername() {
    const result = await services.CheckUser(username);
    // update user socket id
    await services.UpdateUser({ _id: result._id, socketID: props.socket.id });
    // update state for socket it
    currentUser.dispatch({
      type: "set",
      payload: { ...result, socketID: props.socket.id },
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
          Join
        </button>
      </div>
    </div>
  );
}

Login.prototype = {
  socket: proptypes.object.isRequired,
};

export default Login;
