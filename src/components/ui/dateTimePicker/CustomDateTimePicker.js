/**
 * Created by admin on 24.03.2018.
 */
/**
 * Поле с диалогом ввода ДАТЫ и ВРЕМЕНИ
 */
import React from "react"
import { connect } from "react-redux";
import InputMask from "react-input-mask";
/*semantic-ui components*/
import { Icon, Button } from 'semantic-ui-react'
/*icons*/
import { Calendar } from "../../ui/svgIcons/svgIcons"
/*custom components*/
import CustomCalendar from "./calendar/CalendarDatePicker";
/*css*/
import "./customDateTimePicker.css"

class customDateTimePicker extends React.Component {
    constructor (props) {
        super(props);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            date: this.props.value,
            inputDate: '',
            time: '',
            textError: '',
            arrayTime: [],
            isCheckError: true,
            isOpenCalendarDatePicker: false,
            isOpenTimePickerList: false,
            onMouseLeaveDataPicker: false,
            isOpenListTime: false,
        }
    }

    onFieldChange(value, name) { //Обработка ввода даты с клавиатуры
        if(value && (value.split("_").length !== 13 || (value && !this.props.time && value.split("_").length !== 9))) {
            let day, month, year, hourse, minutes;
            if(name === "timePicker") {
                value = value.split(" / ")[0] + ":" + value.split(" / ")[1];
                if(value === "__:__"){
                    this.setState({time: "00 : 00"});
                } else {
                    this.setState({time: value});
                }
            }

            if(name === "datePicker") {
                day = value.split('.')[0];
                month = value.split('.')[1] ;
                year = value.split('.')[2].split(' / ')[0];
                if(this.props.time){
                    hourse = value.split(' / ')[1].split(':')[0];
                    minutes = value.split(' / ')[1].split(':')[1];
                } else {
                    hourse = "00";
                    minutes = "00";
                }

                if(month === 0) {
                    month = 0
                } else {
                    month = month - 1;
                }
                if(hourse > 24) {
                    hourse = 23;
                }

                if(minutes > 60 ) {
                    minutes = 59
                }
                this.setState({
                    inputDate: value
                });
                this.setState({
                    isOpenCalendarDatePicker: false,
                    inputDate: value
                });
                this.validationCheck(value);

            }
        } else {
            this.setState({
                date: '',
                inputDate: ''
            });
        }
    }

    componentWillReceiveProps(newProps) {
        if(this.props.value !== newProps.value) {
            this.defaultDate(newProps.value);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.projectIssueDateValidation instanceof Function && this.props.projectIssueDateValidation === '') {
            this.validationCheck('', true);
        }
    }

    componentDidMount() {
        this.defaultDate(this.props.value);
    }

    defaultDate(value) {
        if(new Date(value) != 'Invalid Date'){
            value = new Date(value).getTime();
        }
        if(value) {
            this.setState({
                date: parseInt(value),
                inputDate: this.parseDateStringInput(value),
                time: this.timeParse(value, false).time
            });
        } else {
            this.setState({
                date: '',
                time: this.timeParse(value, true).time
            });
        }
    }

    componentWillMount() {
        document.addEventListener('click', this.handleClickOutside, false);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, false);
    }

    timeParse(value, isNew){
        value = parseInt(value);
        let hourse, minutes;
        if(isNew) {
            hourse = new Date(new Date().setHours(new Date().getHours() + 1)).getHours();
            minutes = new Date().getMinutes();
        } else {
            hourse = new Date(new Date(value).setHours(new Date(value).getHours())).getHours();
            minutes = new Date(value).getMinutes();
        }
        if(hourse < 10) {
            hourse = "0" + hourse
        }

        if(minutes < 10) {
            minutes = "0" + minutes
        }

        return {
            time: hourse + " : " + minutes
        }
    };

    handleClickOutside(e, self) {
        // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
        const datePicker = document.getElementById(`customCalendarDatePicker_${this.props.id}`);
        const timeListPicker = document.getElementById('popup-list-time');
        // Проверяем, есть ли в списке родительских или дочерних элементов, вышеуказанный компонент
        if (!e.path.includes(datePicker)) {
            // Если в области кликнутого элемента нету "svgBtnMonth", то проверяем ниже
            // Не произведен ли клик на кнопку, открывающую окно смайлов
            const svgBtnOpenCalendarDatePicker = document.getElementById(`customDatePickerIcon-container_${this.props.id}`);
            const svgBtnInputCalendarDatePicker = document.getElementById('input-date-picker-value');
            // Если клик не производился и на кнопку открытия окна смайлов, то скрываем блок.
            if (!e.path.includes(svgBtnOpenCalendarDatePicker)) {
                this.setState({isOpenCalendarDatePicker: false})
            }
        }

        if (!e.path.includes(timeListPicker)) {
            // Если в области кликнутого элемента нету "svgBtnMonth", то проверяем ниже
            // Не произведен ли клик на кнопку, открывающую окно
            const svgBtnOpenTimePicker = document.getElementById('arrow-list-time-date-picker');
            if (!e.path.includes(svgBtnOpenTimePicker)) {
                this.setState({isOpenTimePickerList: false})
            }
        }
    }

    saveDatePicker (value, close) {//Сохранение даты с временем в state
        let date = '';
        let input = document.getElementById(`input-date-picker-value_${this.props.id}`);
        if(!this.state.date && !value) {
            date = new Date();
        } else {
            if(!this.props.time) {
                date = new Date(value);
            } else {
                date = new Date(this.state.date);
            }
        }
        let time = this.state.time;
        let new_data = "", sendDate = "";
        if (!time.includes("_")) {
            new_data = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
            this.setState({
                date: new_data.getTime(),
                inputDate: this.parseDateStringInput(new_data.getTime())
            });
            this.props.onChange(new_data.getTime());
        } else {
            new_data = new Date(date.getFullYear(), date.getMonth(), date.getDate(), parseInt(new Date().getHours()) + 1, parseInt(new Date().getMinutes()))
        }
        this.validationCheck(this.parseDateStringInput(new_data.getTime()));
        if(close){
            this.setState({isOpenCalendarDatePicker: false})
        }
        input.selectionStart = input.value.length;
        /*event.keyCode=9;*/
    }


    renderListTime() {
        let arrayTime = [];
        for(let t = 1; t < 24; t++) {
            let itemTime = '';
            if(t < 10) {
                itemTime = '0' + t  +  ':' + ' ' + '00'
            } else {
                itemTime = t + ' ' +  ':' + ' ' + '00'
            }
            arrayTime.push(itemTime);
        }
        arrayTime.push("00 : 00");
        let time = this.state.time.split(" :")[0];
        return arrayTime.map((each, index) => {
            return (
                <div key={index}
                     className= {time === each.split(" :")[0] ? "active-item-list-year-months" : ""}
                     onClick={() => {
                         document.getElementById('time-date-picker-value-id').focus();
                         this.setState({
                             time: each,
                             isOpenTimePickerList: false})
                     }}
                >{each}</div>
            )
        });
    }

    parseDateStringInput(value){
        if(value) {
            let oldDate = '';
            if(!this.props.time) {
                oldDate = new Date(new Date(parseInt(value)).getFullYear(), new Date(parseInt(value)).getMonth(), new Date(parseInt(value)).getDate(), 12, 0);
            } else {
                oldDate = new Date(parseInt(value));
            }
            let options = {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'};
            let newDate = oldDate.toLocaleString('ru-RU', options).replace(', ', ' / ');
            let date =  newDate.split(' / ')[0]
            let hourse = newDate.split(' / ')[1].split(":")[0];
            let minutes = newDate.split(' / ')[1].split(":")[1];
            if (hourse.length === 1) {
                hourse = "0" + hourse;
            }
            return date + " / " + hourse + ":" + minutes
        }
    }

    validationCheck(value, onBlur) {
        let oldDate = value ? value : this.state.inputDate;
        if (oldDate) {
            if(oldDate.split("_").length !== 13 || (oldDate.split("_").length !== 9 && !oldDate.includes("__:__"))) {
                if(!oldDate.includes("_")) {
                    let oldDay = parseInt(oldDate.split('.')[0]);
                    let oldMonth = parseInt(oldDate.split('.')[1]) - 1;
                    let oldYear = parseInt(oldDate.split('.')[2]);
                    let hourse, minutes;
                    if(this.props.time) {
                        hourse = parseInt(oldDate.split(" / ")[1].split(":")[0]);
                        minutes = parseInt(oldDate.split(" / ")[1].split(":")[1]);
                        if(oldDate.split(" / ")[1].split(":")[0].includes("_") || oldDate.split(" / ")[1].split(":")[1].includes("_")){
                            hourse = "";
                            minutes = ""
                        }
                    } else {
                        hourse = 0;
                        minutes = 0
                    }
                    let newData = new Date(oldYear, oldMonth, oldDay, hourse, minutes);
                    if(oldDay !== newData.getDate() || oldMonth !== newData.getMonth() ||oldYear !== newData.getFullYear() || oldYear <= 1930
                        || hourse >= 24 || (!hourse && hourse !== 0) || minutes >= 60  || (!minutes && minutes !== 0)) {
                        this.setState({
                            isCheckError: false,
                            textError: this.props.time ? "Некорректные дата или время" : "Неверная дата"
                        });
                        if(  this.props.onCheck) {
                            this.props.onCheck(true);
                        }
                    } else {
                        if(!this.props.validationDisabled) {
                            if (newData.getTime() < new Date().getTime()) {
                                if(!onBlur){
                                    this.props.onChange(newData.getTime());
                                }
                                let textError = 'Дата и время не могут быть раньше текущих';
                                if (this.props.projectIssueDateValidation) {
                                    const validationResult = this.props.projectIssueDateValidation(newData);
                                    textError = validationResult && validationResult.text;
                                }
                                if (textError) {
                                    this.setState({
                                        isCheckError: false,
                                        textError: textError
                                    });
                                } else {
                                    this.setState({
                                        isCheckError: true,
                                        textError: textError
                                    });
                                }
                            } else {
                                if(!onBlur){
                                    this.props.onChange(newData.getTime());
                                }
                                let textError = '';
                                if (this.props.projectIssueDateValidation) {
                                    const validationResult = this.props.projectIssueDateValidation(newData);
                                    textError = validationResult && validationResult.text;
                                }
                                if (textError) {
                                    this.setState({
                                        isCheckError: false,
                                        textError: textError
                                    });
                                } else {
                                    this.setState({
                                        isCheckError: true,
                                        textError: textError
                                    });
                                }
                            }
                        } else {
                            if(!onBlur){
                                this.props.onChange(newData.getTime());
                            }
                            this.setState({
                                isCheckError: true,
                                textError: ""
                            });
                        }
                        if(this.props.onCheck) {
                            this.props.onCheck(false);
                        }
                    }
                } else if(oldDate.includes("_") && !value && oldDate.split("_").length !== 13){
                    if(oldDate.split("_").length === 13){
                        this.setState({
                            isCheckError: true,
                            textError: ""
                        });
                    } else if(oldDate.split("_").length === 9 && !this.props.time){
                        this.setState({
                            isCheckError: true,
                            textError: ""
                        });
                    } else {
                        this.setState({
                            isCheckError: false,
                            textError: this.props.time ? "Некорректные дата или время" : "Неверная дата"
                        });
                    }
                } else {
                    this.setState({
                        isCheckError: true,
                        textError: ""
                    });
                }
            }
        } else {
            this.setState({
                isCheckError: true,
                textError: ""
            });
        }
    }

    render() {
        let {placeholder, styleInput, styleIcon, style, isFocused, label, required, projectIssueDateValidation, disabled = false} = this.props;
        let {isOpenCalendarDatePicker, isOpenTimePickerList, onMouseLeaveDataPicker, time} = this.state;

        let errorClass = '';
        if (projectIssueDateValidation !== undefined) {
            errorClass = 'projectIssueError';
        }

        return (
            <div className="customDatePicker" style={style}>
                <div
                    style={{display: 'flex', alignItems: 'center'}}
                    onBlur={() => {
                        if(this.state.onMouseLeaveDataPicker) {
                            this.setState({isOpenCalendarDatePicker: false})
                        }
                    }}
                    onMouseLeave={() => {
                        this.setState({
                            onMouseLeaveDataPicker: true
                        })
                    }}
                    onMouseEnter={() => {
                        this.setState({
                            onMouseLeaveDataPicker: false
                        })
                    }}
                >
                    <InputMask
                        id={`input-date-picker-value_${this.props.id}`}
                        className="datePickerInput"
                        style={{
                            background: 'white',
                            border: '1px solid rgb(192, 192, 192)',
                            height: 32,
                            padding: '4px 10px 4px',
                            borderRadius: 3,
                            boxSizing: 'border-box',
                            width: '100%',
                            fontFamily: 'sans-serif',
                            outlineColor: '#4a4293',
                            fontSize: '14px',
                            ...styleInput
                        }}
                        value={this.state.inputDate}
                        autoFocus={isFocused}
                        placeholder={placeholder}
                        onChange={(e, date, close) => {
                            this.onFieldChange(e.target.value, e.target.name);
                        }}
                        name="datePicker"
                        mask={this.props.time ? "99.99.9999 / 99:99" :  "99.99.9999"}
                        onBlur={() => {
                            this.validationCheck('', true);
                        }}
                        disabled={disabled}

                    />
                    <div
                        id={`customDatePickerIcon-container_${this.props.id}`}
                        className={disabled ? "customDatePickerIcon-container" : "customDatePickerIcon-container chat-list-item-tooltip"}
                        data-tooltip={!isOpenCalendarDatePicker ? "Открыть календарь" : "Закрыть календарь"}
                        disabled={disabled}
                        onClick={() => {
                            if (!disabled) {
                                document.getElementById(`input-date-picker-value_${this.props.id}`).focus();
                                this.setState({
                                    isOpenCalendarDatePicker: !isOpenCalendarDatePicker,
                                    onMouseLeaveDataPicker: !onMouseLeaveDataPicker
                                });
                                if (!this.props.direction) {
                                    let winHeight = document.documentElement.clientHeight;
                                    let {top, bottom} = document.getElementById(`customDatePickerIcon-container_${this.props.id}`).getBoundingClientRect();
                                    let elBottom = winHeight - bottom;
                                    let popup = document.getElementById(`customCalendarDatePicker_${this.props.id}`);
                                    if (popup) {
                                        popup.style.bottom = top > elBottom ? !label ? '34px' : '54px' : 'initial';
                                        popup.style.top = top > elBottom ? 'initial' : !label ? '34px' : '54px';
                                    }
                                }
                            }
                        }}
                    >
                        {!disabled &&
                        <Calendar
                            className="customDatePickerIcon"
                            style={{
                                fill: isOpenCalendarDatePicker ? "7CB8B0" : "grey",
                                height: 17,
                                width: 20,
                                styleIcon
                            }}
                        />}

                    </div>
                    <div
                        id={`customCalendarDatePicker_${this.props.id}`}
                        className="customCalendarDatePicker"
                        onMouseLeave={() => {
                            this.setState({
                                onMouseLeaveDataPicker: true
                            })
                        }}
                        onMouseEnter={() => {
                            this.setState({
                                onMouseLeaveDataPicker: false
                            })
                        }}
                    >
                        {isOpenCalendarDatePicker
                            ?
                            <div>
                                <CustomCalendar
                                    onChange={(date, close) => {
                                        if(this.props.time) {
                                            this.setState({date: date})
                                        } else {
                                            this.setState({date: date});
                                            this.saveDatePicker(date, close);
                                        }
                                    }}
                                    startYear={this.props.startYear}
                                    value={this.state.date}
                                />
                                {this.props.time ?
                                    <div id="time-btn-date-picker">
                                        <div className="time-date-picker" style={{opacity: this.props.time ? 1 : 0.7}}>
                                            <div className="time-date-picker-title">Время</div>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '110px',
                                                position: 'relative'
                                            }}>
                                                <InputMask
                                                    className="time-date-picker-value" id="time-date-picker-value-id"
                                                    style={{
                                                        background: 'white',
                                                        border: '1px solid rgb(192, 192, 192)',
                                                        height: 26,
                                                        padding: '4px 8px 4px',
                                                        borderRadius: 3,
                                                        boxSizing: 'border-box',
                                                        fontFamily: 'sans-serif',
                                                        outlineColor: '#4a4293',
                                                        width: 80
                                                    }}
                                                    value={time}
                                                    onChange={e => {
                                                        this.onFieldChange(e.target.value, e.target.name)
                                                    }}
                                                    disabled={this.props.time ? false : true}
                                                    name="timePicker"
                                                    mask="99 : 99"
                                                />
                                                <div id="arrow-list-time-date-picker"
                                                     style={{
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         position: 'relative',
                                                         borderLeft: '1px solid rgb(224, 224, 224)',
                                                         left: '-23px'
                                                     }}>
                                                    <Icon
                                                        name="angle left"
                                                        id="arrow-time-open-list-date-picker"
                                                        style={{
                                                            transform: 'rotate(-90deg)',
                                                            cursor: 'pointer', height: 20, width: 20,
                                                            fill: !isOpenTimePickerList ? 'rgb(124, 123, 123)' : 'rgb(74, 66, 147)'
                                                        }}
                                                        onClick={() => {
                                                            document.getElementById('time-date-picker-value-id').focus();
                                                            this.setState({isOpenTimePickerList: !isOpenTimePickerList});
                                                            let winHeight = document.documentElement.clientHeight;
                                                            let {top, bottom} = document.getElementById('arrow-time-open-list-date-picker').getBoundingClientRect();
                                                            let elBottom = winHeight - top;
                                                            let popup = document.getElementById('popup-list-time');
                                                            let indexElement = parseInt(this.state.time.split(":")[0]);
                                                            if(indexElement === 0){
                                                                indexElement = 24;
                                                            }
                                                            popup.scrollTop = (25 * indexElement) - 55;
                                                            if (popup) {
                                                                popup.style.bottom = top/2 < elBottom ? 'initial' : '26px';
                                                                popup.style.top = top/2 < elBottom ? '26px' : 'initial';
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div id="popup-list-time"
                                                     style={{
                                                         border: isOpenTimePickerList ? "1px solid rgb(224, 224, 224)" : "",
                                                         height: !isOpenTimePickerList ? 0 : 125
                                                     }}>
                                                    {this.renderListTime()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="btn-date-picker">
                                            <Button
                                                className="btn-save-datePicker"
                                                id="btn-save-datePicker"
                                                onClick={() => {
                                                    this.saveDatePicker();
                                                    this.setState({isOpenCalendarDatePicker: false});
                                                }}

                                            >Задать</Button>
                                            <Button
                                                className="btn_gray"
                                                onClick={() => {
                                                    document.getElementById(`input-date-picker-value_${this.props.id}`).focus();
                                                    this.setState({isOpenCalendarDatePicker: false});
                                                }}
                                            >Отмена</Button>
                                        </div>
                                    </div> : ''}
                            </div> : ''}
                    </div>
                    {!this.state.isCheckError ? <div className={`input-error ${errorClass}`} style={{top: !label ? 33 : 55, minWidth: '170px'}}>{this.state.textError} </div> :
                        this.props.errorLabel && this.props.checkError ? <div className={`input-error ${errorClass}`} style={{top: 30}}>{this.props.errorLabel}</div> : null}
                </div>
            </div>
        )
    }
}

export default (customDateTimePicker);
