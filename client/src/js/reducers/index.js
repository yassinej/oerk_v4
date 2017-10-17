import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import backpackReducer from './backpackReducer';
import isLoading from './dataHandling/IsLoadingReducer';
import hasErrored from './dataHandling/HasErroredReducer';

const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
	backpack: backpackReducer,
	isLoading: isLoading,
	hasErrored: hasErrored
});

export default rootReducer;
