import locale from './locale.js';
import * as actionTypes from './actionTypes';

const initialState = {
  ...locale,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      locale.setLanguage(action.payload);
      return {
        ...locale,
      };
    default:
      return state;
  }
};
