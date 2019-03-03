const initState = {
    tabLeftActivities: 'members',
    communityMembers: {
        users: {}
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_ACTIVITIES_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftActivities']: tabMenu
            }
        }
        case 'GET_LIST_USERS_ACTIVITIES': {
            let listUsers = action.payload.listUsers;
            return {
                ...state,
                communityMembers: {
                    ...state.communityMembers,
                    users: {
                        ...listUsers
                    }
                },
            }
            break;
        }
        default: break;
    }
    return state;
}