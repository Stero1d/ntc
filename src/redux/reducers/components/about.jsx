const initState = {
    tabLeftAbout: 'mission',
    communityMembers: {
    users: []
    }
};

export default (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_ABOUT_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftAbout']: tabMenu
            }
        }
        default: break;
    }
    return state;
}