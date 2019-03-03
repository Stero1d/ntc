const initState = {
    isCheckedAuth: false,
    signIn: false,
    errorMessage: ''
};

export default (state = initState, action) => {

    switch (action.type) {
        case "WINDOW_SIGN_UP_IN":
            let isOpen = action.payload.isOpen;
            return {
                ...state,
                ['signIn']: isOpen
            };
            break;
        case "CHECK_AUTH_SUCCESS":
            return {
                ...state,
                isPending: false,
                isFailure: false,
                isCheckedAuth: action.payload.isCheckedAuth,
                profile: action.payload.profile
            };
        break;
        case "CHECK_AUTH_PENDING":
            return {
                ...state,
                isPending: true,
                isFailure: false,
            };
        break;
        case "CHECK_AUTH_FAIL":
            let errorMessage = action.payload.errorMessage;
            return {
                ...state,
                errorMessage: errorMessage,
            };
        break;
        default: break;

    }
    return state
}