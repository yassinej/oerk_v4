import _ from 'lodash';
import {
	FETCH_BACKPACK,
	ADD_ITEM_TO_BACKPACK,
	ADD_EXISTINGITEM_TO_BACKPACK,
	DEL_ITEM_FROM_BACKPACK,
	REMOVE_ITEM_FROM_BACKPACK,
	RECALCULATE_TOTAL_PRICE,
	DISCARD_BACKPACK,
	SAVE_BACKPACK,
	CHECKOUT_BACKPACK,
	BACKPACK_IS_LOADING,
	BACKPACK_HAS_ERRORED,
	FETCH_BACKPACK_SUCCESS,
	RENTAL_DURATION_BACKPACK
} from '../actions/types';

function addItem(backpack, item) {
	let bItems = backpack.items;
	bItems = [...bItems, item];
	return Object.assign({}, backpack, {
		items: bItems
	});
}
function addExistingItem(backpack, id) {
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
function checkout(state) {
	return Object.assign({}, state, { checkedOut: true });
}
function changeDuration(state, duration) {
	return Object.assign({}, state, { rentalDuration: duration });
}
export default function(state = {}, action) {
	let updatedState;

	switch (action.type) {
		case ADD_EXISTINGITEM_TO_BACKPACK:
			//console.log('backpackReducer_ADD_EXISTINGITEM_TOBACKPACK');
			updatedState = addExistingItem(state, action.payload);
			return updatedState;
		case ADD_ITEM_TO_BACKPACK:
			//console.log('backpackReducer_ADD_ITEM_TOBACKPACK');
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
		case RENTAL_DURATION_BACKPACK:
			updatedState = changeDuration(state, action.payload);
			return updatedState;
		case DISCARD_BACKPACK:
			//console.log('backpackReducer_DISCARD_BACKPACK', action.payload);
			return state;
		case SAVE_BACKPACK:
			//console.log('backpackReducer_SAVE_BACKPACK', action.payload);
			return state;
		case CHECKOUT_BACKPACK:
			//console.log('backpackReducer_CHECKOUT_BACKPACK', action.payload);
			return state;
		case FETCH_BACKPACK_SUCCESS:
			//console.log('backpackReducer_FETCH_BACKPACK_SUCCESS', action);
			return action.backpack;
		default:
			return state;
	}
}
