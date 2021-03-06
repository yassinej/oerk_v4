import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import backpackReducer from './backpackReducer';
import authReducer from './authReducer';
import isLoading from './dataHandling/IsLoadingReducer';
import loaded from './dataHandling/loadedReducer';
import hasErrored from './dataHandling/HasErroredReducer';

const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
	backpack: backpackReducer,
	isLoading: isLoading,
	loaded: loaded,
	hasErrored: hasErrored,
	auth: authReducer
});

export default rootReducer;
