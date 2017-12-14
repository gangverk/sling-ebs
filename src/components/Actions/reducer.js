import Cookie from 'js-cookie';
import * as actionTypes from './actionTypes';

const initialState = {
  fetchingAuthentication: false,
  errorFetchingAuthentication: '',
  dataAutentication: null,
  fetchingUsers: false,
  errorFetchingUsers: '',
  dataSession: null,
  dataUsers: [],
  dataAllUsers: [],
  fetchingAllInfo: false,
  allShifts: [],
  loadingShifts: false,
  errorLoadingShifts: '',
  postingShift: false,
  messageModal: false,
  modalText: '',
  errorPostingShift: '',
  cancelingShift: false,
  errorCancelingShift: '',
  channels: '',
  channelsArticles: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_AUTENTICATION:
      return {
        ...state,
        fetchingAuthentication: true,
        errorFetchingAuthentication: '',
      };
    case actionTypes.FETCH_AUTENTICATION_SUCCESS:
      Cookie.set('auth', action.payload.token);
      return {
        ...state,
        dataAutentication: action.payload,
        fetchingAuthentication: false,
      };
    case actionTypes.FETCH_AUTENTICATION_FAILURE:
      return {
        ...state,
        fetchingAuthentication: false,
        errorFetchingAuthentication: 'Error fetching authentication',
      };
    case actionTypes.FETCH_USERS:
      return {
        ...state,
        fetchingUsers: true,
        errorFetchingUsers: '',
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        dataUsers: action.payload,
        fetchingUsers: false,
      };
    case actionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        fetchingUsers: false,
        errorFetchingUsers: 'Error fetching users',
      };
    case actionTypes.FETCH_ALL_USER_INFO:
      return {
        ...state,
        fetchingAllInfo: true,
      };
    case actionTypes.FETCH_ALL_USER_INFO_SUCCESS:
      return {
        ...state,
        dataAllUsers: action.payload.users,
        fetchingAllInfo: false,
      };
    case actionTypes.FETCH_ALL_USER_INFO_FAILURE:
      return {
        ...state,
        fetchingAllInfo: false,
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
        messageModal: false,
        errorPostingShift: '',
        modalText: '',
      };
    case actionTypes.POST_SHIFT_SUCCESS:
      return {
        ...state,
        postingShift: false,
        messageModal: true,
        modalText: 'Sucessfully booked appointment',
      };
    case actionTypes.POST_SHIFT_FAILURE:
      return {
        ...state,
        postingShift: false,
        errorPostingShift: 'Failed to post shift for selected time',
        messageModal: true,
        modalText: 'Error booking your appointment',
      };
    case actionTypes.CANCEL_SHIFT:
      return {
        ...state,
        cancelingShift: true,
        errorCancelingShift: '',
        messageModal: false,
        modalText: '',
      };
    case actionTypes.CANCEL_SHIFT_SUCCESS:
      return {
        ...state,
        cancelingShift: false,
        messageModal: true,
        modalText: 'Sucessfully canceld your appointment',
      };
    case actionTypes.CANCEL_SHIFT_FAILURE:
      return {
        ...state,
        cancelingShift: false,
        errorCancelingShift: 'Failed to cancel the selected shift',
        messageModal: true,
        modalText: 'Sucessfully canceld your appointment',
      };
    case actionTypes.FETCH_CHANNEL:
      return {
        ...state,
      };
    case actionTypes.FETCH_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: action.payload,
      };
    case actionTypes.FETCH_CHANNEL_FAILURE:
      return {
        ...state,
      };
    case actionTypes.FETCH_CHANNEL_CLIENT:
      return {
        ...state,
      };
    case actionTypes.FETCH_CHANNEL_CLIENT_SUCCESS:
      return {
        ...state,
        channelsArticles: action.payload.articles,
      };
    case actionTypes.FETCH_CHANNEL_CLIENT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
