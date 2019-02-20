import * as actionTypes from './actionTypes';

/**
* @desc actions for user profile reducer
* @version
* @author  Lakshmikanth
* @return action and parameters
*/

/**
* @desc setAlbum dispatch action from container will call this function
* @argumets  album
* @return action (will have action type and payload data)
*/
export const setAlbum = ( album ) => {
    return {
        type: actionTypes.SET_ALBUM,
        album: album
    };
};

export const setPhotos = (photos) => {
  return {
      type: actionTypes.SET_PHOTOS,
      photos: photos
  };
};

export const clearUserProfile = () => {
  return {
      type: actionTypes.CLEAR_USERPROFILE
  };
};
