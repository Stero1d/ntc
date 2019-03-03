/**
 * Created by smalkov on 28.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Modal, Input, Icon} from 'semantic-ui-react'
/*custom components*/
import User from "../../ui/user/User"
/*css*/
import "./userInfoCard.css"

/**
 *  Компонент отображения карточки пользователя
 */

class UserInfoCard extends React.PureComponent {
    render() {
        let { className, user, close } = this.props;

        return (
            <div className={`user_info_card ${className}`}>
                <User
                    className="list_user_info"
                    name={user.name}
                    rank={user.rank}
                    avatar_id={user.avatarId}/>
                <div className="articlesUserCount">
                    {/*<div className="text">{Translate.activities.communityMembers.userInfoCard.article + " "} </div>
                    <div className="link"></div>*/}
                </div>
                <div className="descriptionUser">{user.about || "Нет информации"}</div>
                <Icon name="close" onClick={close}/>
            </div>
        );
    }
}
export default (UserInfoCard)