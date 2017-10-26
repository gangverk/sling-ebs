import * as actionTypes from './actionTypes';

const initialState = {
  dataCar: null,
  dataSession: null,
  dataAutentication: null,
  dataUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTENTICATION:
      return {
        ...state,
      };
    case actionTypes.FETCH_AUTENTICATION_SUCCESS:
      return {
        ...state,
        dataAutentication: action.payload,
      };
    case actionTypes.FETCH_AUTENTICATION_FAILURE:
      return {
        ...state,
      };
    case actionTypes.FETCH_USERS:
      return {
        ...state,
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      console.log('Fetch user success', action);
      return {
        ...state,
        dataUsers: action.payload,
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
      };
    case actionTypes.FETCH_SESSION:
      return {
        ...state,
      };
    case actionTypes.FETCH_SESSION_SUCCESS:
      return {
        ...state,
        dataSession: action.payload,
      };
    case actionTypes.FETCH_SESSION_FAILURE:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SHIFT:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SHIFT_SUCCESS:
      return {
        ...state,
        dataShift: action.payload,
      };
    case actionTypes.FETCH_USER_SHIFT_FAILURE:
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT:
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
