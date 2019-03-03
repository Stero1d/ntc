const initState = {
    list: {}
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'GET_PUBLISH_EVENTS': {
            let events = action.payload.events;
            return {
                ...events
            }
            break;
        }
        default: break;
    }

    return state;
}