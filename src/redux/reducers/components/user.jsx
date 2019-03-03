const initState = {};

export default (state = initState, action) => {

    switch (action.type) {
        case 'USER':{
            let user = action.payload.user;
            return {
                ...user
            }
        }
            break;
        default: break;
    }

    return state;
}