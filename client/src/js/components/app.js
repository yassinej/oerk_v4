import React, { Component } from 'react';
import { Router, Route, Link, withRouter } from 'react-router-dom';
import history from '../helpers/history';

import NavHeading from './NavHeading';
import Landing from './Landing';
import ItemList from './ItemList';

//Allows NavBar to access Location. Useful for Active class
const LocatedNavHeading = withRouter(NavHeading);

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<LocatedNavHeading />
					<Route exact path="/" component={Landing} />
					<Route path="/items" component={ItemList} />
				</div>
			</Router>
		);
	}
}

export default App;
