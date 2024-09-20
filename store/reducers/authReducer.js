import {
    SIGNIN_TYPE,
    SIGNIN_TYPE_ERROR,
    SIGNIN_TYPE_SUCCESS,
    SET_CURRENT_USER_TOKEN,
    SIGNOUT_TYPE_SUCCESS,
    GET_IP_SUCCESS,
    GET_IP_ERROR,
    GET_USERAGENT_SUCCESS,
    SET_ACTIVE_FORM,
    SIGNUP_TYPE_ERROR,
} from '../actions/actionTypes';

const initialState = {
    userData: null,
    userError: null,
    signUpError: null,
    ip: null,
    getIpError: null,
    userAgent: null,
    activeForm: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNIN_TYPE:
            return {
                ...state,
            };
        case GET_IP_SUCCESS:
            return {
                ...state,
                ip: action.payload,
            };
        case GET_IP_ERROR:
            return {
                ...state,
                getIpError: action.payload,
            };
        case GET_USERAGENT_SUCCESS:
            return {
                ...state,
                userAgent: action.payload,
            };
        case SIGNIN_TYPE_SUCCESS:
            return {
                ...state,
                userData: action.payload,
            };
        case SET_CURRENT_USER_TOKEN:
            return {
                ...state,
                userData: action.payload,
            };
        case SIGNOUT_TYPE_SUCCESS:
            return {
                ...state,
                userData: action.payload,
            };
        case SIGNIN_TYPE_ERROR:
            return {
                ...state,
                userError: action.payload,
            };
        case SIGNUP_TYPE_ERROR:
            return {
                ...state,
                signUpError: action.payload,
            };
        case SET_ACTIVE_FORM:
            return {
                ...state,
                activeForm: action.payload,

            };
        default:
            return state;
    }
};

export default authReducer;
