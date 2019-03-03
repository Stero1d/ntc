/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*custom components*/
import Article from "../../../ui/article/Article"
import MobileArticle from "../../../ui/mobileArticle/MobileArticle"
/*css*/
import "./viewArticles.css"

/**
 * Компонент блок превью статей
 */

class ViewArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.addStyle();
    }

    componentDidUpdate() {
        this.addStyle();
    }

    addStyle() {
        let articles = document.getElementsByClassName('article_description_annotation');
        if (articles && articles.length) {
            for(let a = 0; a < articles.length; a++) {
                if(articles[a].style.webkitBoxOrient !== 'vertical') {
                    articles[a].style.webkitBoxOrient = 'vertical';
                }
            }
        }
    }

    subject(subjects, subjectId) {
        let color = ["#92B7E3", "#A2C2AB", "#BCAED2"];
        if (subjects && subjects.length !== 0) {
            for (let i = 0; i < subjects.length; i++) {
                if (subjectId === subjects[i].id) {
                    return {
                        label: subjects[i].label,
                        color: color[subjectId]
                    }
                }
            }
        }
    }

    renderAriclesBlock() {
        let { articles, className, btnLabel, countViewArticles, onClick, status, statusLabel, textNoData,
            menuArticle, isDisabledRead, subjects, menuTranslate, user } = this.props;
        if(articles && articles.length !== 0) {
            return articles.map((item, index) => {
                if(index < countViewArticles) {
                    return (
                        [<Article
                            key = {`article_${className}_${index}`}
                            status={status}
                            statusLabel={statusLabel}
                            article={item}
                            btnLabel={btnLabel}
                            className={className}
                            onClick={onClick}
                            user={user}
                            menuArticle={menuArticle}
                            menuTranslate={menuTranslate}
                            isDisabledRead={isDisabledRead}
                            subject={this.subject(subjects, item.subjectId)}
                        />,
                        <MobileArticle
                            key = {`article_mobile_${className}_${index}`}
                            status={status}
                            statusLabel={statusLabel}
                            article={item}
                            btnLabel={btnLabel}
                            className={className}
                            onClick={onClick}
                            user={user}
                            menuArticle={menuArticle}
                            menuTranslate={menuTranslate}
                            isDisabledRead={isDisabledRead}
                            subject={this.subject(subjects, item.subjectId)}
                        />]
                    )
                }
            })
        } else {
            return <div className="text_no_data">{textNoData}</div>
        }
    }

    render() {
        let { title, className, link } = this.props;

        return (
            <div className={`atricles_view_block ${className}`}>
                    <div>
                        <div className="atricles_view_block_head">
                            <div className="title_view_articles_head">{title && title.toUpperCase()}</div>
                            {link ? <div className="link link_articles_view_block" onClick={() => {}}>{link.label}</div> : ''}
                        </div>
                        <div className='horizontal_divider'></div>
                        {this.renderAriclesBlock()}
                    </div>
            </div>
        );
    }
}
export default (ViewArticles)