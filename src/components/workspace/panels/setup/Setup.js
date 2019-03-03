/**
 * Created by smalkov on 04.09.2018.
 */

/*react - redux*/
import React from "react";
import { connect } from "react-redux";
/*css*/
import "./setup.css"
/*custom-components*/
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
import PersonalData from "../../blocks/personalData/PersonalData"
import ListMenu from "../../blocks/listMenu/ListMenu"
/*utils*/
import { TranslateInterface } from "../../../../utils/translate/Translate"
import { fetchData, uploadFile } from "../../../../utils/fetchHelper";
import {DaysOfMonth, getLang} from "../../../../utils/utils"
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
import history from "../../../../history";

/**
 * Компонент страницы "Настройка профиля"
 */

class Setup extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSavePersonalData = this.onSavePersonalData.bind(this);
        this.state = {
            isCheckWindow: false
        }
    }

    componentDidMount () {
        let { myUserInfo } = this.props;
        fetchData(API.USER.GET_USER_INFO, {}, myUserInfo)
    }

    componentDidUpdate(prevState) {
        let { isCheckWindow } = this.state;
        if(!prevState.isCheckWindow && isCheckWindow) {
            setTimeout(() => {
                this.setState({
                    isCheckWindow: false
                });
            }, 2000)

        }
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

    onSavePersonalData() {
        let {setup, myUserInfo, imagePreview} = this.props;
        let personalData = setup.personalData;
        let data = {
            id: personalData.id,
            name: personalData.name,
            avatarId: personalData.avatarId,
            birthday: personalData.birthday && new Date(personalData.birthday).getTime(),
            rank: personalData.rank,
            city: personalData.city,
            about: personalData.about,
            achievements: personalData.achievements,
            status: personalData.status,
            role: personalData.role

        };
        if (imagePreview.file) {
            uploadFile(API.FILES.FILE_SAVE, imagePreview.file, (fileData) => {
                data.avatarId = fileData.id;
                fetchData(API.USER.SAVE_USER, data,
                    (data) => {
                        myUserInfo(data);
                        this.setState({isCheckWindow: true})
                    });

            });
        } else {
            fetchData(API.USER.SAVE_USER, data,
                (data) => {
                    myUserInfo(data);
                    this.setState({isCheckWindow: true})
            });
        }
    }

    componentWillUnmount() {//Сброс данных пользователя
        let { clearMyUserInfo, filePreviewSave } = this.props;
        clearMyUserInfo();
        filePreviewSave('');
    }

    handleChange(value, type, block) {
        let { handleChangeData } = this.props;
       handleChangeData(value, type, block);
    }

    render() {
        let { settings, filePreviewSave, setup, switchMenuTab, loadFile, imagePreview } = this.props;
        let { isCheckWindow } = this.state;
        let contentCheckWindow = this.renderCheckWindow('Данные успешно сохранены');
        let Translate = TranslateInterface(settings.language || 'ru');

        return (
            <div id="main-setup">
                <ListMenu
                    list={Translate.setup.leftMenu}
                    onClick={(tabMenu) => switchMenuTab(tabMenu)}
                    active={setup.params.tabLeftMenu}
                    disabledCount={true}
                />
                {setup.params.tabLeftMenu === 'personalData'
                    ? <PersonalData
                        Translate={Translate}
                        setup={setup}
                        handleChange={this.handleChange}
                        onSave={this.onSavePersonalData}
                        filePreviewSave={filePreviewSave}
                        imagePreview={imagePreview.preview}
                        loadFile={loadFile}
                    />
                        : ''}

                {isCheckWindow ?
                    <div className="check_window">
                        <div>{contentCheckWindow}</div>
                    </div>
                    : ''
                }
            </div>
        );
    }
}
export default
connect(
    state => ({
        imagePreview: state.imagePreview,
        settings: state.settings,
        setup: state.setup,
        user: state.user
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
        handleChangeData: (value, type, block) => {
            dispatch({
                type: "HANDLE_CHANGE_SETUP_DATA",
                payload: {
                    value: value,
                    type: type,
                    block: block,
                }
            })
        },
        successSaveData: (block) => {
            dispatch({
                type: "SUCCESS_SAVE_DATA",
                payload: {
                    block: block
                }
            })
        },
        loadFile: (id, file) => {
            dispatch({
                type: 'FILE_NEED_LOAD',
                payload: {
                    file: file,
                    url: '/api/file?file_access_type=PUBLIC',
                    fileId: id
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
        filePreviewSave: (preview, file) => {
            dispatch({
                type: "IMAGE_PREVIEW",
                payload: {
                    preview: preview,
                    file: file
                }
            })
        },
        clearMyUserInfo: () => {
            dispatch({type: 'CLEAR_SETUP_USER'})
        }
    })
)
(Setup);