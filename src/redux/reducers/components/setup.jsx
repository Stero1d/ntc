const initState = {
    params: {
        tabLeftMenu: 'personalData',
        edit: false
    },
    personalData: {
        id: '',
        birthday: '',
        name: '',
        rank: '',
        avatarId: '',
        newAvatar: '',
        city: '',
        about: '',
        status: ''
    }
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'USER':{
                let user = action.payload.user;
                return {
                    ...state,
                     personalData: user,
                    params: {
                        ...state.params,
                        ['edit']: false
                    }
                }
            break;
            }
        case 'CLEAR_SETUP_USER':{
            return {
                ...initState
            }
            break;
        }
        case 'SWITCH_SETUP_MENU_TAB': {
            let tabMenu = action.payload.tabMenu;
            return {
                ...state,
                ['tabLeftMenu']: tabMenu
            }
            break;
        }
        case 'SUCCESS_SAVE_DATA': {
            let block = action.payload.block;
            return {
                [block]: {
                    ...state,
                },
                params: {
                    ...state.params,
                    ['edit']: false
                }
            }
            break;
        }
        case 'HANDLE_CHANGE_SETUP_DATA': {
            let value = action.payload.value;
            let type = action.payload.type;
            let block = action.payload.block;
            return {
                ...state,
                [block]: {
                    ...state[block],
                    [type]: value
                },
                params: {
                    ...state.params,
                    ['edit']: true
                }

            }
            break;
        }
        default: break;
    }

    return state;
}