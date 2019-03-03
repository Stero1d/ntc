const initState = {
    data: []
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'SAVE_SUBJECTS': {
            let subjects = action.payload.subjects;
            return {
                data: subjects
            }
            break;
        }
        default: break;
    }

    return state;
}