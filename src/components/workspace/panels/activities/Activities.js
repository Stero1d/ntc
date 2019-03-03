import history from "../../../../history";

/*
 * Created by smalkov on 03.10.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom components*/
import ListMenu from "../../blocks/listMenu/ListMenu"
import ListUsers from "../../blocks/listUsers/ListUsers"
import UserInfoCard from "../../blocks/userInfoCard/UserInfoCard"
import EventList from "../../../ui/eventList/EventList"
import InfoEvent from "../../blocks/infoEvent/InfoEvent"
/*semantic-ui components*/
import { Icon, Segment, Dimmer, Loader } from 'semantic-ui-react'
/*utils*/
import { TranslateInterface } from "../../../../utils/translate/Translate"
import { fetchData } from "../../../../utils/fetchHelper";
import { getCloneObject } from "../../../../utils/utils";

/*constatnts*/
import {API} from "../../../../redux/constant/UIConst";
/*css*/
import "./activities.css"

/**
 * Компонент страницы "Деятельность"
 */

class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.onClickEvent = this.onClickEvent.bind(this);
        this.state = {}
    }

    componentDidMount() {
        let { getListUsers, switchMenuTab, user, activities } = this.props;
        fetchData(API.USER.GET_ALL_USERS, {}, getListUsers);
        if (!Object.keys(user).length) {
            if(activities.tabLeftActivities === "members") {
                switchMenuTab('formsActivities')
            }
        }
    }

    componentWillReceiveProps(newProps) {
        let { user, getListUsers, switchMenuTab } = this.props;
        let newUser = newProps.user;
        if(Object.keys(user).length === 0 && Object.keys(newUser).length !== 0) {
            setTimeout(() => {
                fetchData(API.USER.GET_ALL_USERS, {}, getListUsers);
            }, 300);
            newProps.switchMenuTab('members')
        } else if (Object.keys(user).length !== 0 && Object.keys(newUser).length === 0) {
            newProps.switchMenuTab('formsActivities')
        }
    }

    onClickEvent(event) {//Проваливаемся в просмотр события
        let { getEventInfo } = this.props;
        getEventInfo(event);
    }

    renderContent(type) {
        let { activities, settings, saveUserInfoCard, userInfoCard, events, infoEvent } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let listUsers = activities.communityMembers && activities.communityMembers.users || [];
        let isOpenUserCard = userInfoCard && Object.keys(userInfoCard).length;
        let title = '';
        let content = '';
        switch(type) {
            case "members": {
                title = !isOpenUserCard
                            && <h2>{Translate.activities.communityMembers.title.toUpperCase()}</h2>
                                || <h2>
                                     <Icon
                                         className="userInfo_arrow_left"
                                         name="arrow left"
                                         onClick={() => {saveUserInfoCard({})}}
                                     />{Translate.activities.communityMembers.userInfoCard.title}
                                  </h2>;
                if (!Object.values(listUsers).length) {
                    content =
                        <Segment className="main_root_loading">
                            <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                        </Segment>
                } else {
                    content =
                        !isOpenUserCard &&
                        <ListUsers
                            list={Object.values(listUsers)}
                            Translate={Translate}
                            saveUserInfoCard={saveUserInfoCard}
                        /> || <UserInfoCard
                            translate={Translate}
                            userInfo={userInfoCard}
                            saveUserInfoCard={saveUserInfoCard}
                        />;
                }

                break;
            }
            case "formsActivities": {
                let text = Translate.activities.formsActivities.text;
                title = <h2>{Translate.activities.formsActivities.title.toUpperCase()}</h2>;
                content = (
                    text.map((item, index) => {
                        let list = item.list.map((element, key) => {
                            return (
                                <li>{element}</li>
                            )
                        });
                        return (
                            <div>
                                <div key={`textBlock_${index}`}>{item.textBlock}</div>
                                <ul>{list}</ul>
                            </div>
                        )
                    })
                );
                break;
            }
            case "contacts": {
                title = <h2>{Translate.activities.contacts.title.toUpperCase()}</h2>;
                content ='';
                break;
            }
            case "events": {
                title = <h2>{Translate.activities.events.title.toUpperCase()}</h2>;
                if (!Object.values(events.list).length) {
                    content =
                        <Segment className="main_root_loading">
                            <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                        </Segment>
                } else {
                    content =
                        events.list && events.list.length &&
                        <EventList
                            events={events.list}
                            countView = {events.list && events.list.length}
                            onClick={this.onClickEvent}
                        />
                        ||  <div className="table_not_found_data">{Translate.administration.notFoundData.events}</div>;
                }
                break;
            }
            case "codex": {
                title = <h2>{Translate.activities.codex.title.toUpperCase()}</h2>;
                content = <div>{Translate.activities.codex.text}</div>;
                break;
            }
            default: break;
        }

        return (
            <div className={`activities_${type}`}>
                <div className={`activities_title`}>{title}</div>
                <div className="horizontal_divider"></div>
                <div className={`activities_data`}>{content}</div>
            </div>
        )
    }

    render() {
        let { settings, switchMenuTab, activities, user, saveUserInfoCard, getPublishEvents, infoEvent, clearEventInfo } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let content = this.renderContent(activities.tabLeftActivities);
        let listTabs = getCloneObject(Translate.activities.tabs);
        if (!Object.keys(user).length) {
            delete listTabs.members;
        }

        return (
            <div id="activities_page">
                <div className="slider_menu_tab_mobile">
                    <div>
                        <ListMenu
                            list={listTabs}
                            onClick={(tabMenu) => {
                                switchMenuTab(tabMenu);
                                clearEventInfo();
                                if(tabMenu === 'members') {
                                    saveUserInfoCard({});
                                } else if (tabMenu === 'events') {
                                    fetchData(API.ADMINISTRATION.GET_PUBLISH_NEWS, {number : 0, size : 50, language: settings.language || 'RU'}, getPublishEvents);
                                }
                            }}
                            active={activities.tabLeftActivities}
                            disabledCount={true}
                        />
                    </div>
                </div>

                <div className="activities_content">
                    {infoEvent && Object.keys(infoEvent).length
                        && <InfoEvent
                            infoEvent={infoEvent}
                            translate={Translate}
                            clearEventInfo={() => clearEventInfo()}
                    />
                            || content}
                </div>
            </div>
        );
    }
}

export default
connect(
    state => ({
        activities: state.activities,
        events: state.events,
        settings: state.settings,
        userInfoCard: state.userInfoCard,
        infoEvent: state.infoEvent,
        user: state.user
    }),
    dispatch => ({
        switchMenuTab: (tabMenu) => {
            dispatch({
                type: "SWITCH_ACTIVITIES_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        },
        getListUsers: (listUsers) => {
            dispatch({
                type: "GET_LIST_USERS_ACTIVITIES",
                payload: {
                    listUsers: listUsers,
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
        },
        clearEventInfo: (event) => {
            dispatch({
                type: "CLEAR_INFO_EVENT"
            })
        }
    })
)
(Activities);