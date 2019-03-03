/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom-components*/
import ListTitleText from "../../../ui/listTitleText/ListTitleText"
import CreateArticle from "../../blocks/createArticle/CreateArticle"
import Dialog from "../../../ui/dialog/Dialog"
import history from "../../../../history";
/*semantic-ui components*/
import { Button, Icon } from 'semantic-ui-react'
/*utils*/
import {fetchData, uploadFile} from "../../../../utils/fetchHelper";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
/*css*/
import "./articlePublishing.css"
import { TranslateInterface } from "../../../../utils/translate/Translate";
import {ConvertBase64File, getLang} from "../../../../utils/utils";

/**
 * Компонент страницы для публикации статьи
 */

class ArticlePublishing extends React.Component {
    constructor(props) {
        super(props);
        this.onSave = this.onSave.bind(this);
        this.state = {
            isCheckWindow: false,
            titleCheckWindow: ''
        }
    }

    componentDidMount() {
        let { saveSubjects, location, createArticle } = this.props;
        fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
        let id = location.pathname.split("/article_publishing/")[1];
        if(id) {
            this.editArticle(id)
        } else {
            createArticle();
        }
    }

    editArticle(id) {
        let { editArticle, settings } = this.props;
        fetchData(API.ARTICLE.GET_ARTICLE, {id: id, language: settings.language || 'RU'}, editArticle);
    }

    componentDidUpdate(prevState) {
        let { isCheckWindow } = this.state;
        let { switchMenuNavigation, clearArticle, getMyPublications } = this.props;
        if(!prevState.isCheckWindow && isCheckWindow) {
            setTimeout(() => {
                this.setState({
                    isCheckWindow: false,
                    titleCheckWindow: ''
                });
                history.push('/my_publications');
                switchMenuNavigation('my_publications');
                fetchData(API.ARTICLE.GET_MY_ARTICLES, {language: 'RU'}, getMyPublications);
                clearArticle();
            }, 2000)

        }
    }
    componentWillUnmount() {
        let { filePreviewSave } = this.props;
        filePreviewSave('', '');
    }

    renderCheckWindow(titleCheckWindow) {
        return (
            <div className="check_window_custom_content">
                <div className="container_icon_check">
                    <Icon className="icon_check" name="check"/>
                </div>
                <div className="check_window_text">{titleCheckWindow}</div>
            </div>
        )

    }

    onSave(article, type) {
        let { imagePreview, settings } = this.props;
        let language = settings.language || getLang() || 'en';
        let titleCheckWindow = '';
        if(type === "saveAs") {
            titleCheckWindow = 'Статья сохранена как черновик';
            article['status'] = 'DRAFT'
        } else if ( type === "isCheck") {
            titleCheckWindow = 'Статья отправлена на проверку';
            article['status'] = 'REVIEW';
        }
        article['language'] = article.language || language;
        if (imagePreview.file) {
            uploadFile(API.FILES.FILE_SAVE, imagePreview.file, (fileData) => {
                article.imageId = fileData.id;
                fetchData(API.ARTICLE.SAVE_ARTICLE, article, '');
            });
        } else {
            fetchData(API.ARTICLE.SAVE_ARTICLE, article, '');
        }
        this.setState({
            isCheckWindow: true,
            titleCheckWindow: titleCheckWindow
        })
    }

    setImage = (e, isDelete) => { //Загрузка аватара
        let { onChangeArticle, filePreviewSave } = this.props;
        let file = e.target.files && e.target.files[0];
        if (isDelete) {
            filePreviewSave('', '');
            onChangeArticle('', 'imageId')

        } else {
            if (file) {
                ConvertBase64File(file, (base64File) => {filePreviewSave(base64File, file)});
            }
        }
    };

