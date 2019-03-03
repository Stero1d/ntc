/**
 * Created by smalkov on 04.09.2018.
 */

// react - redux
import React from "react";
import {connect} from "react-redux";
/*utils*/
import { TranslateInterface } from "../../utils/translate/Translate";
import { getLang } from "../../utils/utils";
import history from "../../history";
/*semantic-ui components*/
import { Dropdown } from 'semantic-ui-react'
/*css*/
import "./footer.css"
import {API} from "../../redux/constant/UIConst";
import {fetchData} from "../../utils/fetchHelper";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.isCloseFeedBack = this.isCloseFeedBack.bind(this);
        this.switchLanguagePage = this.switchLanguagePage.bind(this);
        this.state = {}
    }

    isCloseFeedBack(isOpen) {
        this.props.onChangeFeedback(isOpen, 'isOpen');
    }

    switchLanguagePage(language) {
        let { switchLanguage, settings, saveSubjects, saveArticle, getMyPublications, getArticlesLibrary, getArticleInfo } = this.props;
        switchLanguage(language);
        switch (settings.page) {
            case 'home': {
                fetchData(API.ARTICLE.GET_ALL_ARTICLES, {language: language || 'RU'}, saveArticle);
                fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
                break;
            }
            case 'my_publications': {
                fetchData(API.ARTICLE.GET_MY_ARTICLES, {language: language || 'RU'}, getMyPublications);
                break;
            }
            case 'library': {
                let arrayPathName = window.location.pathname.split('library');
                if(arrayPathName[1]) {
                    fetchData(API.ARTICLE.GET_ARTICLE, {id: window.location.pathname.split('library/')[1], language: language || 'RU'}, getArticleInfo);
                } else {
                    fetchData(API.ARTICLE.GET_ALL_ARTICLES, {language: language || 'RU'}, getArticlesLibrary);
                }

                break;
            }
            default: break;
        }

    }

    renderFooterElements(footerElements) {
        let { switchMenuTabAbout, switchMenuTabActivities, switchMenuTabLibrary, switchMenuNavigation } = this.props;
        let content = [];
        let keys = Object.keys(footerElements);
        if (keys.length) {
            keys.map((item, key) => {
                let arrayElements = [
                    <div className="footer_title_column" key={`${footerElements[item].title}`}>{footerElements[item].title}</div>
                ];
                footerElements[item].array.map((element, index) => {
                    arrayElements.push(
                        <div className="footer_link" key={`${Object.values(element)[0]}`}>
                            <span
                                onClick={() => {
                                    let app = document.getElementsByClassName('App');
                                    if (app[0]) {
                                        app[0].scrollTop = 0;
                                    }
                                    history.push(`/${element.link}`);
                                    switchMenuNavigation(element.link);
                                    switch (element.link) {
                                        case 'about': {
                                            switchMenuTabAbout(element.tab);
                                            break;
                                        }
                                        case 'activities': {
                                            switchMenuTabActivities(element.tab);
                                            break;
                                        }
                                        case 'library': {
                                            switchMenuTabLibrary(element.tab);
                                            break;
                                        }
                                        default: break;
                                    }
                                }}
                            >
                                {Object.values(element)[0]}
                                </span>
                        </div>
                    );
                });
                content.push([<div className="footer_column">{arrayElements}</div>]);
            })
        }
        return content
    }

    render() {
        let { settings, switchLanguage } = this.props;
        let translate = TranslateInterface(settings.language || 'ru');
        let content = this.renderFooterElements(translate.footer);
        let language = settings.language || getLang() || 'en';

        return (
            <div id="main-footer">
                <section className="footer_links">{content}</section>
                <div className="horizontal_divider"></div>
                <section className="footer_language_feedback">
                    <div>
                        <div className="footer_language footer_column">
                            <Dropdown
                                selection
                                wrapSelection={false}
                                options={translate.header.language}
                                value={language.toLowerCase()}
                                onChange={(e, select) => {
                                    this.switchLanguagePage(select.value);
                                }}
                            />
                        </div>
                        <div className="footer_column"></div>
                        <div className="footer_column"></div>
                        <div className="footer_column">
                            <span className="footer_feedback link"
                                  onClick={() => {this.isCloseFeedBack(true);}}>{translate.header.feedBack.link}
                      </span>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default
connect(
    state => ({
        settings: state.settings
    }),
    dispatch => ({
        switchLanguage: (language) => {
            dispatch({
                type: "SWITCH_LANGUAGE",
                payload: {
                    language: language,
                }
            })
        },
        onChangeFeedback: (value, type) => {
            dispatch({
                type: "FEEDBACK",
                payload: {
                    value: value,
                    type: type
                }
            })
        },
        switchMenuTabAbout: (tabMenu) => {
            dispatch({
                type: "SWITCH_ABOUT_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        switchMenuTabActivities: (tabMenu) => {
            dispatch({
                type: "SWITCH_ACTIVITIES_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        switchMenuTabLibrary: (tabMenu) => {
            dispatch({
                type: "SWITCH_LIBRARY_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        saveArticle: (articles) => {
            dispatch({
                type: "MAIN_PAGE_GET_SAVE_ARTICLES",
                payload: {
                    articles: articles,
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
        getArticleInfo: (article) => {
            dispatch({
                type: "GET_ARTICLE_INFO",
                payload: {
                    article: article,
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
        getArticlesLibrary: (articles) => {
            dispatch({
                type: "GET_ARTICLES_LIBRARY",
                payload: {
                    articles: articles
                }
            })
        }
    })
)
(Footer);