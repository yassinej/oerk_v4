import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/backpackActions';

class Backpack extends Component {
	componentDidMount() {
		this.props.recalcutateTotalPrice();
	}
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
	handleDate(e) {
		this.props.changeRentalDuration(e.target.value);
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
				<td>{name}</td>
				<td>{item.itemQuantity}</td>
				<td>{price}</td>
			</tr>
		);
	}
	renderBackPack() {
		if (this.props.backpack) {
			return (
				<div
					className="col-lg-3 d-md-none d-lg-block bg-info"
					style={{ maxWidth: '100%', height: '100%' }}
				>
					<div className="row py-2">
						<div>
							<div className="pt-4 pb-4 ">
								<h5 className="text-center">
									Rental Duration{'   '}
									<select
										className="btn-warning"
										onChange={this.handleDate.bind(this)}
										value={this.props.backpack.rentalDuration}
									>
										<option>1</option>
										<option>5</option>
										<option>10</option>
									</select>
									{'   '}
									days
								</h5>
							</div>
							<table className="px-2 table table-light table-striped">
								<thead>
									<tr className="bg-warning">
										<th>Name</th>
										<th>Quantity</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									{this.renderItems()}
									<tr style={{ textAlign: 'center' }}>
										<td colSpan="3" className="font-weight-bold">
											Total: {this.props.backpack.totalPrice}€
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="row py-2">
						<div className="btn-group mx-auto">
							<button
								className="btn btn-dark"
								onClick={this.handleRecalculate.bind(this)}
							>
								ReCalculate
							</button>
							<button
								onClick={this.handleCheckout.bind(
									this,
									this.props.backpack._id
								)}
								className="btn btn-secondary"
								type="button"
							>
								Checkout
							</button>
							<button
								type="button"
								className="btn btn-warning dropdown-toggle dropdown-toggle-split"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<span className="sr-only">Toggle Dropdown</span>
							</button>
							<div className="dropdown-menu">
								<a
									className="dropdown-item"
									onClick={this.handleDiscard.bind(
										this,
										this.props.backpack._id
									)}
									href="#"
								>
									Discard
								</a>
								<a
									className="dropdown-item"
									onClick={this.handleSave.bind(this, this.props.backpack)}
									href="#"
								>
									Save
								</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}
	render() {
		//console.log('render', this.props);
		return <div>{this.renderBackPack()}</div>;
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

export default connect(mapStateToProps, actions)(Backpack);
