/**
 * Created by smalkov on 05.09.2018.
 */
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import history from "../history";

import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


const preloadedState = {};
function makeStore() {
    return createStore(reducers,
        preloadedState,
        composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history))));
}

const ReduxStore = makeStore();

export default ReduxStore;