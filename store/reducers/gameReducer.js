import {
    CLOSE_GAME,
    CLOSE_GAME_ERROR,
    GET_GAME_HISTORY,
    OPEN_GAME,
    OPEN_GAME_ERROR,
    SET_CLOSE_GAME,
    SET_GAME_HISTORY,
    SET_OPEN_GAME,
} from '../actions/actionTypes';

const initialState = {
    gameClose: null,
    openGame: null,
    gameHistory: null,
    gameError: null,
    openGameError: null,
};

const gameReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLOSE_GAME || GET_GAME_HISTORY || OPEN_GAME:
            return {
                ...state,
            };
        case SET_CLOSE_GAME:
            return {
                ...state,
                gameClose: action.payload,
            };
        case SET_OPEN_GAME:
            return {
                ...state,
                gameClose: action.payload,
            };
        case SET_GAME_HISTORY:
            return {
                ...state,
                gameHistory: action.payload,
            };
        case CLOSE_GAME_ERROR:
            return {
                ...state,
                gameError: action.payload,
            };
        case OPEN_GAME_ERROR:
            return {
                ...state,
                openGameError: action.payload,
            };
        default:
            return state;
    }
};

export default gameReducer;
