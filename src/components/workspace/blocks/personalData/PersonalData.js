/**
 * Created by smalkov on 06.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Input, Dropdown, Icon} from 'semantic-ui-react'
/*utils*/
import { DaysOfMonth } from "../../../../utils/utils"
/*utils*/
import { ConvertBase64File, isAutoFocusMobile } from "../../../../utils/utils";
import {fetchData, fetchDataGet} from "../../../../utils/fetchHelper";
/*svgIcons*/
import { UserPhoto } from "../../../ui/svgIcons/svgIcons"
/*constants*/
import { API } from "../../../../redux/constant/UIConst";
/*css*/
import "./personalData.css"

/**
 * Компонент персональных данных пользователя(просмотр, редактирование, сохранение)
 */

class PersonalData extends React.Component {
    constructor(props) {
        super(props);
        this.setDateBirthday = this.setDateBirthday.bind(this);
        this.state = {
            birthday: {
                dayBirthday: '',
                monthBirthday: '',
                yearBirthday: '',
            },
            checkErrorName: false,
            checkErrorRank: false,
            disabledBtn: false
        }
    }

    options() { //Заполняем массивы для даты dropdown
        let { Translate, setup } = this.props;
        let oldDate = new Date(setup.personalData.birthday);
        let month = oldDate && oldDate.getMonth() || new Date().getMonth();
        let year = oldDate && oldDate.getFullYear() || new Date().getFullYear();
        let daysOfMonth = DaysOfMonth(year, month);
        let months = Translate.setup.rightPanel.birthday.month.options;
        let options = {
            number: [],
            month: [],
            year: []
        };
        for (let m = 0; m < months.length; m++) {
            let element = {key: m, text: months[m], value: m};
            options.month.push(element);
        }

        for(let n = 1; n <= daysOfMonth; n++) {
            let element = {key: n, text: n, value: n};
            options.number.push(element);
        }

        for(let y = 1930; y <= new Date().getFullYear(); y++) {
            let element = {key: y, text: y, value: y};
            options.year.push(element);
        }

        return options
    }

    checkValidation(value, type) {
        let { checkErrorName, checkErrorRank, disabledBtn } = this.state;
        if(type === 'name' && !value) {
            checkErrorName = true;
        } else {
            checkErrorName = false;
        }

        if(type === 'rank' && !value) {
            checkErrorRank = true;
        } else {
            checkErrorRank = false;
        }

        if (!value) {
            disabledBtn = true;
        } else {
            disabledBtn = false;
        }

        this.setState({
            checkErrorName: checkErrorName,
            checkErrorRank: checkErrorRank,
            disabledBtn: disabledBtn
        });

    }

    setDateBirthday (value, type) {
        let { birthday } = this.state;
        let { handleChange, setup } = this.props;
        let oldBirthday = setup.personalData.birthday && new Date(setup.personalData.birthday);
        if(oldBirthday) {
            birthday = {
                dayBirthday: oldBirthday && oldBirthday.getDate() || '',
                monthBirthday: oldBirthday && oldBirthday.getMonth() || '',
                yearBirthday: oldBirthday && oldBirthday.getFullYear() || ''
            };
        }

        birthday[type] = value;
        this.setState({birthday: birthday});
        if (birthday.dayBirthday && birthday.monthBirthday &&  birthday.yearBirthday) {
            let maxDayMonth = DaysOfMonth(birthday.yearBirthday, birthday.monthBirthday)
            if(birthday.dayBirthday > maxDayMonth && birthday.yearBirthday) {
                birthday['dayBirthday'] = maxDayMonth;
            }
            this.setState({birthday: birthday});
            let date = new Date( birthday.yearBirthday, birthday.monthBirthday, birthday.dayBirthday);
            handleChange(date, 'birthday', 'personalData')
        }
    }

