import React from "react";
import UserIcon from "./../user.svg";
import { AppContext, actionsTypes } from "./../reducers/AppContext";
import * as services from "./../services/UserService";

const userIconStyle = {
  width: "50px",
  height: "50px",
  backgroundColor: "#555",
};

const listStyle = {
  height: "500px",
  maxHeight: "490px",
  overflow: "auto",
};

function Users() {
  console.log("Users Component Render....");
  const { users, boxes, currentUser } = React.useContext(AppContext);

  React.useEffect(() => {
    if (users.state.users.length === 0) {
      services.GetUsers().then((res) => {
        users.dispatch({
          type: actionsTypes.SET_USERS,
          payload: { users: res.data },
        });
      });
    }
  });

  const RenderUsers = () => {
    async function onUserClick(user) {
      const socketID = await services.GetUserSocketID(user.username);
      boxes.dispatch({
        type: actionsTypes.PUSH_BOX,
        payload: {
          box: {
            _id: user._id,
            name: user.username,
            messages: [],
            socketID: socketID.data.socketID,
          },
        },
      });
    }

    return (
      <div className="container-fluid list-group m-2" style={listStyle}>
        {users.state.users.map((user) => {
          if (user._id != currentUser.state._id) {
            return (
              <div
                key={user._id}
                className="Hover list-group-item list-group-item-action clearfix"
                style={{ cursor: "pointer" }}
                onClick={() => onUserClick(user)}
              >
                <img
                  src={UserIcon}
                  alt="user"
                  className="rounded-circle float-left mr-3"
                  style={userIconStyle}
                />
                <p className="mt-2">{user.username}</p>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return <RenderUsers />;
}

export default Users;
