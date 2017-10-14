import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer
});

export default rootReducer;
