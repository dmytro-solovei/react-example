import {GET_INFO, GET_INFO_ERROR, SET_INFO} from '../actions/actionTypes';

const initialState = {
    info: null,
    infoError: null,
};

const infoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INFO:
            return {
                ...state,
            };
        case SET_INFO:
            return {
                ...state,
                info: action.payload,
            };
        case GET_INFO_ERROR:
            return {
                ...state,
                infoError: action.payload,
            };
        default:
            return state;
    }
};

export default infoReducer;
