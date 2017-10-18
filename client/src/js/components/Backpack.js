import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as actions from '../actions/backpackActions';

class Backpack extends Component {
	handleAddItem(id) {
		this.props.addItemToBackpack(id);
	}
	handleDelItem(id) {
		this.props.delItemFromBackpack(id);
	}
	handleRemoveItem(id) {
		this.props.removeItemFromBackpack(id);
	}
	handleRecalculate() {
		this.props.recalcutateTotalPrice();
	}
	handleDiscard(id) {
		this.props.discardBackpack(id);
	}
	handleSave(backpack) {
		this.props.saveBackpack(backpack);
	}
	handleCheckout(id) {
		this.props.checkoutBackpack(id);
	}
	renderItems() {
		if (!this.props.backpack) {
			return (
				<tr>
					<td>Empty Items DB...</td>
				</tr>
			);
		}
		if (!this.props.backpack.items) {
			return (
				<tr>
					<td>Loading Items...</td>
				</tr>
			);
		}
		return this.props.backpack.items.map(item => {
			return this.renderItem(item);
		});
	}
	renderItem(item) {
		const i = _.findIndex(this.props.items, ['_id', item._id]);
		const { name, price } = this.props.items[i];
		return (
			<tr key={item._id} style={{ textAlign: 'center' }}>
				<td>{item._id}</td>
				<td>{name}</td>
				<td>{item.itemQuantity}</td>
				<td>{price}</td>
				<td>
					<button onClick={this.handleAddItem.bind(this, item._id)}>
						More
					</button>
					<button onClick={this.handleDelItem.bind(this, item._id)}>
						Less
					</button>
					<button onClick={this.handleRemoveItem.bind(this, item._id)}>
						Remove
					</button>
				</td>
			</tr>
		);
	}
	renderBackPack() {
		if (this.props.backpack) {
			return (
				<div>
					<h4>
						{this.props.backpack.totalPrice}€ for{' '}
						{this.props.backpack.rentalDuration} days
					</h4>
					<button onClick={this.handleRecalculate.bind(this)}>
						ReCalculate
					</button>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Quantity</th>
								<th>Price</th>
								<th />
							</tr>
						</thead>
						<tbody>{this.renderItems()}</tbody>
					</table>
					<button
						onClick={this.handleDiscard.bind(this, this.props.backpack._id)}
					>
						Discard your backpack
					</button>
					<button onClick={this.handleSave.bind(this, this.props.backpack)}>
						Save your backpack
					</button>
					<button
						onClick={this.handleCheckout.bind(this, this.props.backpack._id)}
					>
						Checkout your backpack
					</button>
				</div>
			);
		}
	}
	render() {
		console.log('render', this.props);
		return (
			<div>
				<h4>{this.props.user.name}'s Backpack</h4>
				{this.renderBackPack()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	//console.log(state);
	return {
		backpack: state.backpack,
		user: state.user,
		items: state.items,
		isLoading: state.isLoading,
		hasErrored: state.hasErrored
	};
}

export default connect(mapStateToProps)(Backpack);
