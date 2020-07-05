import React from "react";
import UserLogo from "./../user.svg";
import { AppContext, actionsTypes } from "./../reducers/AppContext";
import * as propTypes from "prop-types";

const footerStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  width: "100%",
  height: "400px",
};

const userIconStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#555",
};

function Footer(props) {
  console.log("Footer Component Render....");

  const pm = React.useRef("");

  const { boxes, currentUser } = React.useContext(AppContext);

  function listener(mssg) {
    boxes.dispatch({
      type: actionsTypes.UPDATE_BOX,
      payload: {
        box: {
          socketID: mssg.socketID,
          name: mssg.username,
          message: mssg.message,
          date: mssg.date,
          _id: mssg._id,
        },
      },
    });
  }

  function sendPM(recipient) {
    props.socket.emit("pm", {
      message: pm.current,
      username: currentUser.state.username,
      socketID: recipient.box.socketID,
      _id: recipient.box._id,
    });
  }

  React.useEffect(() => {
    props.socket.addEventListener("pm", listener);
    return () => {
      props.socket.removeEventListener("pm", listener);
    };
  });

  const RenderBoxLeft = () => {
    return (
      <div className="rounded p-2 mb-1 clearfix bg-success">
        <img
          alt="user"
          src={UserLogo}
          className="rounded-circle float-left"
          style={userIconStyle}
        />
        <small className="float-right">
          <i>asdasdasd</i>
        </small>
        <p className="pt-2 ml-2 float-left">zxczxczxc</p>
      </div>
    );
  };

  const RenderBoxRight = () => {
    return (
      <div className="rounded p-2 mb-1 clearfix bg-success">
        <img
          alt="user"
          src={UserLogo}
          className="rounded-circle float-right"
          style={userIconStyle}
        />
        <small className="float-left">
          <i>asdasdasd</i>
        </small>
        <p className="pt-2 mr-2 float-right">zxczxczxc</p>
      </div>
    );
  };

  function closeBox(id) {
    boxes.dispatch({
      type: actionsTypes.REMOVE_BOX,
      payload: {
        _id: id,
      },
    });
  }

  function RenderHeader(props) {
    return (
      <div className="clearfix">
        <p className="float-left">{props.box.name}</p>
        <button
          className="btn btn-danger btn-sm float-right"
          onClick={() => {
            closeBox(props.box._id);
          }}
        >
          Close
        </button>
      </div>
    );
  }

  function RenderFooter(_) {
    return (
      <div className="input-group mb-1">
        <input
          type="text"
          className="form-control"
          placeholder="Message"
          onChange={(e) => (pm.current = e.target.value)}
        />
        <div className="input-group-append">
          <button
            className="btn btn-success"
            type="submit"
            onClick={() => {
              sendPM(_);
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  const RenderBoxes = () => {
    return boxes.state.boxes.map((box) => {
      return (
        <div
          key={box._id}
          className="col-md-4"
          style={{
            height: "400px",
          }}
        >
          <div className="card" style={{ height: "100%", width: "100%" }}>
            <div className="card-header">
              <RenderHeader box={box} />
            </div>
            <div className="card-body">
              <div>
                {box.messages.map((m, idx) => {
                  return m.name === currentUser.state.username ? (
                    <RenderBoxRight key={idx} />
                  ) : (
                    <RenderBoxLeft key={idx} />
                  );
                })}
              </div>
            </div>
            <div className="card-footer clearfix">
              <RenderFooter box={box} />
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="row" style={footerStyle}>
        <RenderBoxes />
      </div>
    </div>
  );
}

Footer.prototype = {
  socket: propTypes.object.isRequired,
};

export default Footer;
