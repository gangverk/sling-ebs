import * as actionTypes from './actionTypes';

export const setLanguage = language => {
  return dispatch => {
    dispatch({
      type: actionTypes.SET_LANGUAGE,
      payload: language,
    });
  };
};
