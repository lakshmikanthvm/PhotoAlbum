import * as actionTypes from './actionTypes';

/**
* @desc actions for user profile reducer
* @version
* @author  Lakshmikanth
* @return action and parameters
*/
export const setUserProfile = ( userProfile ) => {
    return {
        type: actionTypes.SET_USERPROFILE,
        userProfile: userProfile
    };
};

export const signOutUser = () => {
  return {
      type: actionTypes.FACEBOOK_LOGOUT
  };
};

export const clearUserProfile = () => {
  return {
      type: actionTypes.CLEAR_USERPROFILE
  };
};