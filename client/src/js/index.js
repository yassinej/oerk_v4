import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

let store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
