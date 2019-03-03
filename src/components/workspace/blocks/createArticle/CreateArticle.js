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
import PreviewArticle from "../../blocks/previewArticle/PreviewArticle"
import Editor from "../../../ui/editor/Editor"
import Dialog from "../../../ui/dialog/Dialog"
/*utils*/
import {getLang, isAutoFocusMobile} from "../../../../utils/utils";
/*css*/
import "./createArticle.css"
import {fetchData} from "../../../../utils/fetchHelper";
import {API} from "../../../../redux/constant/UIConst";

/**
 *  Компонент создании статьи для публикации
 */

class CreateArticle extends React.Component {
    constructor(props) {
        super(props);
        this.onChageHandle = this.onChageHandle.bind(this);
        this.newEditArticle = this.newEditArticle.bind(this);
        this.state = {
            checkErrorName: false,
            checkErrorSubject: false,
            checkErrorAnnotation: false
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

    onChageHandle(value, type) {
        let { onChange, createArticle } = this.props;
        //fetchData(API.ARTICLE.GET_ARTICLE, {id: createArticle.id, language: value}, this.newEditArticle);
        onChange(value, type);
        this.setState({
            checkErrorName: false,
            checkErrorSubject: false,
            checkErrorAnnotation: false
        });
    }

    newEditArticle(data) { //Получение другой статьи после получения
        let { editArticle } = this.props;
        editArticle(data);
    }

    getImage(imageId, newImagePreview) { //Отображение превью изображения статьи
        let imagePreview = '';
        if (newImagePreview) {
            imagePreview = <div className="preview_article_img"
                                style={{
                                    background: `url(${newImagePreview}) center no-repeat`}}></div>;
        } else {
            if (imageId) {
                imagePreview =
                    <div
                        className="preview_article_img"
                        style={{background: `url(${document.location.origin}/api/file/get?id=${imageId}) center no-repeat`}}>
                    </div>;
            }
        }
        return imagePreview
    }

    render() {
        let { onChange, htmlText, onChangeFullScreenPreviewEditor, isFullScreenEditor, localization, params, language,
            preview, onSave, subjects, previewArticle, createArticle, textError, isEdit, imagePreview, setImage } = this.props;
        let { checkErrorName, checkErrorSubject, checkErrorAnnotation } = this.state;
        let translate = this.props.translate.articlePublishing.createArticle;

        let languageDefault = createArticle.language || localization || getLang() || 'en';

        return (
            <div id="create_article_block">
                <div className="create_article_head">
                    <h2>{!isEdit ? translate.title.create.label : translate.title.edit.label}</h2>
                    <Button
                        className="btn_gray"
                        onClick={() => {onChangeFullScreenPreviewEditor('isFullScreenEditor', true)}}>{translate.fullScreen}</Button>
                </div>
                <div className="block_create_article">
                    <div className="block_create_article_left">
                        <div className="block_add_image_file_mobile">
                            {(imagePreview || createArticle.imageId)
                            && this.getImage(createArticle.imageId, imagePreview)}
                            <div className="block_text_image">
                                <input
                                    style={{display: 'none'}}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    name="img"
                                    ref={(input) => {
                                        this.avInput = input;
                                    }}
                                    onChange={(e) => {setImage(e)}}
                                />
                                <Button
                                    className=""
                                    onClick={() => {
                                        this.avInput.value = '';
                                        this.avInput.click()
                                    }}>{(imagePreview || createArticle.imageId) && translate.fields.changeFile || translate.fields.upLoadFile}</Button>
                                {(createArticle.imageId || imagePreview) ?
                                    <Button className="delete_img btn_gray"
                                            onClick={(e) => {
                                                setImage(e, true)
                                            }}
                                    >{translate.fields.deleteFile}</Button> :
                                    <div className="upload_image_text">{translate.fields.textFile}</div>
                                }
                            </div>
                        </div>
                        <div className="container_nameArticle_language">
                            <div className="ui input container_nameArticle">
                                <span className="label">{translate.fields.nameArticle.label}<span className="required">*</span></span>
                                <Input
                                    type="text"
                                    autoFocus={isAutoFocusMobile()}
                                    onBlur={() =>{this.checkValidation(createArticle.label, 'name');}}
                                    placeholder={translate.fields.nameArticle.placeholder}
                                    onChange={(e) => {
                                        if (e.currentTarget.value.length < 256) {
                                            this.onChageHandle(e.currentTarget.value, 'label')}}
                                        }
                                    value={createArticle.label}
                                />
                                {checkErrorName ? <div className="error">{textError}</div> : ''}
                            </div>
                            <div className="ui input container_language">
                                <Dropdown
                                    selection
                                    wrapSelection={false}
                                    options={language}
                                    value={languageDefault.toLowerCase()}
                                    onChange={(e, select) => {this.onChageHandle(select.value, 'language')}}
                                />
                            </div>
                        </div>
                        <div className="ui input container_direction">
                            <span className="label">{translate.fields.subject.label}<span className="required">*</span></span>
                            <div className="article_create_direction">
                                <Dropdown
                                    className="direction"
                                    selection
                                    value={createArticle.subjectId}
                                    options={subjects}
                                    onBlur={() =>{this.checkValidation(createArticle.subjectId, 'subject');}}
                                    placeholder={translate.fields.subject.placeholder}
                                    onChange={(e, select) => {this.onChageHandle(select.value, 'subjectId')}}
                                />
                                {checkErrorSubject ? <div className="error">{textError}</div> : ''}
                            </div>
                        </div>
                    </div>
                    <div className="block_create_article_right">
                        {(imagePreview || createArticle.imageId)
                            && this.getImage(createArticle.imageId, imagePreview)}
                           <input
                                style={{display: 'none'}}
                                type="file"
                                multiple
                                accept="image/*"
                                name="img"
                                ref={(input) => {
                                    this.avInput = input;
                                }}
                                onChange={(e) => {setImage(e)}}
                            />
                            <Button
                                className=""
                                onClick={() => {
                                    this.avInput.value = '';
                                    this.avInput.click()
                                }}>{(imagePreview || createArticle.imageId) && translate.fields.changeFile || translate.fields.upLoadFile}</Button>
                        {createArticle.imageId || imagePreview ?
                            <Button className="delete_img btn_gray"
                                    onClick={(e) => {
                                        setImage(e, true)
                                    }}
                            >{translate.fields.deleteFile}</Button> :
                            <div className="upload_image_text">{translate.fields.textFile}</div>
                        }
                    </div>
                </div>
                <div className="ui input container_annotation">
                    <span className="label">{translate.fields.annotation.label}<span className="required">*</span></span>
                    <textarea
                        type="text"
                        placeholder={translate.fields.annotation.placeholder}
                        onBlur={() =>{this.checkValidation(createArticle.annotation, 'annotation');}}
                        onChange={(e) => {this.onChageHandle(e.currentTarget.value, 'annotation')}}
                        value={createArticle.annotation}
                    />
                    {checkErrorAnnotation ? <div className="error">{textError}</div> : ''}
                </div>
                <div className={isFullScreenEditor ? "isFullScreenEditor" : ''}>
                    {!isFullScreenEditor && <span className="label">{translate.fields.textArticle.label}</span>
                        ||
                        <div className="collapse">
                            <Button
                                onClick={() => onChangeFullScreenPreviewEditor('isFullScreenEditor',false)}
                            >{translate.collapse}</Button>
                        </div> }
                    {params.edit || params.create ?
                    <Editor
                        localization={localization}
                        onChange={(value, type) => {this.onChageHandle(value, type)}}
                        htmlText={htmlText}
                        isFullScreenEditor={isFullScreenEditor}
                    /> : ''}
                    <Dialog
                        isOpen={preview}
                        className="preview_article_dialog"
                        isIconClose={false}
                        content={
                            <div>
                                <div className="close_dialog_editor_window">
                                    <Button
                                        onClick={() => onChangeFullScreenPreviewEditor('preview', false)}
                                    >{translate.fields.actions.closePreview}</Button>
                                </div>
                                <PreviewArticle
                                    infoArticle={previewArticle}
                                    imagePreview={imagePreview}
                                />
                            </div>}
                    />
                </div>
                <div className="ui input container_nameArticle">
                    <span className="label">{translate.fields.keyWords.label}</span>
                    <Input
                        type="text"
                        placeholder={translate.fields.keyWords.placeholder}
                        onChange={(e) => {this.onChageHandle(e.currentTarget.value, 'keyWords')}}
                        value={createArticle.keyWords}
                    />
                </div>
                <div className="ui input container_actions_create_article">
                    <div>
                    </div>
                    < div className='actions_create_article'>
                        <Button
                            className="btn_gray"
                            onClick={() => onChangeFullScreenPreviewEditor('preview', true)}>{translate.fields.actions.preview}</Button>
                        <div>
                           {/* <Button
                                className="articles_btn_style  cancel"
                                onClick={() => {}}
                            >{translate.fields.actions.cancel}</Button>*/}
                            <Button
                                className="link save_as_draft"
                                onClick={() => {onSave(createArticle, 'saveAs')}}
                                disabled={!createArticle.label || !createArticle.annotation || !createArticle.subjectId}
                            >{translate.saveAs}</Button>
                            <Button
                                className="articles_btn_style btn_standart_style send"
                                onClick={() => {onSave(createArticle, 'isCheck')}}
                                disabled={!createArticle.label || !createArticle.annotation || !createArticle.subjectId}
                            >{translate.fields.actions.submit}</Button>
                        </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default (CreateArticle);


