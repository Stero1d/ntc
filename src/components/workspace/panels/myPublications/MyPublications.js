/**
 * Created by smalkov on 14.09.2018.
 */

// react - redux
import React from "react";
import {connect} from "react-redux";
/*semantic-ui*/
import { Input, Button, Segment, Dimmer, Loader } from 'semantic-ui-react'
/*custom components*/
import ListMenu from "../../blocks/listMenu/ListMenu"
import ViewArticles from "../../blocks/viewArticles/ViewArticles"
/*utils*/
import { TranslateInterface } from "../../../../utils/translate/Translate"
import {fetchData} from "../../../../utils/fetchHelper";
/*css*/
import "./myPublications.css"
import history from "../../../../history";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";

/**
 * Компонент страницы "Мои публикации"
 */

class MyPublications extends React.Component {
    constructor(props) {
        super(props);
        this.menuArticle = this.menuArticle.bind(this);
        this.state = {}
    }

    componentDidMount() {
        let { getMyPublications, saveSubjects, settings } = this.props;
        fetchData(API.ARTICLE.GET_MY_ARTICLES, {language: settings.language || 'RU'}, getMyPublications);
        fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
    }

    menuArticle(id, type) {
        let { editArticle, settings } = this.props;
        if (type === 'edit') {
            fetchData(API.ARTICLE.GET_ARTICLE, {id: id, language: settings.language || 'RU'}, editArticle);
            setTimeout(() => {
                history.push(`/article_publishing/${id}`);
            }, 250)
        }
    }

    render() {
        let { settings, switchMenuTab, myPublications, subjects, user } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let tab = myPublications.tabLeftLibrary ;
        let articles = myPublications.articles[tab] || [];

        return (
            <div id="my_publications">
                <div className="slider_menu_tab_mobile">
                    <div>
                        <ListMenu
                            list={Translate.my_publications.tabs}
                            onClick={(tabMenu) => switchMenuTab(tabMenu)}
                            active={myPublications.tabLeftLibrary}
                            arrayList={myPublications.articles}
                        />
                    </div>
                </div>
                <div className="library_content">
                    {articles && !Array.isArray(articles) ?
                        <Segment className="main_root_loading">
                            <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                        </Segment>
                        :
                        <ViewArticles
                            className={`${tab}`}
                            status={true}
                            statusLabel={Translate.my_publications.status}
                            textNoData={Translate.other.textNoData}
                            title={Translate.my_publications.tabs[tab]}
                            menuTranslate={Translate.my_publications.menu}
                            btnLabel={Translate.home.leftPanel.readNext}
                            articles={articles}
                            textError={Translate.setup.rightPanel.error.field }
                            countViewArticles={articles.length}
                            menuArticle={this.menuArticle}
                            subjects={subjects.data}
                            user={user}
                            onClick={(id) => {
                                history.push(`/library/${id}`);
                            }}
                        />
                    }
                </div>
            </div>
        );
    }
}

export default
connect(
    state => ({
        myPublications: state.myPublications,
        settings: state.settings,
        user: state.user,
        subjects: state.subjects
    }),
    dispatch => ({
        switchMenuNavigation: (page) => {
            dispatch({
                type: "SWITCH_PAGE",
                payload: {
                    page: page,
                }
            })
        },
        switchMenuTab: (tabMenu) => {
            dispatch({
                type: "SWITCH_MY_PUBLICATIONS_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
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
        saveSubjects: (subjects) => {
            dispatch({
                type: "SAVE_SUBJECTS",
                payload: {
                    subjects: subjects,
                }
            })
        }
    })
)
(MyPublications);