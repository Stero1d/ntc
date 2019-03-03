/**
 * Created by smalkov on 04.09.2018.
 */

/* react - redux */
import React from "react";
import {connect} from "react-redux";
/*custom components*/
import ListMenu from "../../blocks/listMenu/ListMenu"
import PreviewArticle from "../../blocks/previewArticle/PreviewArticle"
import CreateEvent from "../../blocks/createEvent/CreateEvent"
import Pagination from "../../../ui/pagination/PaginationComponent"
import UserInfoCard from "../../blocks/userInfoCard/UserInfoCard"
import Table from "../../../ui/table/Table"
/*semantic-ui components*/
import { Button, Dropdown, Icon, Segment, Dimmer, Loader } from 'semantic-ui-react'
/*css*/
import "./administration.css"
/*utils*/
import { fetchData } from "../../../../utils/fetchHelper";
import { TranslateInterface } from "../../../../utils/translate/Translate";
import { FormateDate } from "../../../../utils/utils";

/*constants*/
import { API } from "../../../../redux/constant/UIConst";
import history from "../../../../history";

/**
 * Компонент страницы "Администрирование"
 */

const trigger = ( <Icon className="edit_outline" name="ellipsis horizontal"/>);

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.getData = this.getData.bind(this);
        this.changeUserSave = this.changeUserSave.bind(this);
        this.onClickElement = this.onClickElement.bind(this);
        this.optionsMenu = this.optionsMenu.bind(this);
        this.closeInfoEvent = this.closeInfoEvent.bind(this);
        this.onSaveEvent = this.onSaveEvent.bind(this);
        this.newEventSaveStore = this.newEventSaveStore.bind(this);
        this. functionList = this.functionList.bind(this);
        this.state = {
           pageInfo: '',
           isNewEvent: false,
           activeNumber: 1
        }
    }

    componentDidMount() {
        let { administration } = this.props;
        history.push(`/administration/${administration.tabLeftAdministration}`);
        this.getData(administration.tabLeftAdministration);
    }

    getData(tabMenu, activeNumber) { //Получение пользователей и статей для админки
        let { getUsers, getArticles, saveSubjects, getNews, settings } = this.props;
        fetchData(API.SUBJECTS.GET_ALL_SUBJECTS, {}, saveSubjects);
        if (tabMenu === 'users') {
            fetchData(API.ADMINISTRATION.GET_USERS, {}, getUsers);
        } else if (tabMenu === 'articles') {
            // fetchData(API.ADMINISTRATION.GET_ARTICLES, {}, getArticles);
            fetchData(API.ARTICLE.GET_ALL_ARTICLES_VERSIONS, ['PUBLISHED', 'REVIEW'], getArticles);
        } else if (tabMenu === 'events') {
            fetchData(API.ADMINISTRATION.GET_ALL_NEWS, {number : (activeNumber - 1) || 0, size : 50, language: settings.language || 'RU'}, getNews);
        }
    }

    changeUserSave(id, status) {
        let { getUsers, administration } = this.props;
        let users = administration.users &&  administration.users.list;
        fetchData(API.ADMINISTRATION.SET_STATUS_USER, {id: id, status: status},
            (user) => {
            for (let i = 0; i < users.length; i++) {
                if (users[i].id === user.id) {
                    users[i] = user;
                }
            }
            getUsers(users);

        });

    }

    changeArticleSave(id, versionId, status, article) {
        let { getArticles, administration } = this.props;
        let articles = administration.articles &&  administration.articles.list;
        let newArticles = [];
        if(status) {
            fetchData(API.ADMINISTRATION.DECLINE_ARTICLE, {id: id, versionId: versionId}, () => {});
            for (let i = 0; i < articles.length; i++) {
                if (articles[i].versionId !== article.versionId) {
                    newArticles.push(articles[i]);
                }
            }
            getArticles(newArticles);
        } else {
            fetchData(API.ADMINISTRATION.CONFIRM_ARTICLE, {id: id, versionId: versionId},
                (article) => {
                    for (let i = 0; i < articles.length; i++) {
                        if (articles[i].versionId === article.versionId) {
                            articles[i] = article;
                        }
                    }
                    getArticles(articles);

                });
        }
    }

    optionsMenu(type, status) {
        let { settings } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let options = [];

        if(type === 'user') {
            switch (status) {
                case 'LOCKED': {
                    options = [
                        { key: 0, text: 'Default', value: 'default' },
                        { key: 1, text: Translate.administration.menu.unlocked, value: 'ACTIVE' },
                        { key: 2, text: Translate.administration.menu.deleted, value: 'DELETED' }
                    ];
                    break;
                }
                case 'ACTIVE': {
                    options = [
                        { key: 0, text: 'Default', value: 'default' },
                        { key: 1, text: Translate.administration.menu.locked, value: 'LOCKED' },
                        { key: 2, text: Translate.administration.menu.deleted, value: 'DELETED' }
                    ];
                    break;
                }
                default: break;
            }

        } else if (type === 'article') {
            switch (status) {
                case 'REVIEW': {
                    options = [
                        { key: 0, text: 'Default', value: 'default' },
                        { key: 1, text: Translate.administration.buttons.confirm, value: 'PUBLISHED' },
                        { key: 1, text: Translate.administration.buttons.reject, value: 'DECLINED' },
                        { key: 2, text: Translate.administration.menu.deleted, value: 'DELETED' }
                    ];
                    break;
                }
                case 'PUBLISHED': {
                    options = [
                        { key: 0, text: 'Default', value: 'default' },
                        { key: 1,  text: Translate.administration.buttons.reject, value: 'DECLINED' },
                        { key: 2, text: Translate.administration.menu.deleted, value: 'DELETED' }
                    ];
                    break;
                }
                default: break;
            }
        }

        return options
    }

    onClickElement(path, typeInfo, status, id, isNewEvent, element) {
        let { settings, getArticleInfo, getEventInfo, saveUserInfoCard } = this.props;
        if(typeInfo === 'users') {
            history.push(`/administration/${path}`);
            this.setState({
                pageInfo: 'user'
            });
            saveUserInfoCard(element);

        } else if(typeInfo === 'articles') {
            history.push(`/administration/${path}`);
            fetchData(API.ARTICLE.GET_ARTICLE, {id: id, language: settings.language || 'RU', status: status}, getArticleInfo);
            this.setState({
                pageInfo: 'article'
            })

        } else if ('events') {
            this.setState({
                pageInfo: 'event',
                isNewEvent: isNewEvent
            });
            getEventInfo(element)
        }
    }

    closeInfoEvent() {
        this.setState({
            pageInfo: '',
            isNewEvent: false
        });
        this.props.clearInfoEvent();
    }

    onSaveEvent() {
        let { infoEvent, settings } = this.props;
        let sendEvent = {
            id: infoEvent.id || '',
            caption: infoEvent.caption,
            text: infoEvent.caption,
            publishDate: infoEvent.publishDate,
            language: settings.language || 'ru'
        };
        fetchData(API.ADMINISTRATION.SAVE_NEWS, sendEvent, this.newEventSaveStore);
    }

    newEventSaveStore(newEvent) {
        let { administration, addNewEvent } = this.props;
        let { isNewEvent } = this.state;
        addNewEvent(administration.events.list, newEvent, isNewEvent);
        this.closeInfoEvent();
    }

    functionList(type, obj) {
        switch(type) {
            case 'user': {
                this.changeUserSave(obj.id, obj.status);
                break;
            }
            case 'article': {
                this.changeArticleSave(obj.id, obj.versionId, obj.status, obj.article);
                break;
            }
            default: {
                this.onClickElement(obj.path, obj.typeInfo, obj.status, obj.id, obj.isNewEvent, obj.element);
                break;
            }
        }
    }

    render() {
        let { settings, administration, switchMenuTab, subjects, clearInfoArticle, infoArticle, infoEvent,
            onChangeEvents, userInfoCard, saveUserInfoCard } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let data = administration[administration.tabLeftAdministration];
        let countPagination = Math.ceil(data.total / data.size);
        let { pageInfo, isNewEvent, activeNumber } = this.state;

        let contentAdministration = '';
        if(!pageInfo){
            contentAdministration = (
                <div>
                    <Table
                        className={administration.tabLeftAdministration}
                        colums={Translate.administration.table[administration.tabLeftAdministration]}
                        translate={Translate}
                        optionsMenu={(type, status) => this.optionsMenu(type, status)}
                        typeTable={administration.tabLeftAdministration}
                        constants={{subjects: subjects && subjects.data && Object.values(subjects.data)}}
                        functionList={this.functionList}
                        data={data.list || []}
                    />
                    {data.total && data.size && data.total > data.size &&
                        <Pagination
                            defaultActivePage={1}
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            totalPages={countPagination}
                            onChange={(activeNumber) => {
                                this.setState({
                                    activeNumber: activeNumber
                                });
                                let { administration } = this.props;
                                this.getData(administration.tabLeftAdministration, activeNumber);
                            }}
                        /> || ''}
                </div>
            )
        } else if(pageInfo === 'user') {
            contentAdministration = (
                <div className="administration_user_info">
                    <h2>
                        <Icon
                            className="userInfo_arrow_left"
                            name="arrow left"
                            onClick={() => {
                                history.push(`/administration/users`);
                                switchMenuTab('users');
                                this.setState({pageInfo: false});
                                saveUserInfoCard({})
                            }}
                        />{Translate.activities.communityMembers.userInfoCard.title}
                    </h2>
                    <div className="horizontal_divider"></div>
                    <UserInfoCard
                        translate={Translate}
                        userInfo={userInfoCard}
                        saveUserInfoCard={saveUserInfoCard}
                    />
                </div>
                )
        } else if(pageInfo === 'article') {
            contentAdministration =
                infoArticle && !Object.keys(infoArticle).length ?
                    <Segment className="main_root_loading">
                        <Dimmer active inverted>
                            <Loader inverted/>
                        </Dimmer>
                    </Segment>
                        :   <div>
                                <PreviewArticle
                                    infoArticle={infoArticle}
                                    clearInfoArticle={clearInfoArticle}
                                    articleMenu={{onClick: () => {}, optionsMenu: this.optionsMenu}}
                                />
                                <div className="administration_article_info_buttons">
                                    <Button
                                        className="btn_accept btn_standart_style"
                                        onClick={() => {}}
                                    >{Translate.administration.buttons.confirm}</Button>
                                    <Button
                                        onClick={() => {}}
                                    >{Translate.administration.buttons.reject}</Button>
                                </div>
                          </div>
        } else if(pageInfo === 'event') {
            contentAdministration =
                infoEvent && !Object.keys(infoEvent).length && !isNewEvent ?
                    <Segment className="main_root_loading">
                        <Dimmer active inverted>
                            <Loader inverted/>
                        </Dimmer>
                    </Segment>
                    : <CreateEvent
                        infoEvent={infoEvent}
                        translate={Translate}
                        isNewEvent={isNewEvent}
                        onChangeEvents={onChangeEvents}
                        onSaveEvent={this.onSaveEvent}
                        close={this.closeInfoEvent}
                    />
        }
        return (
            <div id="administration_page">
                <ListMenu
                    list={Translate.administration.tabs}
                    onClick={(tabMenu) => {
                        this.getData(tabMenu);
                        history.push(`/administration/${tabMenu}`);
                        switchMenuTab(tabMenu);
                        this.setState({pageInfo: false});
                        this.props.clearInfoEvent();
                    }}
                    active={administration.tabLeftAdministration}
                    disabledCount={true}
                />
                <div className="administration_content">
                    {data.list && !Array.isArray(data.list) && !Array.isArray(data.list) ?
                        <Segment className="main_root_loading">
                            <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                        </Segment>
                            :   contentAdministration}
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
        infoEvent: state.infoEvent,
        userInfoCard: state.userInfoCard,
        administration: state.administration,
        settings: state.settings,
        subjects: state.subjects
    }),
    dispatch => ({
        switchMenuTab: (tabMenu) => {
            dispatch({
                type: "SWITCH_ADMINISTRATION_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        getUsers: (users) => {
            dispatch({
                type: "ADMINISTRATION_GET_USERS",
                payload: {
                    users: users
                }
            })
        },
        getArticles: (articles) => {
            dispatch({
                type: "ADMINISTRATION_GET_ARTICLES",
                payload: {
                    articles: articles
                }
            })
        },
        getNews: (events) => {
            dispatch({
                type: "ADMINISTRATION_GET_NEWS",
                payload: {
                    events: events
                }
            })
        },
        changeUserSave: (user, users) => {
            dispatch({
                type: "CHANGE_USER_SAVE_STATUS",
                payload: {
                    users: users,
                    user: user
                }
            })
        },
        changeArticleStatusSave: (article, articles) => {
            dispatch({
                type: "CHANGE_ARTICLE_STATUS_SAVE",
                payload: {
                    article: article,
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
        },
        getArticleInfo: (article) => {
            dispatch({
                type: "GET_ARTICLE_INFO",
                payload: {
                    article: article,
                }
            })
        },
        clearInfoArticle: () => {
            dispatch({
                type: "CLEAR_INFO_ARTICLE",
                payload: {}
            })
        },
        clearInfoEvent: () => {
            dispatch({
                type: "CLEAR_INFO_EVENT",
                payload: {}
            })
        },
        addNewEvent: (events, newEvent, isNewEvent) => {
            dispatch({
                type: "SAVE_EVENT",
                payload: {
                    newEvent: newEvent,
                    events: events,
                    isNewEvent: isNewEvent
                }
            })
        },
        getEventInfo: (event) => {
            dispatch({
                type: "GET_EVENT_INFO",
                payload: {event: event}
            })
        },
        onChangeEvents: (value, field) => {
            dispatch({
                type: "ONCHANGE_EVENT",
                payload: {
                    field: field,
                    value: value
                }
            })
        },
        saveUserInfoCard: (userInfo) => {
            dispatch({
                type: "SAVE_USER_INFO_CARD",
                payload: {
                    userInfo: userInfo,
                }
            })
        }
    })
)
(Administration);