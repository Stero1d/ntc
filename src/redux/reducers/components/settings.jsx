
const initState = {
   language: '',
   page: 'home'
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'SWITCH_LANGUAGE':
            let language = action.payload.language;
            return {
                ...state,
                ['language']: language
            }
         break;
        case 'SWITCH_PAGE': {
            let page = action.payload.page;
            return {
                ...state,
                ['page']: page
            }
        }
            break;
        default: break;
    }

    return state;
}