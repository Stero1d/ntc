/**
 * Created by smalkov on 04.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom components*/
import Events from "../../blocks/events/Events"
import Subscription from "../../../ui/subscription/Subscription"
import ViewArticles from "../../blocks/viewArticles/ViewArticles"
/*semantic-ui components*/
import { Input, Button, Segment, Dimmer, Loader } from 'semantic-ui-react'
/*css*/
import "./mainRoot.css"
/*utils*/
import { fetchData } from "../../../../utils/fetchHelper";
import {TranslateInterface} from "../../../../utils/translate/Translate";
import history from "../../../../history";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";

/**
 * Компонент страницы "Главная"
 */

class MainRoot extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onClickEvent = this.onClickEvent.bind(this);
        this.state = {
            isFramed: false,
            value: ''
        }
    }

    componentDidMount() {
        let { saveArticle, saveSubjects, getPublishEvents, settings } = this.props;
        let scrollContainer = document.getElementsByClassName('App')[0];
        if(scrollContainer) {
            scrollContainer.scrollTop = 0;
        }
        fetchData(API.ARTICLE.GET_ALL_ARTICLES, {language: settings.language || 'RU'}, saveArticle);
        fetchData(API.ADMINISTRATION.GET_PUBLISH_NEWS, {number : 0, size : 50, language: settings.language || 'RU'}, getPublishEvents);
        fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
    }

    onClick(id, islink) {
        let { getArticleInfo, settings } = this.props;
        if(islink){

            history.push(`/library`);
        } else {
            history.push(`/library/${id}`);
        }
        this.props.switchMenuNavigation('library');
        fetchData(API.ARTICLE.GET_ARTICLE, {id: id, language: settings.language || 'RU'}, getArticleInfo);
    }

    onClickEvent(event) {
        history.push(`/activities`);
        let { getEventInfo, switchMenuTabActivities } = this.props;
        switchMenuTabActivities('events');
        getEventInfo(event);
    }

    render() {
        let { settings, events, articles, subjects, user, switchMenuNavigation, switchMenuTabActivities } = this.props;
        let { isFramed, value } = this.state;
        let Translate = TranslateInterface(settings.language || 'ru');

        return (
            <div id="main-root-page">
                <div className="main-root-page_left_panel">
                    {articles && !Array.isArray(articles.newArticles) && !Array.isArray(articles.popularArticles) ?
                    <Segment className="main_root_loading">
                        <Dimmer active inverted>
                            <Loader inverted/>
                        </Dimmer>
                    </Segment>
                    :
                    <div>
                        <ViewArticles
                            className="newArticles"
                            title={Translate.home.leftPanel.newArticles.title}
                            textNoData={Translate.other.textNoData}
                            //link={Translate.home.leftPanel.newArticles.link}
                            btnLabel={Translate.home.leftPanel.readNext}
                            articles={articles.newArticles}
                            isDisabledRead={!Object.keys(user).length}
                            countViewArticles={4}
                            subjects={subjects.data}
                            user={user}
                            onClick={this.onClick}
                        />
                        <ViewArticles
                            className="popularArticles"
                            textNoData={Translate.other.textNoData}
                            title={Translate.home.leftPanel.popularArticles.title}
                            //link={Translate.home.leftPanel.popularArticles.link}
                            btnLabel={Translate.home.leftPanel.readNext}
                            articles={articles.popularArticles}
                            isDisabledRead={!Object.keys(user).length}
                            countViewArticles={4}
                            user={user}
                            subjects={subjects.data}
                            onClick={this.onClick}
                        />
                    </div>}
                </div>
                <div className="main-root-page_right_panel">
                    <Events
                        viewAllNews={() => {
                            switchMenuNavigation('activities');
                            switchMenuTabActivities('events');
                            history.push('activities');

                        }}
                        events={events.list}
                        Translate={Translate}
                        onClick={this.onClickEvent}
                    />
                    <Subscription
                        className="block_subscription"
                        isFramed={isFramed}
                        value={value}
                        framedClick={(isFramed) => {
                            this.setState({isFramed: isFramed})
                        }}
                        onChange={(value) => {
                            this.setState({value: value})
                        }}
                        title={Translate.home.subscription.title}
                        placeholder={Translate.home.subscription.placeholder}
                        btnLabel={Translate.home.subscription.btnLabel}
                    />
                </div>
            </div>
        );
    }
}
export default
connect(
    state => ({
        settings: state.settings,
        events: state.events,
        articles: state.articles,
        setup: state.setup,
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
        switchMenuTabActivities: (tabMenu) => {
            dispatch({
                type: "SWITCH_ACTIVITIES_MENU_TAB",
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
        getPublishEvents: (events) => {
            dispatch({
                type: "GET_PUBLISH_EVENTS",
                payload: {
                    events: events,
                }
            })
        },
        getEventInfo: (event) => {
            dispatch({
                type: "GET_EVENT_INFO",
                payload: {event: event}
            })
        }
    })
)
(MainRoot);