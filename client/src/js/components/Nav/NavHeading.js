import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import * as actions from '../../actions';
import logo from '../../../assets/backpack.png';
class NavHeading extends Component {
	renderLogin() {
		if (!this.props.user) {
			return (
				<button>
					<Link to="/auth/google">SignIn with Google</Link>
				</button>
			);
		}
		return (
			<button>
				<Link to="/api/signout">SignOut</Link>
			</button>
		);
	}
	render() {
		return (
			<div>
				<img
					src={logo}
					style={{
						height: '50px',
						width: '80px'
					}}
				/>
				<ul>
					<li>
						<NavLink to="/">Home</NavLink>
					</li>
					<li>
						<NavLink to="/items">Items</NavLink>
					</li>
				</ul>
				{this.renderLogin()}
				<ul />
			</div>
		);
	}
}
function mapStateToProps(state) {
	return { user: state.user };
}
export default connect(mapStateToProps, actions)(NavHeading);
