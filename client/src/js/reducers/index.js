import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';
import backpackReducer from './backpackReducer';

const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
	backpack: backpackReducer
});

export default rootReducer;
