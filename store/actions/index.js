import {
  GET_WORDS_ERROR,
  SET_WORDS,
  UPDATE_DATA,
  FETCH_DATA_ERROR,
  GET_WINDOW_SIZE,
  GET_ACTIVE_GAMELIST,
  GET_ACTIVE_POPUP,
  SIGNIN_TYPE,
  SIGNIN_TYPE_SUCCESS,
  SIGNIN_TYPE_ERROR,
  SIGNOUT_TYPE_ERROR,
  SIGNOUT_TYPE,
  SIGNOUT_TYPE_SUCCESS,
  GET_INFO,
  SET_INFO,
  GET_INFO_ERROR,
  CLOSE_GAME,
  SET_CLOSE_GAME,
  CLOSE_GAME_ERROR,
  GET_GAME_HISTORY,
  SET_GAME_HISTORY,
  GAME_HISTORY_ERROR,
  GET_PAYMENT,
  GET_PAYMENT_ERROR,
  SET_PAYMENT,
  GET_PAYMENT_DEPOSIT,
  SET_PAYMENT_DEPOSIT,
  GET_PAYMENT_ERROR_DEPOSIT,
  GET_BALANCE,
  GET_BALANCE_ERROR,
  SET_BALANCE,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_ERROR,
  SET_CURRENT_USER_TOKEN,
  GET_IP_ERROR,
  GET_IP_SUCCESS,
  GET_USERAGENT_SUCCESS,
  SET_ACTIVE_INPUT,
  SET_ACTIVE_Form,
  SET_ACTIVE_FORM, SIGNUP_TYPE, SIGNUP_TYPE_SUCCESS, SIGNUP_TYPE_ERROR, OPEN_GAME, OPEN_GAME_ERROR, SET_OPEN_GAME,
} from './actionTypes';

export const fetchData = (page) => {
  return async (dispatch) => {
    const token = localStorage.getItem('user-token');
    const agent = localStorage.getItem('user-agent');
    const ip = localStorage.getItem('user-ip');
    const isFirstVisit = localStorage.getItem('user-first-visit');
    const key = localStorage.getItem('cmd-key');

    const params = {
      key,
      page,
      cmd: 'init',
    };
    try {
      if (token && token !== 'undefined') {
        Object.assign(params, {token})
      }

      if (isFirstVisit !== '0') {
        Object.assign(params, {agent})
        Object.assign(params, {ip})
      }

      const response = await fetch('https://999ggg.net/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      dispatch({
        type: UPDATE_DATA,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: FETCH_DATA_ERROR,
        payload: error.message,
      });
    }
  };
};

export function getWords(lang) {
  return async (dispatch) => {
    try {
      if (!lang) return;
      const response = await fetch(`lang/${lang}/translation.json`, {
        method: 'GET',
      });

      const data = await response.json();
      dispatch({
        type: SET_WORDS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_WORDS_ERROR,
        payload: error.message,
      });
    }
  };
}

export function getWindowSize(size) {
  return {
    type: GET_WINDOW_SIZE,
    payload: size,
  };
}

export const setActiveGameList = (activeGameList) => {
  return {
    type: GET_ACTIVE_GAMELIST,
    payload: activeGameList,
  };
};

export function getPopup(popup) {
  return {
    type: GET_ACTIVE_POPUP,
    payload: popup,
  };
}

export const signInRequest = (form) => {
  return async (dispatch) => {
    dispatch({ type: SIGNIN_TYPE });
    const agent = localStorage.getItem('user-agent');
    try {
      const params = {
        cmd: 'signIn',
        ...form,
        info: agent
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      localStorage.setItem('user-token', data.content.token);
      dispatch({
        type: SIGNIN_TYPE_SUCCESS,
        payload: data.content.token,
      });

      if (data.content.error) {
        dispatch({
          type: SIGNIN_TYPE_ERROR,
          payload: data.content.error,
        });

        setTimeout(() => {
          dispatch({
            type: SIGNIN_TYPE_ERROR,
            payload: '',
          });
        }, 4000);
      }

      dispatch({
        type: SET_CURRENT_USER_TOKEN,
        payload: data.content,
      });

      return data
    } catch (error) {
      dispatch({
        type: SIGNIN_TYPE_ERROR,
        payload: error.message,
      });

      setTimeout(() => {
        dispatch({
          type: SIGNIN_TYPE_ERROR,
          payload: '',
        });
      }, 4000);
    }
  };
};

export const signUpRequest = (form) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP_TYPE });
    const key = localStorage.getItem('cmd-key')
    try {
      const params = {
        cmd: 'signUp',
        data: {
          key,
          ...form
        },
      };

      const response = await fetch('https://999ggg.net/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      localStorage.setItem('user-token', data.content.token);
      dispatch({
        type: SIGNUP_TYPE_SUCCESS,
        payload: data.content.token,
      });

      if (data.content.error) {
        dispatch({
          type: SIGNUP_TYPE_ERROR,
          payload: data.content.error,
        });

        setTimeout(() => {
          dispatch({
            type: SIGNUP_TYPE_ERROR,
            payload: '',
          });

        }, 4000);
      }

    } catch (error) {
      dispatch({
        type: SIGNUP_TYPE_ERROR,
        payload: error.message,
      });

      setTimeout(() => {
        dispatch({
          type: SIGNUP_TYPE_ERROR,
          payload: '',
        });

      }, 4000);
    }
  };
};

