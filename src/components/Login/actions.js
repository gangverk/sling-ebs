import * as actionTypes from './actionTypes';

export const setUserData = (name, email, picture, id) => {
  return dispatch => {
    dispatch({
      type: actionTypes.FACEBOOK_DATA,
      payload: {
        name,
        email,
        picture,
        id,
      },
    });
  };
};
