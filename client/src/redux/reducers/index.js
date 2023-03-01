import { SET_NEW_ROOM } from "../actions";

const initialState = {
  newRoom: "",
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_ROOM:
      return {
        newRoom: action.payload,
      };

    default:
      return state;
  }
};
export default mainReducer;
