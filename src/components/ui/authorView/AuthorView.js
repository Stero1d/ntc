/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
/*css*/
import "./authorView.css"

/**
 * Компонент блок автора статьи
 */

class AuthorView extends React.PureComponent {

    render() {
        let { date, name, countView, countComments } = this.props;
        return (
            <div className="article_description_info_author">
                <div>
                    <div className="article_author">{name}</div>
                    <div>{",  "}</div>
                    <div className="article_date">{date}</div>
                </div>
                <div>
                    <div className="comment_outline_icon">
                        <Icon name='comment outline'/>
                        <div>{countComments}</div>
                    </div>
                    <div className="eye_icon">
                        <Icon name='eye'/>
                        <div>{countView}</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default (AuthorView)