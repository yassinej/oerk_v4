import axios from 'axios';

import {
	USER_IS_LOADING,
	USER_LOADED,
	USER_HAS_ERRORED,
	FETCH_USER_SUCCESS,
	USER_AUTH,
	USER_UNAUTH
} from './types';

export const fetchUser = () => async dispatch => {
	dispatch(UserIsLoading(true));
	//console.log('check user');
	const res = await axios.get('/api/current_user');
	dispatch(UserIsLoading(false));
	if (!res.data) {
		dispatch(UserHasErrored(true));
	} else {
		//console.log('_action_fetchUser_Got user ', res.data);
		dispatch(FetchUserSuccess(res.data));
		dispatch(UserLoaded(true));
	}

	if (res.data.googleToken) {
		//console.log('user authenticated');
		dispatch(UserAuth());
	}
};

export const signOutUser = () => async dispatch => {
	const res = await axios.get('/api/logout');
	dispatch(UserUnAuth());
};
export function UserAuth() {
	return {
		type: USER_AUTH,
		authenticated: true
	};
}
export function UserUnAuth() {
	return {
		type: USER_UNAUTH,
		authenticated: false
	};
}

export function UserHasErrored(bool) {
	return {
		type: USER_HAS_ERRORED,
		hasErrored: bool
	};
}

export function UserIsLoading(bool) {
	return {
		type: USER_IS_LOADING,
		isLoading: bool
	};
}
export function UserLoaded(bool) {
	return {
		type: USER_LOADED,
		loaded: { userLoaded: bool }
	};
}
export function FetchUserSuccess(user) {
	return {
		type: FETCH_USER_SUCCESS,
		user
	};
}
