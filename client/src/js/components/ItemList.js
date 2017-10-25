import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/backpackActions';
import imageURL from '../../assets/item.jpg';
import Backpack from './Backpack';

class ItemList extends Component {
	handlePlusOne(id) {
		this.props.addItemToBackpack(id);
	}
	handleMinusOne(id) {
		this.props.delItemFromBackpack(id);
	}
	handleBinOne(id) {
		this.props.removeItemFromBackpack(id);
	}
	renderItems() {
		if (!this.props.items) {
			return <h3>Empty Items DB...</h3>;
		}
		if (!this.props.items.length) {
			return <h3>Loading Items...</h3>;
		}
		return this.props.items.map(item => {
			return this.renderItem(item);
		});
	}
	renderItem(item) {
		return (
			<div
				key={item._id}
				className=" col-sm-6 col-md-3 py-3"
				style={{
					textAlign: 'center'
				}}
			>
				<img className="img-fluid img-thumbnail" src={imageURL} />
				<div>
					<span className="text-dark">{item.name}</span>
				</div>
				<div>
					<span className="text-info">{item.price}€/day</span>
				</div>

				<button
					className="btn btn-dark"
					onClick={this.handlePlusOne.bind(this, item._id)}
				>
					<i className="fa fa-plus-square" aria-hidden="true" />
				</button>

				<button
					className="btn btn-secondary "
					onClick={this.handleMinusOne.bind(this, item._id)}
				>
					<i className="fa fa-minus-square" aria-hidden="true" />
				</button>
			</div>
		);
	}
	render() {
		return (
			<div className="row equal">
				<div className="col-md-1" />
				<div className="col-md-8 col-lg-8">
					<div className="row pt-4 pb-2">
						<div className="dropdown  mx-auto">
							<button
								className="btn btn-dark dropdown-toggle"
								type="button"
								id="dropdownMenuButton"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Categories
							</button>
							<div
								className="dropdown-menu"
								aria-labelledby="dropdownMenuButton"
							>
								<a className="dropdown-item" href="#">
									Action
								</a>
								<a className="dropdown-item" href="#">
									Another action
								</a>
								<a className="dropdown-item" href="#">
									Something else here
								</a>
							</div>
						</div>
						<div
							className="btn-group  mx-auto"
							role="group"
							aria-label="Basic example"
						>
							<button type="button" className="btn btn-info">
								<i className="fa fa-th-large" aria-hidden="true" /> Grid
							</button>
							<button type="button" className="btn btn-warning">
								<i className="fa fa-th-list" aria-hidden="true" /> List
							</button>
						</div>
					</div>
					<hr />
					<div className="row no-gutters">
						<div className="container py-2 pr-4">
							<div className="row text-center mx-auto">
								{this.renderItems()}
							</div>
						</div>
					</div>
				</div>
				<Backpack />
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		items: state.items,
		backpack: state.backpack,
		isLoading: state.isLoading,
		hasErrored: state.hasErrored
	};
}
export default connect(mapStateToProps, actions)(ItemList);
