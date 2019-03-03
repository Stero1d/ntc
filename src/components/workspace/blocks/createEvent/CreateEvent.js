/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
import {convertToRaw} from "draft-js";
/*semantic-ui components*/
import { Dropdown, Input, Button } from 'semantic-ui-react'
/*custom components*/
import CustomDateTimePicker from "../../../ui/dateTimePicker/CustomDateTimePicker";
import PreviewArticle from "../../blocks/previewArticle/PreviewArticle"
import Editor from "../../../ui/editor/Editor"
import Dialog from "../../../ui/dialog/Dialog"
/*utils*/
import {getLang, isAutoFocusMobile} from "../../../../utils/utils";
/*css*/
import "./createEvent.css"
import {fetchData} from "../../../../utils/fetchHelper";
import {API} from "../../../../redux/constant/UIConst";

/**
 *  Компонент создании статьи для публикации
 */

class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
        this.onChageHandle = this.onChageHandle.bind(this);
        this.state = {
            textError: ''
        }
    }

    checkValidation(value, type) {//Проверка на заполненость обязательных полей
        let { checkErrorName, checkErrorSubject, checkErrorAnnotation } = this.state;
        switch (type) {
            case 'name': {
                if(!value) {
                    checkErrorName = true;
                } else {
                    checkErrorName = false;
                }
                break;
            }
            case 'subject': {
                if(!value) {
                    checkErrorSubject = true;
                } else {
                    checkErrorSubject = false;
                }
                break;
            }
            case 'annotation': {
                if(!value) {
                    checkErrorAnnotation = true;
                } else {
                    checkErrorAnnotation = false;
                }
                break;
            }
            default: break;
        }

        this.setState({
            checkErrorName: checkErrorName,
            checkErrorSubject: checkErrorSubject,
            checkErrorAnnotation: checkErrorAnnotation
        });
    }

    onChageHandle(value, field) {
        let { onChangeEvents } = this.props;
        //fetchData(API.ARTICLE.GET_ARTICLE, {id: createArticle.id, language: value}, this.newEditArticle);
        onChangeEvents(value, field);
    }

    render() {
        let { settings, infoEvent, localization, isNewEvent, close, onSaveEvent } = this.props;
        let { textError } = this.state;
        let translate = this.props.translate.createEvent;

        /*let languageDefault = event.language || localization || getLang() || 'en';*/

        return (
            <div id="create_event_block">
              <div className="create_event_head">
                  <h2>{isNewEvent ? translate.title.create.label : translate.title.edit.label}</h2>
                  <div className="horizontal_divider"></div>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="ui input container_nameArticle">
                    <span className="label">{translate.fields.caption.label}<span className="required">*</span></span>
                    <Input
                        type="text"
                        placeholder={translate.fields.caption.placeholder}
                        onChange={(e) => {this.onChageHandle(e.currentTarget.value, 'caption')}}
                        value={infoEvent.caption}
                    />
                </div>
                <div className="ui input container_datePicker">
                    <span className="label">{translate.fields.publishDate.label}<span className="required">*</span></span>
                    <CustomDateTimePicker
                        style={{width: 180}}
                        placeholder="дд.мм.гггг / 00:00"
                        styleInput={{width: 180, border: '1px solid rgba(34,36,38,.15)', height: 38}}
                        value={infoEvent.publishDate || ''}
                        validationDisabled={true}
                        id="publishDate"
                        startYear={2017}
                        name="publishDate"
                        time={true}
                        onChange={(value) => {
                            this.onChageHandle(value, 'publishDate')
                        }}
                    />
                </div>
            </div>
            <div className="ui input container_text_event">
                <span className="label">{translate.fields.text.label}<span className="required">*</span></span>
                <textarea
                    type="text"
                    placeholder={translate.fields.text.label.placeholder}
                    onChange={(e) => {this.onChageHandle(e.currentTarget.value, 'text')}}
                    value={infoEvent.text}
                />
                {/*{checkErrorAnnotation ? <div className="error">{textError}</div> : ''}*/}
            </div>
            <div className="actions_create_event">
                <Button
                    disabled={!infoEvent.text || !infoEvent.caption || !infoEvent.publishDate}
                    className="ui button btn_standart_style"
                    onClick={onSaveEvent}>{translate.fields.actions.save}</Button>
                <Button className="btn_gray" onClick={close}>{translate.fields.actions.cancel}</Button>
            </div>
            </div>
        );
    }
}

export default (CreateEvent);


