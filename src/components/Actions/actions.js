import { CALL_API } from 'redux-api-middleware';
import * as Cookie from 'js-cookie';

import * as actionTypes from './actionTypes';

export const fetchAuthenticationData = () => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_AUTENTICATION,
        {
          type: actionTypes.FETCH_AUTENTICATION_SUCCESS,
          payload: (action, state, res) => {
            return {
              token: res.headers.get('authorization'),
            };
          },
        },
        actionTypes.FETCH_AUTENTICATION_FAILURE,
      ],
      endpoint: `${process.env.REACT_APP_API}${'account/login'}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `${process.env.REACT_APP_USERNAME}`,
        password: `${process.env.REACT_APP_PW}`,
      }),
    },
  };
};

export const fetchUsers = () => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_USERS,
        actionTypes.FETCH_USERS_SUCCESS,
        actionTypes.FETCH_USERS_FAILURE,
      ],
      endpoint: `${process.env.REACT_APP_API}${'users'}`,
      method: 'GET',
      headers: { authorization: `${Cookie.get('auth')}` },
    },
  };
};

export const fetchAllUserInfo = () => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_ALL_USER_INFO,
        actionTypes.FETCH_ALL_USER_INFO_SUCCESS,
        actionTypes.FETCH_ALL_USER_INFO_FAILURE,
      ],
      endpoint: `${process.env.REACT_APP_API}${'users/concise'}`,
      method: 'GET',
      headers: { authorization: `${Cookie.get('auth')}` },
    },
  };
};

export const fetchSessionData = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FETCH_SESSION,
      actionTypes.FETCH_SESSION_SUCCESS,
      actionTypes.FETCH_SESSION_FAILURE,
    ],
    endpoint: `${process.env.REACT_APP_API}${'account/session'}`,
    method: 'GET',
    headers: { authorization: `${Cookie.get('auth')}` },
  },
});

export const fetchUserShift = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FETCH_USER_SHIFT,
      actionTypes.FETCH_USER_SHIFT_SUCCESS,
      actionTypes.FETCH_USER_SHIFT_FAILURE,
    ],
    endpoint: `${process.env
      .REACT_APP_API}${'shifts/current?referenceDate=2017-10-18'}`,
    method: 'GET',
    headers: {
      authorization: `${Cookie.get('auth')}`,
    },
  },
});

//TODO:bæta við það sem þarf sem er org_id og user_id.
//https://test-api.sling.is/v1/1061/calendar/37239?dates=2017-10-27
//Hér er org_id = 1061 og user_id = 37239 date = 2017-10-27
//Hér er vandamál með það að ég sækji bara þær vaktir sem eru planaðar af einum starfsmanni...
export const fetchAllShifts = today => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_ALL_SHIFTS,
        actionTypes.FETCH_ALL_SHIFTS_SUCCESS,
        actionTypes.FETCH_ALL_SHIFTS_FAILURE,
      ],
      endpoint: `${process.env
        .REACT_APP_API}1061/calendar/37239?dates=${today}`,
      method: 'GET',
      headers: {
        authorization: `${Cookie.get('auth')}`,
      },
    },
  };
};

export const postShift = (
  time,
  user,
  id,
  userInfo,
  fetchDate,
  bookTimeText,
  startTime,
  endTime,
  userFacebookId
) => {
  return dispatch => {
    const summary = `${bookTimeText}\nFacebookId dont edit -> ${userFacebookId}`;
    return dispatch({
      [CALL_API]: {
        types: [
          actionTypes.POST_SHIFT,
          {
            type: actionTypes.POST_SHIFT_SUCCESS,
            payload: (action, state, res) => {
              dispatch(fetchAllShifts(fetchDate));
              const contentType = res.headers.get('Content-Type');
              if (contentType && ~contentType.indexOf('json')) {
                // Just making sure res.json() does not raise an error
                return res.json();
              }
            },
          },
          actionTypes.POST_SHIFT_FAILURE,
        ],
        endpoint: `${process.env.REACT_APP_API}${'shifts'}`,
        method: 'POST',
        headers: {
          authorization: `${Cookie.get('auth')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          available: false,
          breakDuration: 0,
          dtend: endTime,
          dtstart: startTime,
          location: {
            id: 37130,
          },
          position: {
            id: 36722,
          },
          summary,
          user: {
            id: id,
          },
        }),
      },
    });
  };
};

// //https://test-api.sling.is/v1/shifts/242010
export const cancelShift = (shiftId, fetchDate) => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        types: [
          actionTypes.CANCEL_SHIFT,
          {
            type: actionTypes.CANCEL_SHIFT_SUCCESS,
            payload: (action, state, res) => {
              dispatch(fetchAllShifts(fetchDate));
            },
          },
          actionTypes.CANCEL_SHIFT_FAILURE,
        ],
        endpoint: `${process.env.REACT_APP_API + 'shifts/' + shiftId}`,
        method: 'DELETE',
        headers: {
          authorization: `${Cookie.get('auth')}`,
        },
      },
    });
  };
};

//https://test-api.sling.is/v1/channels
export const fetchChannel = () => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_CHANNEL,
        actionTypes.FETCH_CHANNEL_SUCCESS,
        actionTypes.FETCH_CHANNEL_FAILURE,
      ],
      endpoint: `${process.env.REACT_APP_API}${'channels'}`,
      method: 'GET',
      headers: { authorization: `${Cookie.get('auth')}` },
    },
  };
};

// https://test-api.sling.is/v1/channels/127
export const fetchChannelClient = channel => {
  return {
    [CALL_API]: {
      types: [
        actionTypes.FETCH_CHANNEL_CLIENT,
        actionTypes.FETCH_CHANNEL_CLIENT_SUCCESS,
        actionTypes.FETCH_CHANNEL_CLIENT_FAILURE,
      ],
      endpoint: `${process.env.REACT_APP_API}${'channels/' + channel}`,
      method: 'GET',
      headers: { authorization: `${Cookie.get('auth')}` },
    },
  };
};

// get(actionTypes, url) {1
//     return {
//       [CALL_API]: {
//         types: [
//           ...actionTypes
//         ],
//         endpoint: `${process.env.REACT_APP_API}${url}`,
//         method: 'GET',
//         headers: { authorization: `${Cookie.get('auth')}` },
//       },
//     };
//   };
// }
