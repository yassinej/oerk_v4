import {
	USER_IS_LOADING,
	BACKPACK_IS_LOADING,
	ITEMS_IS_LOADING
} from '../../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case BACKPACK_IS_LOADING:
			//console.log('isLoadingReducer_BACKPACK', action);
			return action.isLoading;
		case ITEMS_IS_LOADING:
			//console.log('isLoadingReducer_ITEMS', action);
			return action.isLoading;
		case USER_IS_LOADING:
			//console.log('isLoadingReducer_USER', action);
			return action.isLoading;
		default:
			return state;
	}
}
