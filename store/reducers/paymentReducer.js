import {
    GET_BALANCE,
    GET_BALANCE_ERROR,
    GET_PAYMENT,
    GET_PAYMENT_DEPOSIT,
    GET_PAYMENT_ERROR, GET_PAYMENT_ERROR_DEPOSIT, SET_BALANCE,
    SET_PAYMENT,
    SET_PAYMENT_DEPOSIT,
} from '../actions/actionTypes';

const initialState = {
    onlinePayment: null,
    onlinePaymentDeposit: null,
    balanceHistory: null,
    paymentError: null,
    balanceError: null,
    onlinePaymentDepositError: null,
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PAYMENT || GET_PAYMENT_DEPOSIT || GET_BALANCE:
            return {
                ...state,
            };
        case SET_PAYMENT:
            return {
                ...state,
                onlinePayment: action.payload,
            };
        case SET_PAYMENT_DEPOSIT:
            return {
                ...state,
                onlinePaymentDeposit: action.payload,
            };
        case SET_BALANCE:
            return {
                ...state,
                balanceHistory: action.payload,
            };
        case GET_PAYMENT_ERROR:
            return {
                ...state,
                infoError: action.payload,
            };
        case GET_BALANCE_ERROR:
            return {
                ...state,
                balanceError: action.payload,
            };
        case GET_PAYMENT_ERROR_DEPOSIT:
            return {
                ...state,
                onlinePaymentDepositError: action.payload,
            };
        default:
            return state;
    }
};

export default paymentReducer;
