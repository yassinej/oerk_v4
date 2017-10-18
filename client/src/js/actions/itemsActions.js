import axios from 'axios';

import {
	FETCH_ITEMS_SUCCESS,
	ITEM_HAS_ERRORED,
	ITEMS_IS_LOADING,
	ITEMS_LOADED
} from './types';

export const fetchItems = () => async dispatch => {
	dispatch(ItemsIsLoading(true));
	const res = await axios.get('/api/items');
	dispatch(ItemsIsLoading(false));
	if (!res.data) {
		dispatch(ItemsHasErrored(true));
	}
	console.log('_action_fetchItems_Got items ', res.data);
	dispatch(FetchItemsSuccess(res.data));
	dispatch(ItemsLoaded(true));
};

export function ItemsHasErrored(bool) {
	return {
		type: ITEMS_HAS_ERRORED,
		hasErrored: bool
	};
}

export function ItemsIsLoading(bool) {
	return {
		type: ITEMS_IS_LOADING,
		isLoading: bool
	};
}
export function ItemsLoaded(bool) {
	return {
		type: ITEMS_LOADED,
		loaded: { itemsLoaded: bool }
	};
}
export function FetchItemsSuccess(items) {
	return {
		type: FETCH_ITEMS_SUCCESS,
		items
	};
}
