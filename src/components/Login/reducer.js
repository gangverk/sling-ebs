import * as actionTypes from './actionTypes';

const initialState = {
  name: '',
  email: '',
  picture: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FACEBOOK_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
