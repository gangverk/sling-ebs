import { CALL_API } from 'redux-api-middleware';
import * as actionTypes from './actionTypes';

export const fetchCar = () => ({
  [CALL_API]: {
    types: [
      actionTypes.FETCH_CAR,
      actionTypes.FETCH_CAR_SUCCESS,
      actionTypes.FETCH_CAR_FAILURE,
    ],
    endpoint: 'http://apis.is/car?number=fam36',
    method: 'GET',
  },
});
