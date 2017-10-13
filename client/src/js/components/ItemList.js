import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import imageURL from '../../assets/backpack.png';

class ItemList extends Component {
	componentWillMount() {
		this.props.fetchItems();
	}
	renderItems() {
		if (!this.props.items) {
			return <h3>Empty Items DB...</h3>;
		}
		if (!this.props.items.length) {
			return <h3>Loading Items...</h3>;
		}
		return this.props.items.map(item => {
			return this.render(item);
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
			>
				<img
					src={imageURL}
					width="300"
					height="200"
					style={{
						width: '100%',
						height: auto
					}}
				/>
				<div
					style={{
						padding: '15px',
						textAlign: center
					}}
				>
					{item.name}
				</div>
			</div>
		);
	}
	render() {
		return (
			<div>
				<h1>Items List</h1>
				{this.renderItems()}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { items: state.items };
}
export default connect(mapStateToProps, actions)(ItemList);
