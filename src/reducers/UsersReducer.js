import * as actionTypes from "./ActionTypes";

export const initialState = { users: [] };

export function Reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USERS:
      return (state = { ...state, users: action.payload.users });
    case actionTypes.ADD_USER:
      return (state = {
        ...state,
        users: [...state.users, action.payload.user],
      });
    case actionTypes.UPDATE_USER:
      return (state = {
        ...state,
        users: [...state.users].map((user) => {
          if (user._id === action.payload.user._id) {
            Object.keys(action.payload.user).forEach((key) => {
              user[key] = action.payload.user[key];
            });
          }
          return user;
        }),
      });
    default:
      return state;
  }
}