export const signOutRequest = () => {
  return async (dispatch) => {
    const token = localStorage.getItem('user-token');
    dispatch({ type: SIGNOUT_TYPE });

    try {
      const params = {
        cmd: 'signOut',
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();
      localStorage.remove('user-token');

      if (data.content.error) {
        dispatch({
          type: SIGNOUT_TYPE_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SIGNIN_TYPE_SUCCESS,
        payload: null,
      });
      dispatch({
        type: SET_CURRENT_USER_TOKEN,
        payload: null,
      });
      dispatch({
        type: SIGNOUT_TYPE_SUCCESS,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: SIGNOUT_TYPE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getInfoRequest = () => {
  return async (dispatch) => {
    dispatch({ type: GET_INFO });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'info',
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: GET_INFO_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_INFO,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: GET_INFO_ERROR,
        payload: error.message,
      });
    }
  };
};

export const openGameRequest = gameId => {
  return async (dispatch) => {
    dispatch({ type: OPEN_GAME });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'gameOpen',
        gameId,
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: OPEN_GAME_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_OPEN_GAME,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: OPEN_GAME_ERROR,
        payload: error.message,
      });
    }
  };
};

export const closeGameRequest = () => {
  return async (dispatch) => {
    dispatch({ type: CLOSE_GAME });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'gameClose',
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: CLOSE_GAME_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_CLOSE_GAME,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: CLOSE_GAME_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getGameHistoryRequest = ({date}) => {
  return async (dispatch) => {
    dispatch({ type: GET_GAME_HISTORY });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'gameHistory',
        date,
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: GAME_HISTORY_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_GAME_HISTORY,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: GAME_HISTORY_ERROR,
        payload: error.message,
      });
    }
  };
};

export const onlinePaymentRequest = (action) => {
  return async (dispatch) => {
    dispatch({ type: GET_PAYMENT });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'onlinePayment',
        action,
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: GET_PAYMENT_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_PAYMENT,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_ERROR,
        payload: error.message,
      });
    }
  };
};

export const onlinePaymentDepositRequest = ({ action, amount, methodId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_PAYMENT_DEPOSIT });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'deposit',
        action,
        amount,
        methodId,
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data?.error) {
        dispatch({
          type: GET_PAYMENT_ERROR_DEPOSIT,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_PAYMENT_DEPOSIT,
        payload: data?.content,
      });
    } catch (error) {
      dispatch({
        type: GET_PAYMENT_ERROR_DEPOSIT,
        payload: error.message,
      });
    }
  };
};

export const balanceHistoryRequest = ({ date }) => {
  return async (dispatch) => {
    dispatch({ type: GET_BALANCE });
    const token = localStorage.getItem('user-token');
    try {
      const params = {
        cmd: 'balanceHistory',
        date,
        token,
      };

      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();

      if (data.error) {
        dispatch({
          type: GET_BALANCE_ERROR,
          payload: data.content.error,
        });
      }

      dispatch({
        type: SET_BALANCE,
        payload: data.content,
      });
    } catch (error) {
      dispatch({
        type: GET_BALANCE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const accountUpdateRequest = (config) => {
  return async (dispatch) => {
    const token = localStorage.getItem('user-token');
    const agent = localStorage.getItem('user-agent');
    try {

      let params;
      if (token) {
        params = {
          cmd: 'accountUpdate',
          token,
        };
      } else {
        params = {
          cmd: 'accountUpdate',
          agent,
        };
      }


      const response = await fetch('/apiLobby.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...params, ...config}),
      });

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();
      if (data?.error) {
        dispatch({
          type: ACCOUNT_UPDATE_ERROR,
          payload: data.content.error,
        });
      }

      dispatch(fetchData());

      dispatch({
        type: ACCOUNT_UPDATE,
        payload: data?.content,
      });
    } catch (error) {
      dispatch({
        type: ACCOUNT_UPDATE_ERROR,
        payload: error.message,
      });
    }
  };
};

export const getYourIpRequest = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');

      if (!response.ok) {
        throw new Error('Ошибка при выполнении запроса');
      }

      const data = await response.json();
      localStorage.setItem('user-ip', data.ip);
      dispatch({
        type: GET_IP_SUCCESS,
        payload: data.ip,
      });

    } catch (error) {
      dispatch({
        type: GET_IP_ERROR,
        payload: error.message,
      });
    }
  };
};

export function getUserAgent(userAgent) {
  localStorage.setItem('user-agent', userAgent);
  return {
    type: GET_USERAGENT_SUCCESS,
    payload: userAgent,
  };
}

export const setActiveInput = ref => {
  return { type: SET_ACTIVE_INPUT, payload: ref };
};

export const setActiveForm = form => {
  return { type: SET_ACTIVE_FORM, payload: form };
};

export const setCurrentUserToken = token => {
  return async dispatch => {
    dispatch({
      type: SET_CURRENT_USER_TOKEN,
      payload: token,
    });
  }

}