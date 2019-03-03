const initState = {};

export default (state = initState, action) => {

    switch (action.type) {
        case 'SAVE_USER_INFO_CARD':{
            let userInfo = action.payload.userInfo;
            return {
                ...userInfo
            }
        }
            break;
        default: break;
    }

    return state;
}