import { FETCH_USER_SUCCESS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USER_SUCCESS:
			//console.log('userReducer_FETCH_USER_SUCCESS', action);
			return action.user;
		default:
			return state;
	}
}
