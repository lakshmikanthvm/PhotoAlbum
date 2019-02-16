import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  userProfile: {}
};

const setUserProfile = ( state = initialState , action ) => {
  const userProfile = {...action.userProfile};
  return updateObject( state, { userProfile : userProfile } );   
};

const clearUserProfile = ( state = initialState , action ) => {
  return updateObject( state, initialState );   
};

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.SET_USERPROFILE: 
      return setUserProfile(state, action);
    case actionTypes.CLEAR_USERPROFILE:
      return clearUserProfile(state,action);          
    default:
      return state;
  }
};

export default reducer;