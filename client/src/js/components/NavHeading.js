import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NavHeading extends Component {
	render() {
		return <div>NavHeading</div>;
	}
}
function mapStateToProps(state) {
	return { user: state.user };
}
export default connect(mapStateToProps, actions)(NavHeading);
