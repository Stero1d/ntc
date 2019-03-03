/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom-components*/
import PreviewArticle from "../../blocks/previewArticle/PreviewArticle"
import Comments from "../../blocks/comments/Comments"
/*semantic-ui components*/
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
/*css*/
import "./infoArticle.css"
/*utils*/
import { fetchData } from "../../../../utils/fetchHelper";
import { FormateDate, getCloneObject } from "../../../../utils/utils";
import { TranslateInterface } from "../../../../utils/translate/Translate";

/**
 * Компонент страницы просмотра статьи
 */

class InfoArticle extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { getArticleInfo, id, settings } = this.props;
        fetchData(API.ARTICLE.GET_ARTICLE, {id: id, language: settings.language || 'RU'}, getArticleInfo);
    }

    componentWillUnmount() {
        this.props.clearInfoArticle();
    }

    onSendComment(comment) {
        let { infoArticle, saveComments } = this.props;
        fetchData(API.COMMENTS.SAVE_COMMMENT, {
            articleId: infoArticle.id,
            text: comment.text,
            parentId: comment.parentId
        }, saveComments);
    }

    renderArticlesTheme() {
        let articles = [
            {date: new Date(), label: 'Микробы, которые обезвреживают радиоактивные\n' +
                'отходы'},
            {date: new Date(), label: 'Микробы, которые обезвреживают радиоактивные\n' +
                'отходы'},
            {date: new Date(), label: 'Микробы, которые обезвреживают радиоактивные\n' +
                'отходы'},
        ];
        if (articles && articles.length) {
            return articles.map((item, index) => {
                let date = FormateDate(new Date(item.date));

                return (
                    <div className="item_articles_more" key={`theme_article_${index}`}>
                        <div className="date_article">{date}</div>
                        <div>{item.label}</div>
                    </div>
                )
            })
        }
    }

    render() {
        let { infoArticle, clearInfoArticle, settings, user, onSendCommnent } = this.props;
        let translate = TranslateInterface(settings.language || 'ru');

        return (
            <div id="info_article">
                <div className="info-article-page_left_panel ">
                    {infoArticle && !Object.keys(infoArticle).length ?
                        <Segment className="main_root_loading">
                            <Dimmer active inverted>
                                <Loader inverted/>
                            </Dimmer>
                        </Segment>
                        :
                        <PreviewArticle
                            infoArticle={infoArticle}
                            clearInfoArticle={clearInfoArticle}
                        />
                    }
                    <div id="info_article_comments">
                        <Comments
                            user={user}
                            translate={translate}
                            comments={infoArticle.comments || []}
                            onSendCommnent={
                                (comment) => {
                                    console.log(comment)
                                    this.onSendComment(comment)
                                }}
                        />
                    </div>
                </div>
                <div className="info-article-page_right_panel ">
                    <div className="info_article_label">{translate.infoArticle.moreArticles}</div>
                    <div className="horizontal_divider"></div>
                    {this.renderArticlesTheme()}
                </div>
            </div>
        );
    }
}

export default
connect(
    state => ({
        user: state.user,
        infoArticle: state.infoArticle,
        settings: state.settings
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
        getArticleInfo: (article) => {
            dispatch({
                type: "GET_ARTICLE_INFO",
                payload: {
                    article: article,
                }
            })
        },
        clearInfoArticle: () => {
            dispatch({
                type: "CLEAR_INFO_ARTICLE",
                payload: {}
            })
        },
        saveComments: (comments) => {
            dispatch({
                type: "SAVE_COMMENTS",
                payload: {
                    comments: comments
                }
            })
        }
    })
)
(InfoArticle);


