import { CALL_API } from 'redux-api-middleware';
import Cookie from 'js-cookie';
import moment from 'moment';

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

// get(actionTypes, url) {
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
export const fetchAllShifts = () => ({
  [CALL_API]: {
    type: [
      actionTypes.FETCH_ALL_SHIFTS,
      actionTypes.FETCH_ALL_SHIFTS_SUCCESS,
      actionTypes.FETCH_ALL_SHIFTS_FAILURE,
    ],
    endpoint: `${process.env.REACT_APP_API}${''}`,
    method: 'GET',
    headers: {
      authorization: `${Cookie.get('auth')}`,
    },
  },
});

export const postShift = (time, user, id, userInfo) => {
  const endTime = moment(time)
    .add(1, 'hour')
    .toISOString();
  const summary = `
    Klipping fyrir ${userInfo.name} - ${userInfo.email}
    Bóka tíma hjá: ${user}
  `;
  return {
    [CALL_API]: {
      types: [
        actionTypes.POST_SHIFT,
        actionTypes.POST_SHIFT_SUCCESS,
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
        dtstart: time,
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
  };
};
