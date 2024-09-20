import { GET_WORDS, GET_WORDS_ERROR, SET_WORDS } from '../actions/actionTypes';

const initialState = {
  local: null,
};

const wordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
      };
    case SET_WORDS:
      return {
        ...state,
        local: action.payload,
      };
    case GET_WORDS_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default wordsReducer;
