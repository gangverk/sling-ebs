import * as actionTypes from './actionTypes';

const initialState = {
  loading: 'false',
  hasData: 'false',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CAR:
      return {
        loading: 'true',
      };
    case actionTypes.FETCH_CAR_SUCCESS:
      return {
        loading: 'false',
        hasData: 'true',
      };
    case actionTypes.FETCH_CAR_FAILURE:
      return {
        loading: 'false',
        hasData: 'false',
      };
    default:
      return state;
  }
};
