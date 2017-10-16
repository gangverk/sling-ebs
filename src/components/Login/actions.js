import * as actionTypes from './actionTypes';

export const setUserData = (name, email, picture) => {
  return dispatch => {
    dispatch({
      type: actionTypes.FACEBOOK_DATA,
      payload: {
        name,
        email,
        picture,
      },
    });
  };
};
