
const initState = {
    isOpen: false,
    title: '',
    text: '',
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'WARNING_DIALOG': {
            let isOpen = action.payload.isOpen;
            let title = action.payload.title;
            let text = action.payload.text;
            return {
                ...state,
                isOpen: isOpen,
                title: title,
                text: text
            }
            break;
        }
        default: break;
    }

    return state;
}