    setAvatar = (e) => { //Загрузка аватара
        let { handleChange, filePreviewSave } = this.props;
        let file = e.target.files && e.target.files[0] || '';
        if (file) {
            // const urlBlob = window.URL.createObjectURL(e.target.files[0]);
            // handleChange(urlBlob, 'avatarId', 'personalData');
            //uploadFile(API.FILES.FILE_SAVE, e.target.files[0], () => {});
            /*fetchData(API.FILES.FILE_SAVE, urlBlob);*/
            // filePreviewSave(base64File, file);
            handleChange(null, 'avatarId', 'personalData');
            ConvertBase64File(file, (base64File) => {filePreviewSave(base64File, file)});
        }
    };

    getAvatar(userAvatar, newAvatar) {
        let { Translate } = this.props;
        //let avatar =  <Icon name='user circle outline'/>;
        let avatar =
            <div className="not_photo_avatar">
                <UserPhoto/>
                <div>{Translate.setup.rightPanel.avatar.notPhoto}</div>
            </div>;
        if (newAvatar) {
            avatar = <div id="img-preview" style={{background: `url(${newAvatar}) center no-repeat`}}/>;
        } else {
            if (userAvatar) {
                avatar = <div id="img-preview" style={{background: `url(${document.location.origin}/api/file/get?id=${userAvatar}) center no-repeat`}}/>
            }
        }
        return avatar
    }

