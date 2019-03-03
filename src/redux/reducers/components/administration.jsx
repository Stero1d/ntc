/*utils*/
import { sortField } from "../../../utils/utils";

const initState = {
    tabLeftAdministration: 'users',
    articles: {
        list: {}
    },
    users: {
        list: {}
    },
    events: {
        list: {}
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_ADMINISTRATION_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftAdministration']: tabMenu
            }
        }
        case 'ADMINISTRATION_GET_USERS': {
            let reviewSort = [];
            let dateSort = [];
            let newUsersSort = [];
            let users = action.payload.users;
            for (let i = 0; i< users.length; i++) {
                if (users[i].status === 'REVIEW') {
                    reviewSort.push(users[i]);
                } else {
                    dateSort.push(users[i]);
                }
            }
            newUsersSort = reviewSort.sort(sortField('createTime')).concat(dateSort.sort(sortField('createTime')));
            return {
                ...state,
                ['users']: {
                    list: newUsersSort
                }
            }
        }
        case 'ADMINISTRATION_GET_ARTICLES': {
            let articles = action.payload.articles;
            return {
                ...state,
                ['articles']: {
                    list: articles
                }
            }
        }
        case 'ADMINISTRATION_GET_NEWS': {
            let events = action.payload.events;
            return {
                ...state,
                ['events']: events
            }
        }
        case 'SAVE_EVENT': {
            let newEvent = action.payload.newEvent;
            let events = action.payload.events;
            let isNewEvent = action.payload.isNewEvent;
            if(events && !events.length || isNewEvent) {
                events.push(newEvent)
            } else {
                for(let i = 0; i < events.length; i++) {
                    if(events[i].id === newEvent.id) {
                        events[i] = newEvent;
                    }
                }
            }
            return {
                ...state,
                events: {
                    ...state.events,
                    ['list']: events
                }
            }
        }

        default: break;
    }
    return state;
}