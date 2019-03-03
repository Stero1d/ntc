const initState = {
    tabLeftLibrary: 'our_publications',
    articles: {
        our_publications: {},
        other_publications: {},
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_LIBRARY_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftLibrary']: tabMenu
            }
        }
        case 'GET_ARTICLES_LIBRARY': {
            let articles = action.payload.articles;
            return {
                ...state,
                articles: {
                    our_publications: {
                        ...articles
                    }
                }
            }
        }
        default: break;
    }
    return state;
}