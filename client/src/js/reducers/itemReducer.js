import { FETCH_ITEMS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_ITEMS:
			action.payload;
			//console.log('itemReducer_Payload', action.payload);
			return action.payload;
		default:
			return state;
	}
}
