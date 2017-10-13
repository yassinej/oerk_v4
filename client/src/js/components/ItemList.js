import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ItemList extends Component {
	render() {
		return <div>Items from DB</div>;
	}
}
function mapStateToProps(state) {
	return { items: state.items };
}
export default connect(mapStateToProps, actions)(ItemList);
