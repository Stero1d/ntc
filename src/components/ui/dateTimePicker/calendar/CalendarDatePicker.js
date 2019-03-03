/**
 * Created by smalkov on 07.11.2018.
 */
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Icon } from 'semantic-ui-react'
/*library*/
import DayPicker from "react-day-picker";
/*css*/
import "./calendarDatePicker.css";

const weekdaysShort = ["Вс","Пн","Вт","Ср","Чт","Пт","Сб"];
const nameMonth = [
    "Января", "Февраля", "Марта",
    "Апреля", "Мая", "Июня",
    "Июля", "Августа", "Сентября",
    "Октября", "Ноября", "Декабря"];
const month = [
    "Январь", "Февраль", "Март",
    "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь",
    "Октябрь", "Ноябрь", "Декабрь"];

class CalendarDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setNewDayAtMidnight = this.setNewDayAtMidnight.bind(this);
        this.parseTime = this.parseTime.bind(this);
        this.state = {
            date: '',
            year: '',
            month: '',
            day: '',
            arrayYears: [],
            isOpenListYear: false,
            isOpenListMonth: false
        }
    }

    componentDidMount() {
        let newDate = new Date();
        if(this.props.value){
            this.setState({
                date: new Date(this.props.value),
                year: new Date(this.props.value).getFullYear(),
                month: month[new Date(this.props.value).getMonth()],
                day: new Date(this.props.value).getDate()
            });
        } else {
            this.setState({
                date: newDate,
                year: newDate.getFullYear(),
                month: month[newDate.getMonth()],
                day: newDate.getDate()
            });
        }
        let year = this.props.startYear;
        let arrayYears = [year];
        for (let y = 0; y < 200; y++) {
            year++;
            arrayYears.push(year);
        }
        this.setState({arrayYears: arrayYears})
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    handleClickOutside(e, self) {
        // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
        const listMonth = document.getElementById('popup-list-months-date-picker');
        const listYears = document.getElementById('popup-list-years-date-picker');
        // Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
        if (!e.path.includes(listMonth)) {
            // Если в области кликнутого элемента нету "svgBtnMonth", то проверяем ниже
            // Не произведен ли клик на кнопку, открывающую окно смайлов
            const svgBtnMonth = document.getElementById('arrow-month-open-list-date-picker');
            // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок.
            if (!e.path.includes(svgBtnMonth)) {
                this.setState({isOpenListMonth: false})
            }
        }

        if (!e.path.includes(listYears)) {
            // Если в области кликнутого элемента нету "svgBtnYear", то проверяем ниже
            // Не произведен ли клик на кнопку, открывающую окно смайлов
            const svgBtnYear = document.getElementById('arrow-year-open-list-date-picker');
            // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок.
            if (!e.path.includes(svgBtnYear)) {
                this.setState({isOpenListYear: false})
            }
        }
    }


    setNewDayAtMidnight = () => {
        const now = new Date();
        const endOfDay = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + 1,
            0, 0, 0
        );
        setTimeout(() => {
            document.getElementsByClassName('DayPicker-TodayButton')[0].click();
            this.setNewDayAtMidnight();
        }, (endOfDay.getTime() - now.getTime()))
    };

    renderDate() { //Шапка с текущей датой и выбором года из списка
        let {date, isOpenListYear} = this.state;
        return (
            <div className="Current-date-calendar">
                <div>{weekdaysShort[(new Date(date)).getDay()]},&nbsp;{(new Date(date).getDate() + '').length === 1 ? "0" + new Date(date).getDate() : new Date(date).getDate()} &nbsp;{ nameMonth[new Date(date).getMonth()]}</div>
                <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                    <div>{this.state.year}</div>
                    <Icon
                        name="angle left"
                        id="arrow-year-open-list-date-picker"
                        style={{transform: 'rotate(-90deg)', fill: '#fff', cursor: 'pointer', height: 20, width: 20}}
                        onClick={() => {
                            this.setState({isOpenListYear: !isOpenListYear});
                            let popup = document.getElementById('popup-list-years-date-picker');
                            let indexElement = parseInt(this.state.arrayYears.indexOf(this.state.year));
                            popup.scrollTop = (28 * indexElement) - 56;
                        }}
                    />
                    <div
                        className="popup-list-years-months"
                        id="popup-list-years-date-picker"
                        style={{
                            border: isOpenListYear ? "1px solid rgb(224, 224, 224)" : "",
                            height: !isOpenListYear ? 0 : 160
                        }}
                    >{this.renderFullYearListDropDown("year")}</div>
                </div>
            </div>
        )
    }

    parseOldDate() {
        let newDate = {};
        let oldDate = this.state.date;
        let oldMonth = oldDate.getMonth();
        let oldYear = oldDate.getFullYear();
        let oldDay = oldDate.getDate();
        newDate = {
            oldValueYear: oldYear,
            oldValueMonth: oldMonth,
            oldValueDay: oldDay
        };
        return newDate;
    }

    switchMonth(direction) {//Переключение месяца через left-right arrow
        let choiceMonth = this.state.month;
        let date = this.state.date;
        let indexMonth = month.indexOf(choiceMonth);
        if(direction === "right") {
            indexMonth++;
        } else {
            indexMonth--;
        }
        this.setState({
            date: new Date(date.getFullYear(), indexMonth, 1),
            year: new Date(date.getFullYear(), indexMonth, date.getDate()).getFullYear(),
        });
        if(indexMonth > 11) {
            indexMonth = 0;
        }
        if(indexMonth < 0) {
            indexMonth = 11;
        }
        this.setState({month: month[indexMonth]})
    }

    renderFullYearListDropDown(param) {
        let choiceYear = this.state.year;
        let choiceMonth= this.state.month;
        let year = this.props.startYear ? this.props.startYear : 1900;
        let arrayYears = this.state.arrayYears;

        if(param === "year") {
            return arrayYears.map((each, index) => {
                return (
                    <div key={index}
                         className= {choiceYear !== each ? "item-list-years-months" : "item-list-years-months active-item-list-year-months"}
                         onClick={() => {
                             this.setState({
                                 date: new Date(each, this.parseOldDate().oldValueMonth, this.parseOldDate().oldValueDay),
                                 year: each,
                                 isOpenListYear: false
                             });
                             this.props.onChange(new Date(each, this.parseOldDate().oldValueMonth, this.parseOldDate().oldValueDay));
                         }}
                    >{each}</div>
                )
            });
        } else {
            return month.map((each, index) => {
                return (
                    <div key={index}
                         className= {choiceMonth !== each ? "item-list-years-months" : "item-list-years-months active-item-list-year-months"}
                         onClick={() => {
                             this.setState({
                                 date: new Date(this.parseOldDate().oldValueYear, month.indexOf(each), this.parseOldDate().oldValueDay),
                                 month: each,
                                 isOpenListMonth: false
                             });
                             this.props.onChange(new Date(this.parseOldDate().oldValueYear, month.indexOf(each), this.parseOldDate().oldValueDay));
                         }}
                    >{each}</div>
                )
            });
        }
    }

    parseTime(date, close) {
        const { beforeDisabledDays } = this.props; // внутри может быть не только before:, но и after:

        if (beforeDisabledDays) {
            const { before = '', after = '' } = beforeDisabledDays[0];
            let beforeMidnight = new Date(before).setHours(0, 0, 0, 0),
                afterMidnight = new Date(after).setHours(0, 0, 0, 0),
                clickedDateMidnight = new Date(date).setHours(0, 0, 0, 0);
            if (beforeMidnight && afterMidnight) {
                if (clickedDateMidnight < beforeMidnight || clickedDateMidnight > afterMidnight) {
                    return;
                }
            } else if (beforeMidnight && clickedDateMidnight < beforeMidnight) {
                return;
            } else if (afterMidnight && clickedDateMidnight > afterMidnight) {
                return;
            }
        }
        this.setState({
            date: date,
            month: month[[date.getMonth()]],
            year: date.getFullYear()});
        this.props.onChange(date.getTime(), close);
    }

    render() {
        let {beforeDisabledDays} = this.props; // внутри может быть не только before:, но и after:, зачем до кучи еще и массив, а не объект не понятно
        let {isOpenListMonth} = this.state;
        const RightArrow = <Icon name="angle right" style={{fill: 'rgb(124, 123, 123)'}}/>;

        return (
            <div style={{background: 'white', textAlign: 'center'}}>
                <div>
                    {this.renderDate()}
                    <div style={{padding: '6px 0px', display: 'flex', margin: '0px 15px',
                        alignItems: 'center', justifyContent: 'space-between', fontSize: 14,
                        borderBottom: '1px solid rgb(224, 224, 224)', fontWeight: 500
                    }}>
                        <div
                            className="left-arrow-datePicker"
                            onClick={() => {//Переключение назад
                                this.switchMonth("left");
                            }}
                        >
                        <Icon name="angle left"
                        />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(124, 123, 123)', position: 'relative', minWidth: 86}}>
                            <div>
                                {this.state.month}
                            </div>
                            <Icon
                                name="angle left"
                                id="arrow-month-open-list-date-picker"
                                style={{transform: 'rotate(-90deg)',cursor: 'pointer', height: 20, width: 20, fill: 'rgb(124, 123, 123)'}}
                                onClick={() => {
                                    this.setState({isOpenListMonth: !isOpenListMonth})
                                    let popup = document.getElementById('popup-list-months-date-picker');
                                    let indexElement = parseInt(month.indexOf(this.state.month));
                                    popup.scrollTop = (28 * indexElement + 1) - 70;
                                }}
                            />
                            <div
                                className="popup-list-years-months"
                                id="popup-list-months-date-picker"
                                style={{
                                    border: isOpenListMonth ? "1px solid rgb(224, 224, 224)" : "",
                                    height: !isOpenListMonth ? 0 : 160
                                }}
                            >{this.renderFullYearListDropDown("month")}</div>
                        </div>
                        <div
                            className="right-arrow-datePicker"
                            onClick={() => {//Переключение вперед
                                this.switchMonth("right");
                            }}
                        >{RightArrow}</div>
                    </div>
                </div>
                <DayPicker
                    className={beforeDisabledDays ? "beforeDisabledDays-enabled" : ""}
                    onDayClick={this.parseTime}
                    fixedWeeks
                    months={month}
                    weekdaysLong={[
                        'Воскресенье',
                        'Понедельник',
                        'Вторник',
                        'Среда',
                        'Четверг',
                        'Пятница',
                        'Суббота',
                    ]}
                    weekdaysShort={weekdaysShort}
                    firstDayOfWeek={1}
                    selectedDays={this.state.date}
                    month={this.state.date}
                    labels={{nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц'}}
                    todayButton="today"
                    initialMonth={new Date(2017, 3)}
                />
                <span id="calendar-date-picker-today"
                      onClick={() => {
                          //document.getElementById('input-date-picker-value').focus();
                          let date =  new Date(new Date().setHours(new Date().getHours() + 1));
                          let options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
                          let newDate = date.toLocaleString('en-GB', options).replace(',', ' ');
                          this.props.newSaveTimePicker(newDate.split(" ")[2]);
                          this.parseTime(new Date(), true);
                          this.setState({
                              date: new Date(),
                              year: new Date().getFullYear(),
                              month: month[new Date().getMonth()],
                              day:  new Date().getDate()
                          })
                      }}
                      style={{
                          fontSize: '1em',
                          /*textDecoration: 'underline',*/
                          color: 'grey',
                          cursor: 'pointer',
                          padding: '0px 2px 0px 2px',
                          position: 'relative',
                          top: '-2px'
                      }}
                >
                    Сегодня
                </span>
            </div>
        )
    };

}
export default connect(
    state => ({
        calendar: state.calendarDatePicker,
        currentYear: state.calendarDatePicker.year,
        currentMonth: state.calendarDatePicker.month,
    }),
    dispatch => ({
        newSaveDatePicker: (newDate, serverDate) => {
            dispatch({
                type: "SAVE_VALUE_CALENDAR_DATE_PICKER",
                payload: {
                    newDate: newDate,
                    serverDate: serverDate
                }});
        },
        newSaveTimePicker: (newTime) => {
            dispatch({
                type: "SAVE_TIME_CALENDAR_DATE_PICKER",
                payload: {
                    newTime: newTime
                }});
        }
    })
)(CalendarDatePicker);
