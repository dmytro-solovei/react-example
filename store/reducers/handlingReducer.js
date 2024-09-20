import {
  GET_ACTIVE_GAMELIST,
  GET_ACTIVE_POPUP,
  GET_WINDOW_SIZE,
  SET_ACTIVE_INPUT,
} from '../actions/actionTypes';

const windowSize = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const initialState = {
  activeGameList: checkLastProvider(),
  activeInput: '',
  activePopup: {
    active: false,
    name: '',
  },
  size: {
    width: windowSize.width,
    height: windowSize.height,
    mobile: isMobile(windowSize),
    landscape: isLandscape(windowSize),
    sliderContainer: null,
  },
};

function checkLastProvider() {
  let storage = localStorage.getItem('lastProvider');
  if (
    storage != null &&
    storage !== 'search'
  ) {
    return storage;
  } else if (window.settings.defaultGamesList) {
    return window.settings.defaultGamesList;
  } else {
    return 'home';
  }
}

function isMobile(param) {
  return param.width <= 992;
}

function isLandscape(a) {
  return a.width > a.height;
}

const handlingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVE_POPUP:
      return {
        ...state,
        activePopup: action.payload,
      };
    case GET_ACTIVE_GAMELIST:
      return {
        ...state,
        activeGameList: action.payload,
      };
    case GET_WINDOW_SIZE:
      return {
        ...state,
        size: {
          ...action.payload,
          mobile: isMobile(action.payload),
          landscape: isLandscape(action.payload),
        },
      };
    case SET_ACTIVE_INPUT:
      return {
        ...state,
        activeInput: action.payload,
      };
    default:
      return state;
  }
};

export default handlingReducer;
