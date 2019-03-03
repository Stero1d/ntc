/**
 * Created by smalkov on 04.09.2018.
 */

// react - redux
import React from "react";
import {connect} from "react-redux";
/*semantic-ui*/
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
/*custom components*/
import ListMenu from "../../blocks/listMenu/ListMenu"
import ViewArticles from "../../blocks/viewArticles/ViewArticles"
/*utils*/
import { TranslateInterface } from "../../../../utils/translate/Translate"
import {fetchData} from "../../../../utils/fetchHelper";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
/*css*/
import "./library.css"
import history from "../../../../history";

/**
 * Компонент страницы "Библиотека"
 */

class Library extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let { getArticlesLibrary, saveSubjects, settings } = this.props;
        fetchData(API.ARTICLE.GET_ALL_ARTICLES, {language: settings.language || 'RU'}, getArticlesLibrary);
        fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
    }

    render() {
        let { settings, switchMenuTab, library, subjects, user } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let tab = library.tabLeftLibrary ;
        let articles = library.articles[tab];

        return (
            <div id="library_Page">
                <div className="slider_menu_tab_mobile">
                    <div>
                        <ListMenu
                            list={Translate.library.tabs}
                            onClick={(tabMenu) => switchMenuTab(tabMenu)}
                            active={library.tabLeftLibrary}
                            arrayList={library.articles}
                        />
                    </div>
                </div>
                <div className="library_content">
                    {articles && !Object.keys(articles).length ?
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
                            title={Translate.library.tabs[tab]}
                            btnLabel={Translate.home.leftPanel.readNext}
                            articles={Object.values(articles)}
                            countViewArticles={Object.values(articles).length}
                            subjects={subjects.data}
                            user={user}
                            onClick={(id) =>{
                                history.push(`/library/${id}`);
                            }}
                        />}
                </div>
            </div>
        );
    }
}

export default
connect(
    state => ({
        library: state.library,
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
                type: "SWITCH_LIBRARY_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        getArticlesLibrary: (articles) => {
            dispatch({
                type: "GET_ARTICLES_LIBRARY",
                payload: {
                    articles: articles
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
(Library);