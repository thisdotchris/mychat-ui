import * as actionsTypes from "./ActionTypes";

export const initialState = { boxes: [] };

export function Reducer(state, action) {
  switch (action.type) {
    case actionsTypes.PUSH_BOX:
      state = { ...state, boxes: [...state.boxes, action.payload.box] };
      return state;
    case actionsTypes.REMOVE_BOX:
      state = {
        ...state,
        boxes: [...state.boxes].filter((box) => box._id !== action.payload._id),
      };
    default:
      return state;
  }
}