    render() {
        let { settings, onChangeArticle, articlePublishing, onChangeFullScreenPreviewEditor, user, imagePreview, editArticle } = this.props;
        let { isCheckWindow, titleCheckWindow } = this.state;
        let Translate = TranslateInterface(settings.language || 'ru');
        let createArticle = articlePublishing.article;
        let params = articlePublishing.params;
        let contentCheckWindow = this.renderCheckWindow(titleCheckWindow);
        let previewArticle = {
            authorName: user.name,
            label: createArticle.label,
            text: createArticle.text,
            imageId: createArticle.imageId,
            date: new Date(),
            comments: {
                count: 0
            },
            views: 0,
        };

        return (
            <div id="article_publishing">
                <div className="create_article_container">
                    <CreateArticle
                        language={Translate.header.language}
                        imagePreview={imagePreview && imagePreview.preview}
                        localization={settings.language || 'ru'}
                        translate={Translate}
                        subjects={params.subjects}
                        onChange={onChangeArticle}
                        isEdit={params.edit}
                        onSave={this.onSave}
                        setImage={this.setImage}
                        htmlText={createArticle.text}
                        preview={params.preview}
                        isFullScreenEditor={params.isFullScreenEditor}
                        textError={Translate.setup.rightPanel.error.field}
                        createArticle={createArticle}
                        params={articlePublishing.params}
                        previewArticle={previewArticle}
                        editArticle={editArticle}
                        onChangeFullScreenPreviewEditor={onChangeFullScreenPreviewEditor}

                    />
                    {isCheckWindow ?
                        <div className="check_window">
                            <div>{contentCheckWindow}</div>
                        </div>
                           : ''
                    }
                </div>
                <div className="publishing_rules">
                    <ListTitleText
                        id='rules'
                        title={Translate.articlePublishing.publishing_rules.rules.title}
                        textList={Translate.articlePublishing.publishing_rules.rules.text}F
                    />
                    <ListTitleText
                        id='moderation'
                        title={Translate.articlePublishing.publishing_rules.aboutModeration.title}
                        textList={Translate.articlePublishing.publishing_rules.aboutModeration.text}
                    />
                </div>
            </div>
        );
    }
}

export default
connect(
    state => ({
        user: state.user,
        infoArticle: state.infoArticle,
        articlePublishing: state.articlePublishing,
        warningDialog: state.warningDialog,
        imagePreview: state.imagePreview,
        settings: state.settings
    }),
    dispatch => ({
        switchMenuTab: (tabMenu) => {
            dispatch({
                type: "SWITCH_SETUP_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        onChangeWarningDialog: (isOpen, title, text) => {
            dispatch({
                type: "WARNING_DIALOG",
                payload: {
                    isOpen: isOpen,
                    title: title,
                    text: text
                }
            })
        },
        onChangeArticle: (text, type) => {
            dispatch({
                type: "ON_CHANGE_ARTICLE",
                payload: {
                    text: text,
                    type: type
                }
            })
        },
        onChangeFullScreenPreviewEditor: (type, isOpen) => {
            dispatch({
                type: "IS_FULL_SCREEN_PREVIEW_EDITOR",
                payload: {
                    type: type,
                    isOpen: isOpen
                }
            })
        },
        switchMenuNavigation: (page) => {
            dispatch({
                type: "SWITCH_PAGE",
                payload: {
                    page: page,
                }
            })
        },
        saveSubjects: (subjects) => {
            dispatch({
                type: "SAVE_SUBJECTS",
                payload: {
                    subjects: subjects,
                }
            })
        },
        getMyPublications: (articles) => {
            dispatch({
                type: "GET_MY_PUBLICATIONS",
                payload: {
                    articles: articles
                }
            })
        },
        editArticle: (articleEdit) => {
            dispatch({
                type: "ARTICLE_EDIT",
                payload: {
                    articleEdit: articleEdit
                }
            })
        },
        filePreviewSave: (preview, file) => {
            dispatch({
                type: "IMAGE_PREVIEW",
                payload: {
                    preview: preview,
                    file: file
                }
            })
        },
        createArticle: () => {
            dispatch({
                type: "ARTICLE_CREATE", payload: {}
            })
        },
        clearArticle: () => {
            dispatch({
                type: "CLEAR_ARTICLE_CREATE", payload: {}
            })
        }
    })
)
(ArticlePublishing);


