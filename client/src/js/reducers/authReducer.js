import { USER_AUTH, USER_UNAUTH } from '../actions/types';
function authenticate(state) {
	return Object.assign({}, state, { authenticated: true });
}
function unAuthenticate(state) {
	return Object.assign({}, state, { authenticated: false });
}
export default function(state = {}, action) {
	let updatedState;
	switch (action.type) {
		case USER_AUTH:
			//console.log('authReducer_USER_AUTH');
			updatedState = authenticate(state);
			return updatedState;
		case USER_UNAUTH:
			//console.log('authReducer_USER_UNAUTH');
			updatedState = unAuthenticate(state);
			return updatedState;
		default:
			return state;
	}
}
