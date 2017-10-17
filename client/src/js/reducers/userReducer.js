import { FETCH_USER } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USER:
			//action.payload.fetched = true;
			//console.log('userReducer_Payload', action.payload);
			return action.payload;
		default:
			return state;
	}
}
