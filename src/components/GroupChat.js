import React from "react";
import UserLogo from "./../user.svg";
import * as propstypes from "prop-types";
import { AppContext, actionsTypes } from "./../reducers/AppContext";

const cardStyle = {
  width: "100%",
  height: "500px",
};

const userIconStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#555",
};

function GroupChat(props) {
  console.log("GroupChat Component Render....");

  // const [gcMessage, setGCMessage] = React.useState([]);
  const message = React.useRef("");
  const { currentUser, gc } = React.useContext(AppContext);

  function listener(mssg) {
    // setGCMessage([...gcMessage, mssg]);
    gc.dispatch({
      type: actionsTypes.PUSH_GC,
      payload: {
        message: mssg,
      },
    });
  }

  function sendMessage() {
    props.socket.emit("message", {
      id: props.socket.id,
      username: currentUser.state.username,
      message: message.current,
    });
  }

  React.useEffect(() => {
    props.socket.addEventListener("message", listener);
    return () => {
      props.socket.removeEventListener("message", listener);
    };
  });

  const RenderBoxLeft = ({ _ }) => {
    return (
      <div className="rounded p-2 mb-1 clearfix bg-success">
        <img
          alt="user"
          src={UserLogo}
          className="rounded-circle float-left"
          style={userIconStyle}
        />
        <small className="float-right">
          <i>{new Date(_.date).toDateString()}</i>
        </small>
        <small className="float-left">
          <p>{_.username}</p>
        </small>
        <p className="pt-2 ml-2 float-left">{_.message}</p>
      </div>
    );
  };

  const RenderBoxRight = ({ _ }) => {
    return (
      <div className="rounded p-2 mb-1 clearfix bg-success">
        <img
          alt="user"
          src={UserLogo}
          className="rounded-circle float-right"
          style={userIconStyle}
        />
        <small className="float-left">
          <i>{new Date(_.date).toDateString()}</i>
        </small>
        <small className="float-right">
          <p>{_.username}</p>
        </small>
        <p className="pt-2 mr-2 float-right">{_.message}</p>
      </div>
    );
  };

  const RenderMeesageBox = () => {
    return gc.state.messages.map((m, idx) =>
      m.id === props.socket.id ? (
        <RenderBoxRight key={idx} _={m} />
      ) : (
        <RenderBoxLeft key={idx} _={m} />
      )
    );
  };

  const RenderMessageField = () => {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Message"
          onChange={(e) => (message.current = e.target.value)}
        />
        <button className="btn btn-success btn-sm" onClick={sendMessage}>
          Send
        </button>
      </div>
    );
  };

  const RenderGC = () => {
    return (
      <div className="container-fluid">
        <div className="card" style={cardStyle}>
          <div className="card-header" />
          <div
            className="card-body"
            style={{ maxHeight: "100%", overflow: "auto" }}
          >
            <RenderMeesageBox />
          </div>
          <div className="card-footer">
            <RenderMessageField />
          </div>
        </div>
      </div>
    );
  };

  return <RenderGC />;
}

GroupChat.prototype = {
  socket: propstypes.object.isRequired,
};

export default GroupChat;
