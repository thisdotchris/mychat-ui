import React from "react";
import UserLogo from "./../user.svg";

const cardStyle = {
  width: "100%",
  height: "500px",
};

const userIconStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#555",
};

function GroupChat() {
  console.log("GroupChat Component Render....");

  const RenderBoxLeft = () => {
    return (
      <div className="rounded p-2 mb-1 clearfix bg-success">
        <img
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

  const RenderMeesageBox = () => {
    return (
      <React.Fragment>
        <RenderBoxLeft />
        <RenderBoxRight />
        <RenderBoxLeft />
        <RenderBoxRight />
        <RenderBoxLeft />
        <RenderBoxRight />
        <RenderBoxLeft />
        <RenderBoxRight />
        <RenderBoxLeft />
        <RenderBoxRight />
      </React.Fragment>
    );
  };

  const RenderMessageField = () => {
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Message" />
        <button className="btn btn-success btn-sm">Send</button>
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

export default GroupChat;
