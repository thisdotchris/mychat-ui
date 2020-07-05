import * as actiontypes from "./ActionTypes";

export const initialState = {
  messages: [],
};

export function Reducer(state, action) {
  switch (action.type) {
    case actiontypes.SET_GC:
      return (state = { ...state, messages: action.payload.messages });
    case actiontypes.PUSH_GC:
      return (state = {
        ...state,
        messages: [...state.messages, action.payload.message],
      });
    default:
      break;
  }
}
