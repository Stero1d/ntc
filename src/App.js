import React, {Component} from 'react';
import { Router } from "react-router-dom";
import {Provider} from "react-redux";
/*Custom components*/
import Main from "./components/scenes/main/Main"
import history from "./history";
/*css*/
import './App.css';

const App = ({store}) => {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Main/>
                </Router>
            </Provider>
        )
};
export default(App);