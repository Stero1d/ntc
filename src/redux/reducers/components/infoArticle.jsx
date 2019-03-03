const initState = {

};

export default (state = initState, action) => {

    switch (action.type) {
        case 'GET_ARTICLE_INFO': {
            let article = action.payload.article;
            return {
                ...article,
            }
            break;
        }
        case 'CLEAR_INFO_ARTICLE': {
            return {
                ...initState
            }
            break;
        }
        case 'SAVE_COMMENTS': {
            let comments = action.payload.comments;
            return {
                ...state,
                ['comments']: comments
            }
            break;
        }
        default: break;
    }

    return state;
}