import { GET_FILTERED_JOURNALS, SET_NEW_ROOM, SELECTED_JOURNAL } from "../actions";

const initialState = {
  rooms: {
    newRoom: "",
  },
  journals: {
    filteredJournals: [],
    selectedJournal: { topic: "initial" },
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NEW_ROOM:
      return {
        ...state,
        rooms: {
          ...state.rooms,
          newRoom: action.payload,
        },
      };

    case GET_FILTERED_JOURNALS:
      return {
        ...state,
        journals: {
          ...state.journals,
          filteredJournals: [action.payload],
        },
      };

    case SELECTED_JOURNAL:
      return {
        ...state,
        journals: {
          ...state.journals,
          selectedJournal: action.payload,
        },
      };
    default:
      return state;
  }
};
export default mainReducer;
