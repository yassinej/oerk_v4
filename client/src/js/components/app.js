import React, { Component } from 'react';
import { Router, Route, Link, withRouter } from 'react-router-dom';
import history from '../helpers/history';

import NavHeading from './Nav/NavHeading';
import Landing from './Landing';
import ItemList from './ItemList';
import Backpack from './Backpack';
import { connect } from 'react-redux';
import * as actions from '../actions/userActions';
//Allows NavBar to access Location. Useful for Active class
const LocatedNavHeading = withRouter(NavHeading);

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
		//console.log('NavHeading_props', this.props);
	}
	render() {
		return (
			<Router history={history}>
				<div>
					<LocatedNavHeading />
					<Route exact path="/" component={Landing} />
					<Route path="/items" component={ItemList} />
					<Route path="/backpack" component={Backpack} />
				</div>
			</Router>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}
export default connect(mapStateToProps, actions)(App);
