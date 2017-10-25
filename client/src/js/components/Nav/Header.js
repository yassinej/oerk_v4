import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/userActions';
import logo from '../../../assets/backpack.png';
import { NavLink } from 'react-router-dom';

class Header extends Component {
	handleSignOut() {
		this.props.signOutUser();
	}
	renderLogin() {
		if (!this.props.auth.authenticated) {
			return (
				<ul className="navbar-nav mt-2 mt-lg-0 flex-row">
					<li className="nav-item">
						<a className="nav-link text-danger" href="/auth/google">
							Log In with Google
						</a>
					</li>
				</ul>
			);
		}
		return (
			<ul className="navbar-nav mt-2 mt-lg-0 flex-row">
				<li className="nav-item">
					<a
						className="nav-link text-warning"
						onClick={this.handleSignOut.bind(this)}
					>
						Log Out
					</a>
				</li>
				<li className="nav-item">
					<NavLink to="/profile">
						<img
							className="nav-link"
							src={this.props.user.avatar}
							style={{
								padding: '0px',
								maxHeight: '40px',
								borderRadius: '50%',
								border: 'solid 2px white'
							}}
						/>
					</NavLink>
				</li>
			</ul>
		);
	}
	render() {
		return (
			<nav className="navbar navbar-expand-sm navbar-dark bg-info">
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarToggler"
					aria-controls="navbarToggler"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon" />
				</button>
				<img
					className="navbar-brand"
					src={logo}
					style={{
						height: '40px',
						width: '40px',
						borderRadius: '25%'
					}}
				/>

				<div className="collapse navbar-collapse" id="navbarToggler">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/">
								Home
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/items">
								Pack your Gear
							</NavLink>
						</li>
					</ul>
					{this.renderLogin()}
				</div>
			</nav>
		);
	}
}
function mapStateToProps(state) {
	return {
		auth: state.auth,
		user: state.user
	};
}
export default connect(mapStateToProps, actions)(Header);
