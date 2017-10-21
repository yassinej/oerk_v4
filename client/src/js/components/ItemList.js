import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/backpackActions';
import imageURL from '../../assets/backpack.png';
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
				style={{
					margin: '5px',
					border: '1px solid #ccc',
					float: 'left',
					width: '180px'
				}}
				key={item._id}
			>
				<img
					src={imageURL}
					width="300"
					height="200"
					style={{
						width: '100%',
						height: 'auto'
					}}
				/>
				<div
					style={{
						padding: '15px',
						textAlign: 'center'
					}}
				>
					<h3>{item.name}</h3>
					<div>
						<button onClick={this.handlePlusOne.bind(this, item._id)}>
							<i className="fa fa-plus-square" aria-hidden="true" />
						</button>
						<button onClick={this.handleMinusOne.bind(this, item._id)}>
							<i className="fa fa-minus-square" aria-hidden="true" />
						</button>
						<button onClick={this.handleBinOne.bind(this, item._id)}>
							<i className="fa fa-trash" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div>
				<Backpack />
				<h1>Items List</h1>
				{this.renderItems()}
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
