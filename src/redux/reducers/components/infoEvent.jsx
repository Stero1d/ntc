const initState = {
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'GET_EVENT_INFO': {
            let event = action.payload.event;
            return {
                ...event,
            }
            break;
        }
        case 'CLEAR_INFO_EVENT': {
            return {
                ...initState
            }
            break;
        }
        case 'ONCHANGE_EVENT': {
            let field = action.payload.field;
            let value = action.payload.value;
            return {
                ...state,
                [field]: value
            }
        }
        default: break;
    }

    return state;
}