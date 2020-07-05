import * as actionsTypes from "./ActionTypes";
import produce from "immer";

export const initialState = { boxes: [] };

export function Reducer(state, action) {
  switch (action.type) {
    case actionsTypes.PUSH_BOX:
      return (state = {
        ...state,
        boxes: [...state.boxes, action.payload.box],
      });
    case actionsTypes.REMOVE_BOX:
      return (state = {
        ...state,
        boxes: [...state.boxes].filter((box) => box._id !== action.payload._id),
      });
    case actionsTypes.UPDATE_BOX:
      return produce(state, (draft) => {
        draft.boxes.map((box) => {
          box.messages.push(action.payload.box);
        });
        return draft;
      });
    default:
      return state;
  }
}
