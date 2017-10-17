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
      console.log('FETCHAUT', action);
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
      console.log('FETCHUSER', action);
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
      console.log('FETCHSESS', action);
      return {
        ...state,
        dataSession: action.payload,
      };
    case actionTypes.FETCH_SESSION_FAILURE:
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SHIFT:
      console.log('FETCH_USER_SHIFT', action);
      return {
        ...state,
      };
    case actionTypes.FETCH_USER_SHIFT_SUCCESS:
      console.log('FETCH_USER_SHIFT_SUCCESS', action);
      return {
        ...state,
        dataShift: action.payload,
      };
    case actionTypes.FETCH_USER_SHIFT_FAILURE:
      console.log('FETCH_USER_SHIFT_FAILURE', action);
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT:
      console.log('POST_SHIFT', action);
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT_SUCCESS:
      console.log('POST_SHIFT_SUCCESS', action);
      return {
        ...state,
      };
    case actionTypes.POST_SHIFT_FAILURE:
      console.log('POST_SHIFT_FAILURE', action);
      return {
        ...state,
      };
    default:
      return state;
  }
};
