import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from '../reducers'

// configure middleware
const middleware = [thunk];

// configure redux dev tools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers,
    composeEnhancers(applyMiddleware(...middleware))
    );

export default store;