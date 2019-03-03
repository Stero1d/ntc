/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Button, TextArea, Icon } from 'semantic-ui-react'
/*custom-components*/
import User from "../../../ui/user/User"
import Comment from "../../../ui/comment/Comment"
/*css*/
import "./comments.css"

/**
 * Компонент блок-уоментариев
 */

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
        this.state = {
            comment: '',
            forWhom: '',
            parentId: '',
            isAll: false
        }
    }

    onSend() {
        let { onSendCommnent, comments, user } = this.props;
        let { comment, forWhom, parentId } = this.state;
        let app = document.getElementsByClassName('App')[0];
        let obj = {
            parentId: parentId,
            text: forWhom && comment.replace(forWhom + ", ", '') || comment
        };
        onSendCommnent(obj);
        this.setState({
            comment: '',
            forWhom: '',
            parentId: '',
            isAll: true
        });
        if (app) {
            setTimeout(() => {
               app.scrollTop = 999999;
            }, 250);
        }
    }

    renderComments(comments, isAll, reply) {
        let content = [];
        comments.map((item, index) => {
            if (!isAll && index === 0) {
                content.push(
                    <Comment
                       key={`comment_${item.id}`}
                       comment={item}
                       reply={reply}
                       forWhomClick={(name, id) => {
                           this.setState({
                               comment: name + ', ',
                               forWhom: name,
                               id: id
                           });
                           let input = document.getElementsByClassName('input_my_comment')[0];
                           if (input) {
                               input.focus();
                           }
                       }}
                    />
                )
            } else if (isAll) {
                content.push(
                    <Comment
                        key={`comment_${item.id}`}
                        comment={item}
                        reply={reply}
                        forWhomClick={(name, id) => {
                            this.setState({
                                comment: name + ', ',
                                forWhom: name,
                                parentId: id
                            });
                            let input = document.getElementsByClassName('input_my_comment')[0];
                            if (input) {
                                input.focus();
                            }
                        }}
                    />
                )
            }
        });

        return content
    }

    render() {
        let { comments, translate } = this.props;
        let { comment, isAll } = this.state;
        let content = this.renderComments(comments, isAll, translate.infoArticle.comments.reply);
        return (
            <div id="comments_block">
                <div className="comments_header">
                    <div className="comments_title">{`${translate.infoArticle.comments.title} (${comments && comments.length || 0})`}</div>
                    {comments && comments.length > 1
                        ? <Button className="btn_gray"
                                  onClick={() => {
                                      this.setState({
                                          isAll: !isAll
                                      })
                                  }}
                          >
                            {!isAll && translate.infoArticle.comments.allComments || translate.infoArticle.comments.collapse}
                            {!isAll && <Icon name="angle down"/> || <Icon name="angle up"/>}</Button>
                               : ''}
                </div>
                <div className="content_comments">
                    {content}
                </div>
                <div className="field_input_my_comment">
                    <TextArea
                        autoHeight
                        className="input_my_comment"
                        type="text"
                        placeholder={translate.infoArticle.comments.placeholder}
                        value={comment}
                        onChange={(e) => {
                            this.setState({comment:  e.target.value})
                        }}
                        rows={1}
                    />
                    <div  className="container_send_comment">
                        <Button
                            className="send_comment btn_standart_style"
                            disabled={!comment}
                            onClick={this.onSend}
                        >{translate.infoArticle.comments.send}</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default (Comments);