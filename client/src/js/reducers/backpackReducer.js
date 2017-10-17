import _ from 'lodash';
import {
	FETCH_BACKPACK,
	ADD_ITEM_TO_BACKPACK,
	DEL_ITEM_FROM_BACKPACK,
	REMOVE_ITEM_FROM_BACKPACK,
	RECALCULATE_TOTAL_PRICE,
	DISCARD_BACKPACK,
	SAVE_BACKPACK,
	CHECKOUT_BACKPACK
} from '../actions/types';

function addItem(backpack, id) {
	const bItems = backpack.items;
	bItems[_.findIndex(bItems, ['_id', id])].itemQuantity++;
	return Object.assign({}, backpack, {
		items: bItems
	});
}
function delItem(backpack, id) {
	const bItems = backpack.items;
	bItems[_.findIndex(bItems, ['_id', id])].itemQuantity--;
	return Object.assign({}, backpack, {
		items: bItems
	});
}
function removeItem(backpack, id) {
	const bItems = backpack.items;
	_.remove(bItems, ['_id', id]);
	return Object.assign({}, backpack, {
		items: bItems
	});
}
function removeBackpack() {
	return Object.assign({}, backpack, {});
}

function reCalculate(backpack, allItems) {
	let newTotalPrice = 0;
	_.forEach(backpack.items, item => {
		let id = item._id;
		const o = _.findIndex(allItems, ['_id', id]);
		newTotalPrice +=
			item.itemQuantity * allItems[o].price * backpack.rentalDuration;
	});

	return Object.assign({}, backpack, {
		totalPrice: newTotalPrice
	});
}

export default function(state = {}, action) {
	let updatedState;

	switch (action.type) {
		case FETCH_BACKPACK:
			action.payload.fetched = true;
			//console.log('backpackReducer_FETCHBACKPACK', action);
			return action.payload;

		case ADD_ITEM_TO_BACKPACK:
			//console.log('backpackReducer_ADD_ITEM_TBACKPACK');
			updatedState = addItem(state, action.payload);
			return updatedState;
		case DEL_ITEM_FROM_BACKPACK:
			//console.log('backpackReducer_DEL_ITEM_FROMBACKPACK');
			updatedState = delItem(state, action.payload);
			return updatedState;
		case REMOVE_ITEM_FROM_BACKPACK:
			//console.log('backpackReducer_REMOVE_ITEM_FROMBACKPACK');
			updatedState = removeItem(state, action.payload);
			return updatedState;
		case RECALCULATE_TOTAL_PRICE:
			const { items } = action;
			updatedState = reCalculate(state, items);
			return updatedState;
		case DISCARD_BACKPACK:
			console.log('backpackReducer_DISCARD_BACKPACK', action.payload);
			return state;
		case SAVE_BACKPACK:
			console.log('backpackReducer_SAVE_BACKPACK', action.payload);
			return state;
		case CHECKOUT_BACKPACK:
			console.log('backpackReducer_CHECKOUT_BACKPACK', action.payload);
			return state;
		default:
			return state;
	}
}
