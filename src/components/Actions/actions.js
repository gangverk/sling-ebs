import { CALL_API } from 'redux-api-middleware';
import * as actionTypes from './actionTypes';

export const fetchCar = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FETCH_CAR,
      actionTypes.FETCH_CAR_SUCCESS,
      actionTypes.FETCH_CAR_FAILURE,
    ],
    endpoint: 'http://apis.is/car?number=fma08',
    method: 'GET',
  },
});

export const fetchAuthenticationData = () => {
  console.log('fetch auth data');
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
      endpoint: 'https://test-api.sling.is/v1/account/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'hreinnrunars@gmail.com',
        password: 'test1234',
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
      endpoint: 'https://test-api.sling.is/v1/users',
      method: 'GET',
      headers: { authorization: 'd31af5aed026df02ed8e39428c76769c' },
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
    endpoint: 'https://test-api.sling.is/v1/account/session',
    method: 'GET',
    headers: { authorization: 'd31af5aed026df02ed8e39428c76769c' },
  },
});
