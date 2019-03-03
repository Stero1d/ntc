/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
/*custom-components*/
import User from "../../../ui/user/User"
import UserInfoCard from "../../../ui/userInfoCard/UserInfoCard"
/*css*/
import "./listUsers.css"

/**
 * Компонент блок-списка пользователей
 */

class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
        this.state = {
            activeIndex: '',
        }
    }

    close() {
        this.setState({
            activeIndex: ''
        })
    }

    renderListUsers(list, Translate) {
        let { activeIndex } = this.state;
        if(list && list.length){
            return list.map((item, index) => {
                return (
                    <div className="user_list_item"
                         key={`${item.id}`}
                         onClick={(e) => {
                             this.props.saveUserInfoCard(item);

                         }}
                    >
                        <User
                            className="list_user_item"
                            key={`user_list_${index}`}
                            name={item.name}
                            rank={item.rank}
                            avatar_id={item.avatarId}
                        />
                            {/*<div className="user_info_card_container">
                                {index === activeIndex &&
                                    <UserInfoCard
                                        user={item}
                                        className="userInfo"
                                        close={this.close}
                                        Translate={Translate}
                                        onClick={(e) => e.stopPropagation()}
                                    />}
                            </div>*/}
                    </div>
                )
            })
        }
    }

    render() {
        let { list, Translate } = this.props;
        return (
            <div id="list_users">
                {this.renderListUsers(list, Translate)}
            </div>
        );
    }
}
export default (ListUsers)