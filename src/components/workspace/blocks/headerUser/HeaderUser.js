/**
 * Created by smalkov on 04.09.2018.
 */

// react - redux
import React from "react";
/*semantic-ui components*/
import { Button, Dropdown, Icon } from 'semantic-ui-react'
/*custom components*/
import User from "../../../ui/user/User";
import Registration from "../../../../components/scenes/registration/Registration";
import Auth from "../../../../components/scenes/auth/Auth";
/*utils*/
import history from "../../../../history";
/*css*/
import "./headerUser.css"
import { fetchData } from "../../../../utils/fetchHelper";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";


/**
 * Компонент отвечающий за информацию о пользователе, регистрацию, авторизацию.
 */

class HeaderUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        let articles = document.getElementsByClassName('user_science');
        if (articles && articles.length) {
            for(let a = 0; a < articles.length; a++) {
                articles[a].style.webkitBoxOrient = 'vertical';
            }
        }
    }

    render() {
        let { Translate, auth, isOpenSignWindow, isOpenRegWindow, user, onClick, changeMenu, switchMenuNavigation,
            clearArticle, createArticle, registration, myUserInfo, onRegAuth, handleTextFieldKeyDown, language,
            administrationDefaultTab } = this.props;

        return (
            <div id="header_user">
                {!Object.keys(user).length ?
                    <div className="header-sign">
                        <div className="header-sign-in">
                                <span
                                    className="link"
                                    onClick={() => {
                                        isOpenSignWindow(true)
                                    }}
                                >{Translate.header.authorization.signIn}</span>
                            {/*<span>{Translate.header.authorization.account}</span>*/}
                        </div>
                        <div className="vertical-divider"> или </div>
                        <div
                            className="header-sign-up link"
                            onClick={() => {
                                isOpenRegWindow('reg')
                            }}
                        >{Translate.header.authorization.signUp}</div>
                        <Registration
                            className="registration"
                            registration={registration}
                            dialog={Translate.header.authorization.dialog}
                            handleTextFieldKeyDown={handleTextFieldKeyDown}
                            isOpenSignWindow={isOpenSignWindow}
                            isOpenRegWindow={isOpenRegWindow}
                            onRegAuth={onRegAuth}
                            close={() => {
                                isOpenRegWindow('');
                            }}
                            onClickRegistration={onClick}
                        />
                        <Auth
                            className="auth"
                            auth={auth}
                            onRegAuth={onRegAuth}
                            dialog={Translate.header.authorization.dialog}
                            handleTextFieldKeyDown={handleTextFieldKeyDown}
                            isOpenSignWindow={isOpenSignWindow}
                            isOpenRegWindow={isOpenRegWindow}
                            language={language}
                            close={() => {
                                isOpenSignWindow(false);
                            }}
                            onClickAuth={onClick}
                        />
                    </div> :
                    <div className="header_user_info_auth">
                        <Button
                            className="published_article_btn btn btn_user articles_btn_style btn_standart_style"
                            onClick={() => {
                                switchMenuNavigation('article_publishing');
                                history.push('/article_publishing');
                                clearArticle();
                                createArticle();
                            }}
                        ><Icon name="add"/>{Translate.header.user.published}</Button>
                        <div className="header_user_info_user_menu"
                             onClick={() => {
                                 changeMenu('settings');
                                 fetchData(API.USER.GET_USER_INFO, {}, myUserInfo);
                                 }}>
                            <User
                                className="my_info_user"
                                name={user.name}
                                rank={user.rank}
                                avatar_id={user.avatarId}/>
                            <Dropdown text=''>
                                <Dropdown.Menu>
                                    <Dropdown.Item text={Translate.header.user.profileMenu.settings}
                                                   onClick={() => {
                                                       changeMenu('settings');
                                                       fetchData(API.USER.GET_USER_INFO, {}, myUserInfo);
                                                   }}/>
                                    <Dropdown.Item text={Translate.header.user.profileMenu.published}
                                                   onClick={() => {
                                                       history.push(`/my_publications`);
                                                       switchMenuNavigation('my_publications');
                                                   }}/>
                                    {user.role === 'ADMIN'
                                        ?   <Dropdown.Item text={Translate.header.user.profileMenu.administration}
                                                           onClick={() => {
                                                               history.push(`/administration/${administrationDefaultTab}`);
                                                               switchMenuNavigation('administration');
                                                           }}/> : ''}
                                    <Dropdown.Item text={Translate.header.user.profileMenu.signOut}
                                                   onClick={() => {
                                                       myUserInfo({});
                                                       isOpenSignWindow(false);
                                                       switchMenuNavigation('home');
                                                       history.push(`/`);
                                                       fetchData(API.USER.LOGOUT);
                                                   }}/>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>}
            </div>
        );
    }
}
export default (HeaderUser)