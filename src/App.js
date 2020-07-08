import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GroupChat from "./components/GroupChat";
import Users from "./components/Users";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./reducers/AppContext";
import * as BoxesReducer from "./reducers/BoxesReducer";
import * as UsersReducer from "./reducers/UsersReducer";
import * as GCReducer from "./reducers/GroupChat";
import io from "socket.io-client";

const socket = io("http://128.199.252.245:3002/");

function App() {
  const [boxesState, boxesDispatch] = React.useReducer(
    BoxesReducer.Reducer,
    BoxesReducer.initialState
  );

  const [usersState, usersDispatch] = React.useReducer(
    UsersReducer.Reducer,
    UsersReducer.initialState
  );

  const [gcState, gcDispatch] = React.useReducer(
    GCReducer.Reducer,
    GCReducer.initialState
  );

  const [currentUserState, currentUserDispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case "set":
          state = action.payload;
          return state;
        case "remove":
          state = {};
          return state;
        default:
          return state;
      }
    },
    {}
  );

  const initialState = {
    currentUser: { state: currentUserState, dispatch: currentUserDispatch },
    users: { state: usersState, dispatch: usersDispatch },
    boxes: { state: boxesState, dispatch: boxesDispatch },
    gc: { state: gcState, dispatch: gcDispatch },
  };

  function RenderFooter() {
    return boxesState.boxes.length > 0 ? <Footer socket={socket} /> : null;
  }

  function RenderHome() {
    return Object.keys(currentUserState).length === 0 ? (
      <Login socket={socket} />
    ) : (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-2">
            <Users />
          </div>
          <div className="col-md-6 mt-2">
            <GroupChat socket={socket} />
          </div>
        </div>
        <RenderFooter />
      </div>
    );
  }

  return (
    <AppContext.Provider value={initialState}>
      <RenderHome />
    </AppContext.Provider>
  );
}

export default App;
