import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

/**
* @desc reducer for Album
* @version
* @author Lakshmikanth 
* @return updated state
*/

/**
* @desc initial state of reducer
*/
const initialState = {
  album: [],
  photos: []
};

/**
* @desc function will manipulate the reducer state with the action payload data.
*/
const setAlbum = ( state = initialState , action ) => {
  const album = [...action.album];
  return updateObject( state, { album : album } );   
};

const setPhotos = ( state = initialState , action ) => {
    const photos = [...action.photos];
  return updateObject( state, { photos: photos } );   
};

/**
* @desc checks the action type and calls the respective function and pass state and action to the function.
*/
const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_ALBUM: 
      return setAlbum(state, action);
    case actionTypes.SET_PHOTOS:
      return setPhotos(state,action);          
    default:
      return state;
  }
};

export default reducer;
