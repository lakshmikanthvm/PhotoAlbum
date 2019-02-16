import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  album: [],
  photos: []
};

const setAlbum = ( state = initialState , action ) => {
  const album = [...action.album];
  return updateObject( state, { album : album } );   
};

const setPhotos = ( state = initialState , action ) => {
    const photos = [...action.photos];
  return updateObject( state, { photos: photos } );   
};

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