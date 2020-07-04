import React from "react";
import UserIcon from "./../user.svg";
import { AppContext, actionsTypes } from "./../reducers/AppContext";

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
  const [users, setUsers] = React.useState([
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
    { id: 3, name: "user3" },
    { id: 4, name: "user4" },
    { id: 5, name: "user5" },
    { id: 6, name: "user6" },
    { id: 7, name: "user7" },
    { id: 8, name: "user8" },
    { id: 9, name: "user9" },
  ]);

  const RenderUsers = () => {
    console.log("Users Component Render....");
    const appContext = React.useContext(AppContext);

    function onUserClick(user) {
      appContext.boxes.dispatch({
        type: actionsTypes.PUSH_BOX,
        payload: {
          box: { _id: user.id, name: user.name },
        },
      });
    }

    return (
      <div className="container-fluid list-group m-2" style={listStyle}>
        {users.map((user) => {
          return (
            <div
              key={user.id}
              className="Hover list-group-item list-group-item-action clearfix"
              style={{ cursor: "pointer" }}
              onClick={() => onUserClick(user)}
            >
              <img
                src={UserIcon}
                className="rounded-circle float-left mr-3"
                style={userIconStyle}
              />
              <p className="mt-2">{user.name}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return <RenderUsers />;
}

export default Users;
