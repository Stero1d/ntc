/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom-components*/
import User from "../../ui/user/User"
/*utils*/
import { FormateDate } from "../../../utils/utils"
/*css*/
import "./comment.css"

/**
 * Компонент комментарий
 */

class Comment extends React.PureComponent {

    render() {
        let { comment, reply, forWhomClick } = this.props;
        return (
            <div id="comment">
                <div className='comment_head'>
                    <User
                        className="my_info_user"
                        name={comment.authorName}
                        date={FormateDate(new Date(comment.createTime))}
                        avatar_id={comment.avatarId}/>
                </div>
                <div className='comment_text'>
                    {comment.answerToUserName ?
                        <span className="forWhom_comments link">{`${comment.answerToUserName}, `}</span>
                            : ''}
                    {comment.text}
                </div>
                <div className="replay">
                    <div className="user_date">{FormateDate(new Date(comment.createTime))}</div>
                       <span
                           className="link"
                           onClick={() => {
                               forWhomClick(comment.authorName, comment.id);
                           }}
                       >{reply}</span>
                </div>
            </div>
        );
    }
}
export default (Comment)