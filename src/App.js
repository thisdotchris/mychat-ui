import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import GroupChat from "./components/GroupChat";
import Users from "./components/Users";
import Footer from "./components/Footer";
import Login from "./components/Login";
import { AppContext } from "./reducers/AppContext";
import * as BoxesReducer from "./reducers/BoxesReducer";
import * as UsersReducer from "./reducers/UsersReducer";

function App() {
  const [boxesState, boxesDispatch] = React.useReducer(
    BoxesReducer.Reducer,
    BoxesReducer.initialState
  );

  const [usersState, usersDispatch] = React.useReducer(
    UsersReducer.Reducer,
    UsersReducer.initialState
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
  };

  function RenderFooter() {
    return boxesState.boxes.length > 0 ? <Footer /> : null;
  }

  return (
    <AppContext.Provider value={initialState}>
      {/* <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 mt-2">
            <Users />
          </div>
          <div className="col-md-6 mt-2">
            <GroupChat />
          </div>
        </div>
        <RenderFooter />
      </div> */}
      <Login />
    </AppContext.Provider>
  );
}

export default App;
