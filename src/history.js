/**
 * Created by smalkov on 05.09.2018.
 */
import createHistory from 'history/createBrowserHistory'
import React from "react";
import ReactDOM from "react-dom";
import ReduxStore from "./redux/ReduxStore"

let history = createHistory();
const _push = history.push;
const _goBack = history.goBack;
const pagesWithConfirmation = ['edit', 'create'];

export const createNotificationDialog = (notyEvents, isCreateEntity) => {
    const container = document.getElementById('noty');
    let elem = <div></div>;

    ReactDOM.render(elem, container);
};

const callTheNotify = (move) => {

    let pathArray = history.location.pathname.split('/');
    let lastPointInThePath = pathArray[pathArray.length - 1];
    let penultInThePath = pathArray[pathArray.length - 2];
    let isConfirmationNeeded = pagesWithConfirmation.includes(lastPointInThePath) || pagesWithConfirmation.includes(penultInThePath);

    if(isConfirmationNeeded){
        const isCreateEntityPanel = lastPointInThePath === 'create' || penultInThePath === 'create';
        let entityState = isCreateEntityPanel ? ReduxStore.getState().createEntity : ReduxStore.getState().editEntity;
        let notyEvents = entityState.notyEvents;

        if(notyEvents && notyEvents.dataWasChanged){
            notyEvents.onDoNotSave = move;
            createNotificationDialog(notyEvents, isCreateEntityPanel);
        }else{
            move();
        }
    }else{
        move();
    }

};

history.push = (push, state) => {
    callTheNotify(()=>{_push(push, state)});
};

history.goBack = () => {
    callTheNotify(_goBack);
};

export default history;