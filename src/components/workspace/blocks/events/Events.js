/**
 * Created by smalkov on 04.09.2018.
 */

// react - redux
import React from "react";
/*custom components*/
import EventList from "../../../ui/eventList/EventList"

/*css*/
import "./events.css"

/**
 * Компонент содержащий блок событий
 */

class Events extends React.Component {

    componentDidMount() {
        let articles = document.getElementsByClassName('development_description');
        if (articles && articles.length) {
            for(let a = 0; a < articles.length; a++) {
                articles[a].style.webkitBoxOrient = 'vertical';
            }
        }
    }

    render() {
        let { Translate, events, viewAllNews, onClick } = this.props;
        return (
            <div id="main_developments_block">
                <div className="main_developments_block_head">
                    <span className="main_developments_block_title">{Translate.home.rightPanel.title}</span>
                    {events && events.length &&
                        <span
                            className="link_all_events"
                            onClick={viewAllNews}
                        >{Translate.home.rightPanel.linkTitle}</span> || ''}
                </div>
                <div className='horizontal_divider'></div>
                {events && events.length &&
                    <EventList
                        events={events}
                        countView = {5}
                        onClick={onClick}
                    /> ||
                    <div className="table_not_found_data">{Translate.administration.notFoundData.events}</div>
                }
            </div>
        );
    }
}
export default (Events)