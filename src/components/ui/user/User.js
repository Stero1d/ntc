/**
 * Created by smalkov on 06.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
/*css*/
import "./user.css"

/**
 *  Компонент отображения аватара с именем пользователя.
 */

class User extends React.PureComponent {

    getAvatar(avatar_id) { //Отображение аватара
        let imgAvatar = <div className="user_avatar"><Icon name='user circle outline'/></div>;
        if (avatar_id) {
            imgAvatar = <div className="user_avatar"
                             style={{background: `url(${document.location.origin}/api/file/get?id=${avatar_id}) center no-repeat`,
                                    border: '1px solid lightgray'
                             }}/>
        }
        return imgAvatar
    }

    render() {
        let { className, name, rank, avatar_id, date } = this.props;

        return (
            <div className={`user_info ${className}`}>
                {this.getAvatar(avatar_id)}
                <div className="user_name_science">
                    <div className="user_name">{name}</div>
                    <div className="user_science">{rank}</div>
                </div>
                <div className="user_date">{date}</div>
            </div>
        );
    }
}
export default (User)