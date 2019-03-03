export const API = {
    USER: {
        LOGIN: 'public/login',
        LOGOUT: '/private/logout',
        REGISTRATION: 'public/registration',
        GET_USER_INFO: '/private/getUserInfo',
        SAVE_USER: '/private/saveUser',
        GET_ALL_USERS: 'private/getAllUsers',
    },
    ARTICLE: {
        GET_ALL_ARTICLES: 'public/getAllArticles',
        GET_ARTICLE: 'private/getArticle',
        GET_MY_ARTICLES: 'private/getMyArticles',
        SAVE_ARTICLE: 'private/saveArticle',
        GET_FILTERED_ARTICLES: 'private/getFilteredArticles',
        GET_ALL_ARTICLES_VERSIONS: 'private/getAllArticlesVersions'
    },
    SUBJECTS: {
        GET_ALL_SUBJECTS: 'public/getAllSubjects'
    },
    FILES: {
        FILE_SAVE: 'file/save',
        FILE_GET: 'file/get'
    },
    ADMINISTRATION: {
        GET_USERS: 'admin/getAllUsers ',
        GET_ARTICLES: '',
        SET_STATUS_USER: 'admin/setUserStatus',
        GET_ALL_NEWS: 'private/getAllNews',
        GET_PUBLISH_NEWS: 'public/getNews',
        SAVE_NEWS: 'private/saveNews',
        CONFIRM_ARTICLE: 'private/confirmArticle',
        SET_STATUS_ARTICLE: '',
        DECLINE_ARTICLE: 'private/declineArticle'
    },
    COMMENTS: {
        SAVE_COMMMENT: 'public/saveComment'
    }

};



