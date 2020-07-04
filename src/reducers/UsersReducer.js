import * as actionTypes from "./ActionTypes";

export const initialState = { users: [] };

export function Reducer(state, action) {
  switch (action.action) {
    case actionTypes.SET_USERS:
      state = { ...state, users: action.payload.users };
      return state;
    case actionTypes.ADD_USER:
      state = { ...state, users: [...state.users, action.payload.user] };
      return state;
    case actionTypes.UPDATE_USER:
      state = {
        ...state,
        users: [...state.users].map((user) => {
          if (user._id === action.payload.user._id) {
            Object.keys(action.payload.user).forEach((key) => {
              user[key] = action.payload.user[key];
            });
          }
          return user;
        }),
      };
      return state;
    default:
      return state;
  }
}
