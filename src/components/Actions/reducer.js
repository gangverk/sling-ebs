import Cookie from 'js-cookie';
import * as actionTypes from './actionTypes';

const initialState = {
  dataSession: null,
  dataAutentication: null,
  dataUsers: [],
  allShifts: [],
  loadingShifts: false,
  errorLoadingShifts: '',
  postingShift: false,
  errorPostingShift: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTENTICATION:
      return {
        ...state,
      };
    case actionTypes.FETCH_AUTENTICATION_SUCCESS:
      Cookie.set('auth', action.payload.token);
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
    case actionTypes.FETCH_ALL_SHIFTS:
      return {
        ...state,
        loadingShifts: true,
        allShifts: [],
        errorLoadingShifts: '',
      };
    case actionTypes.FETCH_ALL_SHIFTS_SUCCESS:
      return {
        ...state,
        loadingShifts: false,
        allShifts: action.payload,
      };
    case actionTypes.FETCH_ALL_SHIFTS_FAILURE:
      return {
        ...state,
        loadingShifts: false,
        errorLoadingShifts: 'Failed to fetch shifts for selected date',
      };
    case actionTypes.POST_SHIFT:
      return {
        ...state,
        postingShift: true,
        errorPostingShift: '',
      };
    case actionTypes.POST_SHIFT_SUCCESS:
      return {
        ...state,
        postingShift: false,
      };
    case actionTypes.POST_SHIFT_FAILURE:
      return {
        ...state,
        postingShift: false,
        errorPostingShift: 'Failed to post shift for selected time',
      };
    default:
      return state;
  }
};
