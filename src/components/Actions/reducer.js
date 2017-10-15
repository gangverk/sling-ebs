import * as actionTypes from './actionTypes';

const initialState = {
  dataCar: null,
  dataSession: null,
  dataAutentication: null,
  dataUsers: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CAR:
      return {
        ...state,
      };
    case actionTypes.FETCH_CAR_SUCCESS:
      return {
        ...state,
        dataCar: action.payload.results[0],
      };
    case actionTypes.FETCH_CAR_FAILURE:
      return {
        ...state,
      };
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
      console.log('þetta er FETCH_USERS', action);
      return {
        ...state,
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      console.log('þetta er FETCH_USERS_SUCCESS', action);
      return {
        ...state,
        dataUsers: action.payload,
      };
    case actionTypes.FETCH_USERS_FAILURE:
      console.log('þetta er FETCH_USERS_FAILURE', action);
      return {
        ...state,
      };
    case actionTypes.FETCH_SESSION:
      return {
        ...state,
      };
    case actionTypes.FETCH_SESSION_SUCCESS:
      console.log('FETCH_SESSION_SUCCESS', action);
      return {
        ...state,
        dataSession: action.payload,
      };
    case actionTypes.FETCH_SESSION_FAILURE:
      return {
        ...state,
      };
      break;
    default:
      return state;
  }
};
