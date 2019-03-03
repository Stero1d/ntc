/**
 * Created by smalkov on 06.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Input} from 'semantic-ui-react'
/*utils*/
import {DaysOfMonth, FormateDate} from "../../../../utils/utils"
/*utils*/
import { ConvertBase64File } from "../../../../utils/utils";
import {fetchData, fetchDataGet} from "../../../../utils/fetchHelper";
/*svgIcons*/
import { UserPhoto } from "../../../ui/svgIcons/svgIcons"
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
/*css*/
import "./userInfoCard.css"

/**
 * Компонент просмотра персональных данных пользователя(просмотр, редактирование, сохранение)
 */

class UserInfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getAvatar(userAvatar) {
        let { translate } = this.props;
        //let avatar =  <Icon name='user circle outline'/>;
        let avatar =
            <div className="not_photo_avatar">
                <UserPhoto/>
                <div>{translate.setup.rightPanel.avatar.notPhoto}</div>
            </div>;
            if (userAvatar) {
                avatar = <div id="img-preview" style={{background: `url(${document.location.origin}/api/file/get?id=${userAvatar}) center no-repeat`}}/>
            }
        return avatar
    }

    componentWillUnmount() {
        let { saveUserInfoCard } = this.props;
        saveUserInfoCard({});
    }

    render() {
        let { translate, userInfo } = this.props;
        let date = userInfo.birthday && FormateDate(new Date(userInfo.birthday), true) || "-";

        return (
            <div id="user_info_card">
                <div className="data_content">
                    <div className="personal_data_left_panel">
                        <div className="ui input container mobile_avatar">
                            {/*<span>{Translate.setup.rightPanel.avatar.photo}</span>*/}
                            <div className="avatar_container" id="user_avatar_container">
                                {this.getAvatar(userInfo.avatarId)}
                            </div>
                        </div>
                        <div className="ui input container container_fullName">
                            <span>{translate.setup.rightPanel.name.label}</span>
                            <div>{userInfo.name || "-"}</div>
                        </div>
                        <div className="ui input container container_scienceDegree ">
                            <span>{translate.setup.rightPanel.rank.label}</span>
                            <div>{userInfo.rank || "-"}</div>
                        </div>
                        <div className="ui input container container_date">
                            <span>{translate.setup.rightPanel.birthday.label}</span>
                            <div>{date}</div>
                        </div>
                        <div className="ui input container container_city">
                            <span>{translate.setup.rightPanel.city.label}</span>
                            <div>{userInfo.city || "-"}</div>
                        </div>
                    </div>
                    <div className="personal_data_right_panel">
                        <div className="ui input container">
                            {/*<span>{Translate.setup.rightPanel.avatar.photo}</span>*/}
                            <div className="avatar_container" id="user_avatar_container">
                                {this.getAvatar(userInfo.avatarId)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui input container container_scientificAchievements">
                    <span>{translate.setup.rightPanel.achievements.label}</span>
                    <div>{userInfo.achievements || "-"}</div>
                </div>
                <div className="ui input container container_about">
                    <span>{translate.setup.rightPanel.about.label}</span>
                    <div>{userInfo.about || "-"}</div>
                </div>
            </div>
        );
    }
}
export default (UserInfoCard)