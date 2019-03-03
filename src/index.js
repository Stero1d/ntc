import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import ReduxStore from './redux/ReduxStore';

ReactDOM.render(
    <App store={ReduxStore}/>
    , document.getElementById("root"));
