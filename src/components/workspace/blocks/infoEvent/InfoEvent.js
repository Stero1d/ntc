/**
 * Created by smalkov on 09.11.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
/*css*/
import "./infoEvent.css"

/**
 * Компонент просмотра события
 */

class InfoEvent extends React.Component {

    render() {
        let { infoEvent, translate, clearEventInfo } = this.props;
        let oldDate = infoEvent.publishDate && new Date(infoEvent.publishDate);
        let day = oldDate.getDate();
        let month = translate.setup.rightPanel.birthday.month.optionsMonth[oldDate.getMonth()];
        let year = oldDate.getFullYear();
        return (
            <div id="info_event">
                <div className="head_title_info_event">
                    <Icon
                        className="eventInfo_arrow_left"
                        name="arrow left"
                        onClick={clearEventInfo}
                    />
                    <div>
                        <div className="info_event_date">{day + " " + month + " " + year}</div>
                        <div className="info_event_label">{infoEvent.caption}</div>
                    </div>
                </div>
                <div className="horizontal_divider"></div>
                <div className="content_info_event">
                    {infoEvent.text}
                </div>
            </div>
        );
    }
}

export default (InfoEvent);


