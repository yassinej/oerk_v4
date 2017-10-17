import {
	USER_HAS_ERRORED,
	BACKPACK_HAS_ERRORED,
	ITEMS_HAS_ERRORED
} from '../../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case BACKPACK_HAS_ERRORED:
			console.log('HasErroredReducer_BACKPACK', action);
			return action.hasErrored;
		case ITEMS_HAS_ERRORED:
			console.log('HasErroredReducer_ITEMS', action);
			return action.hasErrored;
		case USER_HAS_ERRORED:
			console.log('HasErroredReducer_USER', action);
			return action.hasErrored;
		default:
			return state;
	}
}
