/**
 * Created by smalkov on 04.09.2018.
 */

/*react - redux*/
import React from "react";
import { connect } from "react-redux";
/*semantic-ui components*/
import { Dropdown, Input, Button, Icon } from 'semantic-ui-react'
/*svgIcons*/
import { CloseIcon, Menu, Search, Add } from "../ui/svgIcons/svgIcons"
/*css*/
import "./header.css"
import 'semantic-ui-css/semantic.min.css';
/*utils*/
import { fetchData, regAuthUser } from "../../utils/fetchHelper";
import { getLang } from "../../utils/utils";
/*custom-components*/
import { TranslateInterface } from "../../utils/translate/Translate"
import MenuNavigation from "../ui/menuNavigation/MenuNavigation"
import Dialog from "../ui/dialog/Dialog"
import HeaderUser from "../workspace/blocks/headerUser/HeaderUser"

import history from "../../history";
/*constants*/
import { API } from "../../redux/constant/UIConst";
import { CONSTANTS } from "../../redux/constant/OtherConstants";

/**
 * Компонент отвечающий за шапку
 */

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.changeMenu = this.changeMenu.bind(this);
        this.userAuth = this.userAuth.bind(this);
        this.onRegAuth = this.onRegAuth.bind(this);
        this.isCloseFeedBack = this.isCloseFeedBack.bind(this);
        this.handleTextFieldKeyDown = this.handleTextFieldKeyDown.bind(this);
        this.switchLanguagePage = this.switchLanguagePage.bind(this);
        this.exitUser = this.exitUser.bind(this);
        this.state = {
            isMobileSearch: false,
            isMobileMenu: false,
            languagePage: false
        }
    }

    isCloseFeedBack(isOpen) {
        this.props.onChangeFeedback(isOpen, 'isOpen');
    }

    componentDidMount() {
        let { myUserInfo, switchMenuNavigation } = this.props;
        let pathname = window.location.pathname;
        if(pathname.includes('/library')){
            this.props.switchMenuNavigation('library');
        } else {
            this.props.switchMenuNavigation(pathname.replace(/\/+/g, '') || 'home');
        }
        fetchData(API.USER.GET_USER_INFO, {}, (data) => {
            if (Array.isArray(data) && !data.length) {
                history.push('/');
                switchMenuNavigation('home');
            } else {
                myUserInfo(data);
            }
        });
    }

    menuLanguageButtons(buttons) {//Собираем массив данных для меню в зависимости от языка
        let keys = Object.keys(buttons);
        let arrayButtons = [];
        for (let i = 0; i <  keys.length; i++) {
            let elementMenu = {};
            elementMenu = {
                label: buttons[keys[i]],
                name: keys[i]
            };

            arrayButtons.push(elementMenu)
        }

        return arrayButtons
    }

    componentDidUpdate() {
        let { isMobileMenu } = this.state;
        let { auth, registration, user } = this.props;
        let body = document.body;
        let width = '';
        if (body) {
            width = body.offsetWidth;
            let workspace = document.getElementById('workspace');
            let mobileMenu = document.getElementsByClassName('mobile_block_menu')[0];
            if(workspace) {
                if(width <= 960 && (isMobileMenu || registration.signUp)) {
                    workspace.style.display = 'none'
                } else {
                    workspace.style.display = 'block'
                }

                if (mobileMenu) {
                    if (registration.signUp || (auth.signIn && !Object.keys(user).length)) {
                        mobileMenu.style.display = 'none'
                    } else {
                        mobileMenu.style.display = 'flex'
                    }
                }
            }
        }
    }

    changeMenu(type) {
        let { switchMenuNavigation } = this.props;
        switch (type) {
            case 'settings': {
                history.push('/setup');
                switchMenuNavigation('setup');
                break
            }
            case 'published': {
                history.push('/my_articles');
                switchMenuNavigation('my_articles');
                break
            }
            case 'exit': {
                history.push('/');
                this.props.authRegistration('', false);
                switchMenuNavigation('home');
                break
            }
        }

        this.setState({
            isMobileSearch: false,
            isMobileMenu: false,
        })
    }

    exitUser() {
        let { switchMenuNavigation, myUserInfo, isOpenSignWindow } = this.props;
        myUserInfo({});
        isOpenSignWindow(false);
        switchMenuNavigation('home');
        history.push(`/`);
        fetchData(API.USER.LOGOUT);
        /*this.setState({
            isMobileSearch: false,
            isMobileMenu: false
        })*/
    }

    onRegAuth(objRegAuth, type) {//Регистрация и авторизация пользователя
        let { userRegSatus } = this.props;
        switch (type) {
            case 'reg': {
                regAuthUser(API.USER.REGISTRATION, objRegAuth, userRegSatus, true);
                break;
            }
            case 'auth': {
                regAuthUser(API.USER.LOGIN, objRegAuth, this.userAuth, false);
                break;
            }
            default: break;
        }
    }

    userAuth(response) {//Авторизация пользователя
        let { checkAuthFail, myUserInfo } = this.props;
        if(response && response.status !== 200) {
            const errorMessage = response && response.data && response.data.message || "Сервер недоступен";
            checkAuthFail(errorMessage);
        } else {
            checkAuthFail('');
            myUserInfo(response.data)
        }

    }

    handleTextFieldKeyDown(e, type, objRegAuth, isDisabled) { //Авторизация по enter
        if (e.keyCode) {
            switch (e.keyCode) {
                case 13: {
                    if(!isDisabled) {
                        this.onRegAuth(objRegAuth, type);
                    }

                    break;
                }
                default: break;
            }
        }
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

    renderListLanguage() {
        let arrayLanguage = Object.keys(CONSTANTS.LANGUAGE);

        if(arrayLanguage && arrayLanguage.length) {
            return arrayLanguage.map((key, index) => {
                return (
                    <div className={`menu_button_language_${index} button-menu`}
                         key={`menu_button_language_${index}`}
                         onClick={() => {
                             this.switchLanguagePage(key);
                             this.setState({languagePage: false})
                         }}
                    >{CONSTANTS.LANGUAGE[key]}</div>
                )
            })
        }
    }

    render() {
        let { settings, switchMenuNavigation, isOpenSignWindow, auth, registration, myUserInfo, administration, articlePublishing,
            user, feedBack, onChangeFeedback, clearArticle, createArticle, userRegSatus, isOpenRegWindow, clearPreviewImg } = this.props;
        let { isMobileMenu, languagePage } = this.state;
        let Translate = TranslateInterface(settings.language || getLang());
        let language = settings.language || getLang() || 'en';
        let feedbackDialog = Translate.header.feedBack.dialog;

        const actions = (
            <Button
                className="btn_back_portal btn_standart_style"
                onClick={() => {
                    this.isCloseFeedBack(false);
                }}>{feedbackDialog.btn.label}</Button>
        );

        const dialogContent = (
                <div>
                    <div className="ui input container_nameArticle">
                        <span className="label">{feedbackDialog.theme.label}</span>
                        <Input
                            type="text"
                            autoFocus={true}
                            placeholder={feedbackDialog.theme.placeholder}
                            onChange={(e) => {onChangeFeedback(e.currentTarget.value, 'label')}}
                            value={feedBack.label}
                        />
                    </div>
                    <div className="ui input">
                        <span className="label">{feedbackDialog.description.label}</span>
                        <textarea
                            type="text"
                            onChange={(e) => {onChangeFeedback(e.currentTarget.value, 'description')}}
                            value={feedBack.description}
                        />
                    </div>
                </div>
        );

        return (
            <div id="main-header" style={{zIndex: articlePublishing.params.isFullScreenEditor ? 7 : 11}}>
                <section className="header-language-feedback">
                    <div>
                        <div className="header-language">
                            <Dropdown
                                selection
                                wrapSelection={false}
                                options={Translate.header.language}
                                value={language.toLowerCase()}
                                onChange={(e, select) => {
                                    this.switchLanguagePage(select.value);

                                }}
                            />
                        </div>
                        <span className="header-feedback link" onClick={() => {this.isCloseFeedBack(true);}}>{Translate.header.feedBack.link}</span>
                    </div>
                </section>
                <section className="header-title-sign">
                    <div className={!isMobileMenu && "mobile_menu" || "mobile_menu mobile_active_menu"}>
                            <HeaderUser
                                Translate={Translate}
                                registration={registration}
                                userRegSatus={userRegSatus}
                                language={language}
                                myUserInfo={myUserInfo}
                                userAuth={this.userAuth}
                                onRegAuth={this.onRegAuth}
                                auth={auth}
                                user={user}
                                clearArticle={() => {
                                    clearArticle();
                                    clearPreviewImg();
                                }}
                                createArticle={createArticle}
                                isOpenSignWindow={isOpenSignWindow}
                                isOpenRegWindow={isOpenRegWindow}
                                handleTextFieldKeyDown={this.handleTextFieldKeyDown}
                                onClick={(signInUp, isCheckAuth ) => {
                                    this.props.authRegistration('', true);
                                }}
                                changeMenu={(type) => {
                                    this.changeMenu(type);
                                }}
                                switchMenuNavigation={(page) => {
                                    switchMenuNavigation(page);
                                }}
                            />
                        <div className="mobile_header_menu" >
                            {!isMobileMenu &&
                            <div className="mobile_menu_icon"
                                 onClick={() => {
                                     this.setState({
                                         isMobileMenu: true
                                     })
                                 }}
                            >
                                <Menu/>
                            </div>
                            }
                            {isMobileMenu &&
                            <div className="mobile_menu_icon close icon"
                                 onClick={() => {
                                     if(!languagePage) {
                                         this.setState({isMobileMenu: false})
                                     } else {
                                         this.setState({languagePage: false})
                                     }
                                 }}>
                                <CloseIcon/>
                            </div>
                            }
                        </div>
                        {isMobileMenu &&
                            <div className="mobile_block_menu">
                                {!languagePage &&
                                    <div className="menu-navigation">
                                        <MenuNavigation
                                            user={user}
                                            buttons={this.menuLanguageButtons(Translate.header.menuNavigation)}
                                            page={settings.page}
                                            exit={user && Object.keys(user).length ? () =>this.exitUser() : ''}
                                            exitName={Translate.header.mobileMenu.exit}
                                            onClick={(page) => {
                                                let app = document.body;
                                                if(app) {
                                                    app.scrollTop = 0;
                                                }
                                                history.push(page !== 'home' ? `/${page}` : '/');
                                                switchMenuNavigation(page);
                                                this.setState({isMobileMenu: false})
                                            }}
                                        />
                                    </div>
                                        ||
                                         <div className="mobile_list_language">
                                             {this.renderListLanguage()}
                                         </div>}
                                {!languagePage &&
                                    <div className="mobile_language_feedback">
                                        <div className="button-menu" onClick={() => {}}>
                                            <div className="language_title">{Translate.header.mobileMenu.language}</div>
                                            <div  className="language_value" onClick={() => {
                                                this.setState({languagePage: true})
                                            }}>
                                                {/*<Icon name="chevron left"/>*/}
                                                <span>{CONSTANTS.LANGUAGE[language.toLowerCase()]}</span>
                                                <Icon name="chevron right"/>
                                            </div>
                                        </div>
                                        <div className="button-menu" onClick={() => {this.isCloseFeedBack(true);}}>{Translate.header.mobileMenu.feedBack}</div>
                                    </div>}
                            </div>
                        }
                    </div>
                    <div className="header-title"
                         onClick={() => {
                             switchMenuNavigation('home');
                             history.push('/');
                         }}
                    >
                        <div className="logo" style={{background: 'url(' + '/images/logo.png' + ') center no-repeat'}}></div>
                        <div className="header-title-ru">{Translate.header.title}</div>
                        {/*<div className="vertical-divider"></div>
                        <div className="header-title-en">{TranslateInterface('en').header.title}</div>*/}
                    </div>
                    {user && Object.keys(user).length &&
                        <div
                            className="add_article_icon_mobile"
                            onClick={() => {
                                let { clearArticle, createArticle, switchMenuNavigation } = this.props;
                                switchMenuNavigation('article_publishing');
                                history.push('/article_publishing');
                                clearArticle();
                                createArticle();
                            }}
                        >
                            <Add/>
                        </div> || ''}
                    <div className="mobile_search_icon">
                        <Search/>
                    </div>
                    <HeaderUser
                        Translate={Translate}
                        registration={registration}
                        userRegSatus={userRegSatus}
                        myUserInfo={myUserInfo}
                        userAuth={this.userAuth}
                        onRegAuth={this.onRegAuth}
                        auth={auth}
                        user={user}
                        clearArticle={() => {
                            clearArticle();
                            clearPreviewImg();
                        }}
                        createArticle={createArticle}
                        isOpenSignWindow={isOpenSignWindow}
                        isOpenRegWindow={isOpenRegWindow}
                        handleTextFieldKeyDown={this.handleTextFieldKeyDown}
                        administrationDefaultTab={administration.tabLeftAdministration}
                        onClick={(signInUp, isCheckAuth ) => {
                            this.props.authRegistration('', true);
                        }}
                        changeMenu={(type) => {
                            this.changeMenu(type);
                        }}
                        switchMenuNavigation={(page) => {
                            switchMenuNavigation(page);
                        }}
                    />
                </section>
                <section className="menu-navigation-search_container" >
                    <div className="menu-navigation-search">
                        <div>
                            <div className="menu-navigation">
                                <MenuNavigation
                                    user={user}
                                    buttons={this.menuLanguageButtons(Translate.header.menuNavigation)}
                                    page={settings.page}
                                    onClick={(page) => {
                                        let app = document.getElementsByClassName('App')[0];
                                        if(app) {
                                            app.scrollTop = 0;
                                        }
                                        history.push(page !== 'home' ? `/${page}` : '/');
                                        switchMenuNavigation(page);
                                    }}
                                />
                            </div>
                            <div className="header-search">
                                <Input size='small' icon='search' placeholder={Translate.header.search}/>
                            </div>
                        </div>
                    </div>
                </section>
                <Dialog
                    className="feedBack_dialog"
                    isOpen={feedBack.isOpen}
                    title="Отправка запроса"
                    content={dialogContent}
                    isIconClose={true}
                    actions={actions}
                    close={() => {this.isCloseFeedBack(false)}}
                />
            </div>
        );
    }
}
export default
connect(
    state => ({
        settings: state.settings,
        administration: state.administration,
        articlePublishing: state.articlePublishing,
        registration: state.registration,
        auth: state.auth,
        user: state.user,
        feedBack:  state.feedBack
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
        switchMenuNavigation: (page) => {
            dispatch({
                type: "SWITCH_PAGE",
                payload: {
                    page: page,
                }
            })
        },
        isOpenSignWindow: (isOpen) => {
            dispatch({
                type: "WINDOW_SIGN_UP_IN",
                payload: {
                    isOpen: isOpen
                }
            })
        },
        isOpenRegWindow: (isOpen) => {
            dispatch({
                type: "WINDOW_REGISTRATION",
                payload: {
                    isOpen: isOpen
                }
            })
        },
        myUserInfo: (user) => {
            dispatch({
                type: "USER",
                payload: {
                    user: user
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
        createArticle: () => {
            dispatch({
                type: "ARTICLE_CREATE"
            })
        },
        clearArticle: () => {
            dispatch({
                type: "CLEAR_ARTICLE_CREATE"
            })
        },
        clearPreviewImg: () => {
            dispatch({
                type: "CLEAR_PREVIEW"
            })
        },
        userRegSatus: (data) => {
            dispatch({
                type: "REGISTRATION",
                payload: {
                    data: data
                }
            })
        },
        checkAuthFail:  (errorMessage) => {
            dispatch({
                type: "CHECK_AUTH_FAIL",
                payload: {
                    errorMessage: errorMessage
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
(Header);