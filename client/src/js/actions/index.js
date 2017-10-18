import axios from 'axios';

import {
	FETCH_USER,
	FETCH_ITEMS,
	FETCH_BACKPACK,
	ADD_ITEM_TO_BACKPACK,
	DEL_ITEM_FROM_BACKPACK,
	REMOVE_ITEM_FROM_BACKPACK,
	RECALCULATE_TOTAL_PRICE,
	DISCARD_BACKPACK,
	SAVE_BACKPACK,
	CHECKOUT_BACKPACK,
	BACKPACK_IS_LOADING,
	BACKPACK_HAS_ERRORED,
	FETCH_BACKPACK_SUCCESS
} from './types';

export const fetchItems = () => async dispatch => {
	//console.log('_action_fetchItems_Getting Items');
	//const res = await axios.get('/api/items');
	//console.log('_action_fetchItems_Got Items', res.data);
	//dispatch({ type: FETCH_ITEMS, payload: res.data });
	//console.log('_action_fetchItems_state', getState());

	dispatch(BackpackIsLoading(true));
	const res = await axios.get('/api/items');
	dispatch(BackpackIsLoading(false));
	if (!res.data) {
		dispatch(BackpackHasErrored(true));
	}
	//console.log('_action_fetchItems_Got items ', res.data);
	dispatch(FetchBackpackSuccess(res.data));
};

export const fetchUser = () => async dispatch => {
	//console.log('_action_fetchUser_Getting user');
	const res = await axios.get('/api/current_user');
	//console.log('_action_fetchUser_Got user', res.data);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchBackpack = () => async (dispatch, getState) => {
	//console.log('_action_fetchBackpack_state', getState());
	const state = getState();
	const id = state.user._id;
	dispatch(IsLoading(true));
	const res = await axios.get(`/api/backpacks/user/${id}`);
	dispatch(IsLoading(false));
	if (!res.data.backpack) {
		dispatch(HasErrored(true));
	}
	//console.log('_action_fetchBackpack_Got user backpack', res.data.backpack);
	dispatch(FetchDataSuccess(res.data.backpack));
	//dispatch({ type: FETCH_BACKPACK, payload: res.data.backpack });
};

// };

export const addItemToBackpack = id => dispatch => {
	//console.log('_action_addItemToBackpack ', id);
	dispatch({ type: ADD_ITEM_TO_BACKPACK, payload: id });
};
export const delItemFromBackpack = id => dispatch => {
	//console.log('_action_delItemFromBackpack ', id);
	dispatch({ type: DEL_ITEM_FROM_BACKPACK, payload: id });
};
export const removeItemFromBackpack = id => dispatch => {
	//console.log('_action_removeItemFromBackpack ', id);
	dispatch({ type: REMOVE_ITEM_FROM_BACKPACK, payload: id });
};
export const recalcutateTotalPrice = () => (dispatch, getState) => {
	//console.log('_action_recalculateTotalPrice');
	const state = getState();
	const items = state.items;
	dispatch({
		type: RECALCULATE_TOTAL_PRICE,
		items: items
	});
};
export const discardBackpack = id => async dispatch => {
	//console.log('_action_discardBackpack');
	const res = await axios.get(`/api/backpacks/${id}/del`);
	dispatch({ type: DISCARD_BACKPACK, payload: res });
};
export const saveBackpack = backpack => async dispatch => {
	//console.log('_action_saveBackpack');
	const res = await axios.post(
		`/api/backpacks/${backpack._id}/update`,
		backpack
	);
	dispatch({ type: SAVE_BACKPACK, payload: res });
};
export const checkoutBackpack = id => dispatch => {
	//console.log('_action_checkoutBackpack');
	const res = 'checked out';
	dispatch({ type: CHECKOUT_BACKPACK, payload: res });
};
export function BackpackHasErrored(bool) {
	return {
		type: HAS_ERRORED,
		hasErrored: bool
	};
}

export function BackpackIsLoading(bool) {
	return {
		type: IS_LOADING,
		isLoading: bool
	};
}

export function FetchBackpackSuccess(backpack) {
	return {
		type: FETCH_BACKPACK_SUCCESS,
		backpack
	};
}
export function ItemsHasErrored(bool) {
	return {
		type: HAS_ERRORED,
		hasErrored: bool
	};
}

export function ItemsIsLoading(bool) {
	return {
		type: IS_LOADING,
		isLoading: bool
	};
}
export function FetchItemsSuccess(items) {
	return {
		type: FETCH_ITEMS_SUCCESS,
		items
	};
}
