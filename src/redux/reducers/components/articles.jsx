const initState = {
    newArticles: {},
    popularArticles: {},
    events: []
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'MAIN_PAGE_GET_SAVE_ARTICLES': {
            let articles = action.payload.articles;
            return {
                ...state,
                newArticles: articles,
                popularArticles: articles
            }
            break;
        }
        default: break;
    }

    return state;
}