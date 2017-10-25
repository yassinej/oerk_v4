import React, { Component } from 'react';
import { Router, Route, Link, withRouter } from 'react-router-dom';
import history from '../helpers/history';
import Header from './Nav/Header';
import Footer from './Nav/Footer';
import Landing from './Landing';
import ItemList from './ItemList';

import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';
import { fetchItems } from '../actions/itemsActions';
import { fetchBackpack } from '../actions/backpackActions';
//Allows NavBar to access Location. Useful for Active class

const LocatedHeader = withRouter(Header);
class App extends Component {
	componentWillReceiveProps(nextProps) {
		//console.log('nextprops ', nextProps);
		if (
			nextProps.loaded.userLoaded &&
			nextProps.loaded.itemsLoaded &&
			!nextProps.loaded.backpackLoaded &&
			!nextProps.backpack._id
		)
			this.props.fetchBackpack();
	}
	componentWillMount() {}
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchItems();
	}
	render() {
		return (
			<Router history={history}>
				<div className="container-fluid p-0">
					<LocatedHeader />
					<Route exact path="/" component={Landing} />
					<Route path="/items" component={ItemList} />
					<Footer />
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		items: state.items,
		backpack: state.backpack,
		loaded: state.loaded
	};
}
export default connect(mapStateToProps, {
	fetchUser,
	fetchItems,
	fetchBackpack
})(App);
