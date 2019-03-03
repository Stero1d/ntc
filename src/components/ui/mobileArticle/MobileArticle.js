/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Icon, Dropdown } from 'semantic-ui-react'
/*custom-components*/
import AuthorView from "../../ui/authorView/AuthorView"
import history from "../../../history"
/*utils*/
import { FormateDate } from "../../../utils/utils"
/*css*/
import "./mobileArticle.css"
import {API} from "../../../redux/constant/UIConst";
import {fetchData} from "../../../utils/fetchHelper";

/**
 * Компонент превью статьи
 */

const trigger = ( <Icon className="edit_outline" name="ellipsis horizontal"/>);

class MobileArticle extends React.PureComponent {

    getImage(imageId) { //Отображение превью изображения статьи
        let imagePreview = <div
            className="article_description_preview_img"
            style={{border: '1px solid lightgray'}}
        >img</div>;
        if (imageId) {
            imagePreview =
                <div
                    className="article_description_preview_img"
                    style={{
                        background: `url(${document.location.origin}/api/file/get?id=${imageId}) center no-repeat`}}>
                </div>;
        }
        return imagePreview
    }

    render() {
        let { className, article, btnLabel, onClick, status, statusLabel, menuArticle, isDisabledRead, subject, user, menuTranslate } = this.props;
        let date = FormateDate(new Date(article.lastUpdateTime));
        const options = [
            { key: 0, text: 'Default', value: 'default' },
            { key: 1, text: menuTranslate && menuTranslate.edit || 'Edit', value: 'edit' },
            { key: 2, text: menuTranslate && menuTranslate.delete || 'Delete', value: 'delete'}
        ];
        return (
            <div className={Object.keys(user).length && `article article_item ${className} activeArticle mobile_article`
            || `article article_item ${className} mobile_article`} onClick={() => {if (user && Object.keys(user).length) {onClick(article.id)}}}>
                <div className="mobile_left_content_article">
                    <div className="article_label">
                    <span>
                        <span className="article_label_text">{article.label}</span>
                        <span className="article_label_subject" style={{background: subject && subject.color}}>{subject && subject.label}</span>
                    </span>
                        {menuArticle
                            ? <div className="status_article">
                                <div>{status && statusLabel[article.status.toLowerCase()]}</div>
                                <Dropdown
                                    className="article_menu"
                                    fluid
                                    trigger={trigger}
                                    options={options}
                                    pointing='top right'
                                    icon={null}
                                    onChange={(e, select) => {
                                        if (select.value) {
                                            menuArticle(article.id, select.value)
                                        }
                                    }}
                                />
                            </div> : ''}
                    </div>
                    <AuthorView
                        name={article.authorName}
                        date={date}
                        countView={article.views || 0}
                        countComments={article.commentsCount}
                    />
                </div>
                <div className="status_article_preview_img">
                    {this.getImage(article.imageId)}
                </div>
                {!isDisabledRead && false
                    ? <Button className="read_more_article" onClick={() => {onClick(article.id)}}>{btnLabel}</Button>
                    : ''}
            </div>
        );
    }
}
export default (MobileArticle)