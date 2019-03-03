const initState = {
    isOpen: false,
    label: '',
    description: '',
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'FEEDBACK': {
            let type = action.payload.type;
            let value = action.payload.value;
            return {
                ...state,
              [type]: value
            }
            break;
        }
        default: break;
    }

    return state;
}