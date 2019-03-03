/**
 * Created by smalkov on 07.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*css*/
import "./eventList.css"

/**
 * Компонент отображения блока события
 */

const monthName = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "сен", "окт", "ноя", "дек"];

class EventList extends React.PureComponent {

    renderItems(events, countView, onClick) {
        if(events && events.length) {
            return events.map((item, index) => {
                if(countView > index){
                    let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                    let oldDate = new Date(item.publishDate);
                    let day = oldDate.getDate();
                    let month = oldDate.getMonth();
                    let newData = oldDate.toLocaleString('ru-Ru', options).replace(/\/+/g, '.');
                    return (
                        <div key={`development_item_${index}`} className="development_item" onClick={() => onClick(item)}>
                            {/*<div className="development_date_name">
                                <div>{newData + ' , ' + item.name}</div>
                            </div> */}
                            <div className="development_date_name">
                                <div className="development_date_day">{day && day.toString().length === 1 ?  ("0" + day) : day}</div>
                                <div className="development_date_month">{monthName[month - 1]}</div>
                            </div>
                            <div className="development_description">{item.caption}</div>
                        </div>
                    )
                }
            })
        }
    }

    render() {
        let { events, countView, onClick } = this.props;
        return (
            <div className="renderItems_developments">
                {this.renderItems(events, countView, onClick)}
            </div>
        );
    }
}
export default (EventList)