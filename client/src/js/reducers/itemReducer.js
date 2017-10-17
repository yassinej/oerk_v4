import { FETCH_ITEMS_SUCCESS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_ITEMS_SUCCESS:
			console.log('itemsReducer_FETCH_ITEMS_SUCCESS', action);
			return action.items;
		default:
			return state;
	}
}
