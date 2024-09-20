// reducers/apiReducer.js

import {ACCOUNT_UPDATE, FETCH_DATA, FETCH_DATA_ERROR, UPDATE_DATA} from '../actions/actionTypes';

const initialState = {
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...state,
      };
    case ACCOUNT_UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
      };
    // Другие обработчики действий...
    default:
      return state;
  }
};

export default apiReducer;
