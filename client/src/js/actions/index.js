import axios from 'axios';

import { FETCH_ITEMS } from './types';

export const fetchItems = () => async dispatch => {
	//console.log('_action_fetchItems_Getting Items');
	const res = await axios.get('/api/items');
	//console.log('_action_fetchItems_Got Items', res.data);
	dispatch({ type: FETCH_ITEMS, payload: res.data });
};
