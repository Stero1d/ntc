const initState = {
    signUp: '',
    isError: false,
    text: ''
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'WINDOW_REGISTRATION': {
            let isOpen = action.payload.isOpen;
            return {
                ...state,
                signUp: isOpen,
                isError: false,
                text: ''
            };
            break;
        }
        case 'REGISTRATION':
            let data = action.payload.data;
            let signUp = 'success';
            let isError = false;
            let text = '';
            if(data.status !== 200) {
                signUp = 'error';
                isError = true;
                text = data.data.message;
            }

            return {
                ...state,
                signUp: signUp,
                isError: isError,
                text: text
            };
            break;
        default: break;

    }
    return state
}