    render() {
        let { Translate, setup, handleChange, onSave, imagePreview, filePreviewSave } = this.props;
        let { checkErrorName, checkErrorRank, disabledBtn, birthday } = this.state;
        let personalData = setup.personalData;
        let date = personalData.birthday && new Date(personalData.birthday) || '';

        return (
            <div id="main_personal_data">
                <div className="main_personal_data_title">
                    <div className="personal_data_left_panel_title">{Translate.setup.rightPanel.personalData}</div>
                    <div className="horizontal_divider"></div>
                </div>
                <div className="main_personal_data_content">
                    <div className="personal_data_left_panel">
                        <div className="ui input container mobile_avatar">
                            {/*<span>{Translate.setup.rightPanel.avatar.photo}</span>*/}
                            <div className="avatar_container" id="user_avatar_container">
                                {this.getAvatar(personalData.avatarId, imagePreview)}
                            </div>
                            <Button className="avatar_change_btn articles_btn_style"
                                    onClick={() => {
                                        this.avInput.value = '';
                                        this.avInput.click()
                                    }}
                            >{Translate.setup.rightPanel.avatar.download}</Button>
                            {personalData.avatarId || imagePreview ?
                                <Button className="avatar_change_btn btn_gray"
                                        onClick={() => {
                                            handleChange(null, 'avatarId', 'personalData');
                                            filePreviewSave('', '')
                                        }}
                                >{Translate.setup.rightPanel.avatar.delete}</Button> : ''}
                            <input
                                style={{display: 'none'}}
                                type="file"
                                multiple
                                accept="image/*"
                                name="img"
                                ref={(input) => {
                                    this.avInput = input;
                                }}
                                onChange={(e) => {
                                    this.setAvatar(e);}
                                }
                            />
                        </div>
                        <div className="ui input container container_fullName">
                            <span>{Translate.setup.rightPanel.name.label} <span>*</span></span>
                            <Input
                                type="text"
                                autoFocus={isAutoFocusMobile()}
                                value={personalData.name}
                                placeholder={Translate.setup.rightPanel.name.placeholder}
                                onChange={(e, select) => {
                                    this.checkValidation(select.value, 'name');
                                    handleChange(select.value, 'name', 'personalData')}}
                            />
                            {checkErrorName ? <div className="error">{Translate.setup.rightPanel.error.field}</div> : ''}
                        </div>
                        <div className="ui input container container_scienceDegree ">
                            <span>{Translate.setup.rightPanel.rank.label} <span>*</span></span>
                            <Input
                                type="text"
                                placeholder={Translate.setup.rightPanel.rank.placeholder}
                                value={personalData.rank}
                                onChange={(e, select) => {
                                    this.checkValidation(select.value, 'rank');
                                    handleChange(select.value, 'rank', 'personalData')}}
                            />
                            {checkErrorRank ? <div className="error">{Translate.setup.rightPanel.error.field}</div> : ''}
                        </div>
                        <div className="ui input container container_date">
                            <span>{Translate.setup.rightPanel.birthday.label}</span>
                            <div>
                                <div>
                                    <Dropdown
                                        className="dateOfBirth_day"
                                        selection
                                        options={this.options().number}
                                        placeholder={Translate.setup.rightPanel.birthday.number}
                                        value={date && date.getDate() || birthday.dayBirthday}
                                        onChange={(e, select) => {this.setDateBirthday(select.value, 'dayBirthday')}}
                                    />
                                </div>
                                <div>
                                    <Dropdown
                                        className="dateOfBirth_month"
                                        selection
                                        options={this.options().month}
                                        placeholder={Translate.setup.rightPanel.birthday.month.label}
                                        value={date && date.getMonth() || birthday.monthBirthday}
                                        onChange={(e, select) => {this.setDateBirthday(select.value, 'monthBirthday')}}
                                    />
                                </div>
                                <div>
                                    <Dropdown
                                        className="dateOfBirth_year"
                                        selection
                                        options={this.options().year}
                                        placeholder={Translate.setup.rightPanel.birthday.year}
                                        value={date && date.getFullYear() || birthday.yearBirthday}
                                        onChange={(e, select) => {this.setDateBirthday(select.value, 'yearBirthday')}}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="ui input container container_city">
                            <span>{Translate.setup.rightPanel.city.label}</span>
                            <Input
                                type="text"
                                placeholder={Translate.setup.rightPanel.city.placeholder}
                                value={personalData.city}
                                onChange={(e, select) => {handleChange(select.value, 'city', 'personalData')}}
                            />
                        </div>
                        <div className="ui input container container_scientificAchievements">
                            <span>{Translate.setup.rightPanel.achievements.label}</span>
                            <textarea
                                className="achievements"
                                type="text"
                                placeholder={Translate.setup.rightPanel.about.placeholder}
                                value={personalData.achievements}
                                onChange={(e) => {handleChange(e.currentTarget.value, 'achievements', 'personalData')}}
                            />
                        </div>
                        <div className="ui input container container_scientificAchievements">
                            <span>{Translate.setup.rightPanel.about.label}</span>
                            <textarea
                                className="about"
                                type="text"
                                placeholder={Translate.setup.rightPanel.about.placeholder}
                                value={personalData.about}
                                onChange={(e) => {handleChange(e.currentTarget.value, 'about', 'personalData')}}
                            />
                        </div>
                        <Button
                            disabled={!setup.params.edit || disabledBtn}
                            className="ui button save_personal_data_btn btn_standart_style" onClick={onSave}>{Translate.setup.rightPanel.btnSave}</Button>
                    </div>
                    <div className="personal_data_right_panel">
                        <div className="ui input container">
                            {/*<span>{Translate.setup.rightPanel.avatar.photo}</span>*/}
                            <div className="avatar_container" id="user_avatar_container">
                                {this.getAvatar(personalData.avatarId, imagePreview)}
                            </div>
                            <Button className="avatar_change_btn articles_btn_style"
                                    onClick={() => {
                                        this.avInput.value = '';
                                        this.avInput.click()
                                    }}
                            >{Translate.setup.rightPanel.avatar.download}</Button>
                            {personalData.avatarId || imagePreview ?
                                <Button className="avatar_change_btn btn_gray"
                                        onClick={() => {
                                            handleChange(null, 'avatarId', 'personalData');
                                            filePreviewSave('', '')
                                        }}
                                >{Translate.setup.rightPanel.avatar.delete}</Button> : ''}
                            <input
                                style={{display: 'none'}}
                                type="file"
                                multiple
                                accept="image/*"
                                name="img"
                                ref={(input) => {
                                    this.avInput = input;
                                }}
                                onChange={(e) => {
                                    this.setAvatar(e);}
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default (PersonalData)