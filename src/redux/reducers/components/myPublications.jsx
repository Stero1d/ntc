const initState = {
    tabLeftLibrary: 'all_my_publications',
    articles: {
        all_my_publications: {},
        published: {},
        draft: {},
        review: {},
        archive: {},
        declined: {}
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_MY_PUBLICATIONS_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftLibrary']: tabMenu
            }
        }
        case 'GET_MY_PUBLICATIONS': {
            let articles = action.payload.articles;
            let draft = [], published = [], review = [], archive = [], declined = [];
            for(let i = 0; i < articles.length; i++) {
                switch (articles[i].status) {
                    case 'PUBLISHED': {
                        published.push(articles[i]);
                        break;
                    }
                    case 'DRAFT': {
                        draft.push(articles[i]);
                        break;
                    }
                    case 'REVIEW': {
                        review.push(articles[i]);
                        break;
                    }
                    case 'ARCHIVE': {
                        archive.push(articles[i]);
                        break;
                    }
                    case 'DECLINED': {
                        declined.push(articles[i]);
                        break;
                    }
                    default: break;
                }
            }

            let newArticles = {
               all_my_publications: articles,
               published: published,
               draft: draft,
               review: review,
               archive: archive,
               declined: declined
            };

            return {
                ...state,
                articles: newArticles
            }
        }
        default: break;
    }
    return state;
}