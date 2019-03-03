const initState = {
    article: {
        id: null,
        label: '',
        subjectId: '',
        annotation: '',
        text: "",
        imageId: null,
        keyWords: null
    },
    params: {
        subjects: [],
        isFullScreenEditor: false,
        preview: false,
        edit: false,
        create: false
    }
};

export default (state = initState, action) => {

    switch (action.type) {
        case 'ON_CHANGE_ARTICLE': {
            let type = action.payload.type;
            let text = action.payload.text;
            return {
                ...state,
                article: {
                    ...state.article,
                    [type]: text
                }
            }
            break;
        }
        case 'SAVE_SUBJECTS': {
            let subjects = action.payload.subjects;
            let newSubjects = [];
            for(let i = 0; i < subjects.length; i++) {
                let element = {
                    key: i,
                    text: subjects[i].label,
                    value: subjects[i].id
                };
                newSubjects.push(element);
            }
            return {
                ...state,
                params: {
                    ...state.params,
                    ['subjects']: newSubjects
                }
            }
            break;
        }
        case 'IS_FULL_SCREEN_PREVIEW_EDITOR': {
            let isOpen = action.payload.isOpen;
            let type = action.payload.type;
            return {
                ...state,
                    params: {
                        ...state.params,
                        [type]: isOpen
                    }
            }
            break;
        }
        case 'CLEAR_ARTICLE_CREATE': {
            return {
                ...initState
            }
            break;
        }
        case 'ARTICLE_EDIT': {
            let articleEdit = action.payload.articleEdit;
            return {
                ...state,
                params: {
                    ...state.params,
                    ['edit']: true
                },
                article: {
                    ...articleEdit
                }
            }
        }

        case 'ARTICLE_CREATE': {
            return {
                ...state,
                params: {
                    ...state.params,
                    ['create']: true
                }
            }
        }

        default: break;
    }

    return state;
}