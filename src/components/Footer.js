import React from "react";
import UserLogo from "./../user.svg";
import { AppContext, actionsTypes } from "./../reducers/AppContext";

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

function Footer() {
  console.log("Footer Component Render....");

  const appContext = React.useContext(AppContext);

  React.useEffect(() => {
    console.log("Footer component mount...");
    return () => {
      console.log("Footer component unmount");
    };
  });

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

  function closeBox(id) {
    appContext.boxes.dispatch({
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

  function RenderFooter() {
    return (
      <div className="input-group mb-1">
        <input type="text" className="form-control" placeholder="Message" />
        <div className="input-group-append">
          <button className="btn btn-success" type="submit">
            Send
          </button>
        </div>
      </div>
    );
  }

  const RenderBoxes = () => {
    return appContext.boxes.state.boxes.map((box) => {
      return (
        <div
          key={box._id}
          className="col"
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
                <RenderBoxLeft />
                <RenderBoxRight />
              </div>
            </div>
            <div className="card-footer clearfix">
              <RenderFooter />
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

export default Footer;
