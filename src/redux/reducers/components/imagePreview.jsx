const initState = {
    file: '',
    preview: ''
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'IMAGE_PREVIEW': {
            let preview = action.payload.preview;
            let file = action.payload.file;
            return {
                ...state,
                preview: preview,
                file: file,
            }
            break;
        }
        case 'CLEAR_PREVIEW': {
            return {
                ...initState
            }
            break;
        }
        default: break;
    }

    return state;
}