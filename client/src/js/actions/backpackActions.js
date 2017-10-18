import axios from 'axios';

import {
	ADD_ITEM_TO_BACKPACK,
	DEL_ITEM_FROM_BACKPACK,
	REMOVE_ITEM_FROM_BACKPACK,
	RECALCULATE_TOTAL_PRICE,
	DISCARD_BACKPACK,
	SAVE_BACKPACK,
	CHECKOUT_BACKPACK,
	BACKPACK_IS_LOADING,
	BACKPACK_HAS_ERRORED,
	FETCH_BACKPACK_SUCCESS,
	BACKPACK_LOADED
} from './types';

export const fetchBackpack = () => async (dispatch, getState) => {
	console.log('_action_fetchBackpack_state', getState());
	const state = getState();
	const id = state.user._id;
	dispatch(BackpackIsLoading(true));
	const res = await axios.get(`/api/backpacks/user/${id}`);
	dispatch(BackpackIsLoading(false));
	if (!res.data.backpack) {
		dispatch(BackpackHasErrored(true));
	}
	console.log('_action_fetchBackpack_Got user backpack', res.data.backpack);
	dispatch(FetchBackpackSuccess(res.data.backpack));
	dispatch(BackpackLoaded(true));
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
	console.log('_action_discardBackpack');
	const res = await axios.get(`/api/backpacks/${id}/del`);
	dispatch({ type: DISCARD_BACKPACK, payload: res });
};
export const saveBackpack = backpack => async dispatch => {
	console.log('_action_saveBackpack');
	const res = await axios.post(
		`/api/backpacks/${backpack._id}/update`,
		backpack
	);
	dispatch({ type: SAVE_BACKPACK, payload: res });
};
export const checkoutBackpack = id => dispatch => {
	console.log('_action_checkoutBackpack');
	const res = 'checked out';
	dispatch({ type: CHECKOUT_BACKPACK, payload: res });
};
export function BackpackHasErrored(bool) {
	return {
		type: BACKPACK_HAS_ERRORED,
		hasErrored: bool
	};
}

export function BackpackIsLoading(bool) {
	return {
		type: BACKPACK_IS_LOADING,
		isLoading: bool
	};
}
export function BackpackLoaded(bool) {
	return {
		type: BACKPACK_LOADED,
		loaded: { backpackLoaded: bool }
	};
}
export function FetchBackpackSuccess(backpack) {
	return {
		type: FETCH_BACKPACK_SUCCESS,
		backpack
	};
}
