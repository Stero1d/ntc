/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Dropdown, Icon } from 'semantic-ui-react'
/*custom-components*/
import AuthorView from "../../../ui/authorView/AuthorView"
/*utils*/
import { FormateDate } from "../../../../utils/utils"
/*css*/
import "./previewArticle.css"

/**
 * Компонент препросмотра статьи
 */

const trigger = ( <Icon className="edit_outline" name="ellipsis horizontal"/>);

class PreviewArticle extends React.Component {

    componentDidMount() {
        let text = this.props.infoArticle.text;
        if(text) {
            let container = document.getElementById('info_article_text');
            let scrollContainer = document.getElementsByClassName('App')[0];
            if(container) {
                container.innerHTML = text || '';
            }

            if(scrollContainer) {
                scrollContainer.scrollTop = 0;
            }
        }
    }

    componentDidUpdate(prevProps) {
        let text = this.props.infoArticle.text;
        if (prevProps.infoArticle.text !== text) {
            let container = document.getElementById('info_article_text');
            let scrollContainer = document.getElementsByClassName('App')[0];
            if(container) {
                container.innerHTML = text || '';
            }
        }

    }

    getImage(imageId, newImagePreview) { //Отображение превью изображения статьи
        let imagePreview = <div className="info_article_image">img</div>;
        if (newImagePreview) {
            imagePreview = <div className="info_article_image"
                                style={{
                                    background: `url(${newImagePreview}) center no-repeat`}}></div>;
        } else {
            if (imageId) {
                imagePreview =
                    <div
                        className="info_article_image"
                        style={{background: `url(${document.location.origin}/api/file/get?id=${imageId}) center no-repeat`}}>
                    </div>;
            }
        }
        return imagePreview
    }

    render() {
        let { infoArticle, imagePreview, articleMenu } = this.props;
        let date = FormateDate(new Date(infoArticle.lastUpdateTime || new Date().getTime()));

        return (
            <div className="info_article_container">
                <div className="info_article_content">
                    <div className="info_article_label">
                        <div>{infoArticle.label || "Заголовок статьи"}</div>
                        {articleMenu &&
                            <Dropdown
                                className="article_menu"
                                trigger={trigger}
                                options={articleMenu.optionsMenu('article', infoArticle.status)}
                                pointing='top right'
                                icon={null}
                                onChange={(e, select) => {
                                }}
                            />}
                    </div>
                    <div className="horizontal_divider"></div>
                    <AuthorView
                        name={infoArticle.authorName}
                        date={date}
                        countView={infoArticle.views}
                        countComments={infoArticle.comments && infoArticle.comments.length}
                    />
                    {this.getImage(infoArticle.imageId, imagePreview)}
                    <div id="info_article_text"></div>
                </div>
            </div>
        );
    }
}

export default (PreviewArticle);


