import {
	USER_LOADED,
	BACKPACK_LOADED,
	ITEMS_LOADED
} from '../../actions/types';

function userLoaded(state) {
	return Object.assign({}, state, {
		userLoaded: true
	});
}
function itemsLoaded(state) {
	return Object.assign({}, state, {
		itemsLoaded: true
	});
}
function backpackLoaded(state) {
	return Object.assign({}, state, {
		backpackLoaded: true
	});
}
export default function(state = {}, action) {
	let updatedState;
	switch (action.type) {
		case BACKPACK_LOADED:
			console.log('LoadedReducer_BACKPACK', action);
			updatedState = backpackLoaded(state);
			return updatedState;
		case ITEMS_LOADED:
			console.log('LoadedReducer_ITEMS', action);
			updatedState = itemsLoaded(state);
			return updatedState;
		case USER_LOADED:
			console.log('LoadedReducer_USER', action);
			updatedState = userLoaded(state);
			return updatedState;
		default:
			return state;
	}
}
