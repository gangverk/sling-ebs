import * as actionTypes from './actionTypes';

const initialState = {
  loading: 'false',
  hasData: 'false',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CAR:
      console.log('FETC_CAR i gangi------------------------------', action);
      return {
        loading: 'true',
      };
    case actionTypes.FETCH_CAR_SUCCESS:
      console.log(
        'FETCH_CAR_SUCCESS í gangi------------------------------------',
        action
      );
      return {
        loading: 'false',
        hasData: 'true',
      };
    case actionTypes.FETCH_CAR_FAILURE:
      console.log(
        'FETCH_CAR_FAILURE í gangi--------------------------',
        action
      );
      return {
        loading: 'false',
        hasData: 'false',
      };
    default:
      return state;
  }
};
