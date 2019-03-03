/**
 * Created by smalkov on 18.10.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Input, Button, Icon, Dropdown } from 'semantic-ui-react'
/*svgIcons*/
import { Add } from "../../ui/svgIcons/svgIcons"
/*custom components*/
import User from "../../ui/user/User"
/*css*/
import "./table.css"
/*utils*/
import {FormateDate} from "../../../utils/utils";

/**
 * Компонент таблица
 */

const trigger = ( <Icon className="edit_outline" name="ellipsis horizontal"/>);

class Table extends React.PureComponent {

    renderContentAdministration (columns, data, translate, optionsMenu, functionList, typeTable, constants, onClick) {
        let headTable = [];
        let bodyTable = [];
        if (columns && Object.keys(columns).length) {
            let keys = Object.keys(columns);
            keys.map((item, index) => {
                let element =
                    <div style={columns[item].style}>{columns[item].label}</div>;
                headTable.push(element);
            })
        }
        switch (typeTable) {
            case 'users': {
                if (data && data.length) {
                    data.map((item, index) => {
                        let status = item.status;
                        let date = FormateDate(item.createTime && new Date(item.createTime) || '');

                        if (status === 'REVIEW') {
                            status = <div>
                                <div className="text_request_reg">{translate.administration.other.requestUser}</div>
                                <div className="btn_accept_declined">
                                    <Button
                                        className="btn_accept btn_standart_style"
                                        onClick={() => {functionList('user', {id: item.id, status: 'ACTIVE'})}}
                                    >{translate.administration.buttons.confirm}</Button>
                                    <div className="link declined"
                                         onClick={() => {functionList('user', {id: item.id, status: 'DECLINED'})}}
                                    >{translate.administration.buttons.reject}</div>
                                </div>
                            </div>
                        } else {
                            status =
                                <div className="administration_status_menu_user" onClick={() => functionList('', {path: '', typeInfo: typeTable, status: '', id: '', isNewEvent: true, element: item})}>
                                    <span>{translate.administration.status[item.status.toLowerCase()]}</span>
                                    {item.status !== 'DELETED' ?
                                        <Dropdown
                                            className="article_menu"
                                            trigger={trigger}
                                            options={optionsMenu('user', item.status)}
                                            pointing='top right'
                                            icon={null}
                                            onChange={(e, select) => {
                                                if (select.value !== 'default') {
                                                    functionList('user', {id: item.id, value: select.value});
                                                }
                                            }}
                                        /> : ''}
                                </div>
                        }
                        let element = (
                            <div className="row">
                                <div className="column user"
                                     style={ Object.values(columns)[0].style}
                                     onClick={() => functionList('', {path: '', typeInfo: typeTable, status: '', id: '', isNewEvent: true, element: item})}
                                >
                                    <User
                                        className="list_user_item"
                                        name={item.name}
                                        rank={item.rank}
                                        avatar_id={item.avatarId}
                                    />
                                </div>
                                <div className="column email" onClick={() => functionList('', {path: '', typeInfo: typeTable, status: '', id: '', isNewEvent: true, element: item})} style={ Object.values(columns)[1].style}></div>
                                <div className="column date" onClick={() => functionList('', typeTable, '', '', true, item)} style={ Object.values(columns)[2].style}>{date}</div>
                                <div className={`column status ${item.status && item.status.toLowerCase()}`} style={Object.values(columns)[3].style}>{status}</div>
                            </div>);
                        bodyTable.push(element);
                    })
                } else {
                    let element = (
                        <div className="table_not_found_data">{translate.administration.notFoundData[typeTable]}</div>);
                    bodyTable.push(element);
                }
                break;
            }
            case 'articles': {
                let dataColor = true;
                if (data && data.length) {
                    data.map((item, index) => {
                         if (index !== 0 && data[index - 1].id !== data[index].id) {
                            dataColor = !dataColor;
                        }
                        let status = '';
                        if (item.status === 'REVIEW') {
                            status = <div>
                                <div className="text_request_reg">{translate.administration.other.request}</div>
                                <div className="btn_accept_declined">
                                    <Button
                                        className="btn_accept btn_standart_style"
                                        onClick={(e) => {
                                            functionList('article', {id: item.id,  versionId: item.versionId});
                                            e.stopPropagation();
                                        }}
                                    >{translate.administration.buttons.confirm}</Button>
                                    <div className="link declined"
                                         onClick={(e) => {
                                                item.status = 'DECLINED';
                                                functionList('article', {id: item.id,  versionId: item.versionId, article: item, status: 'DECLINED'});
                                             e.stopPropagation();
                                         }}
                                    >{translate.administration.buttons.reject}</div>
                                </div>
                            </div>
                        } else {
                            status =
                                <div className="administration_status_menu_user">
                                    <span>{translate.administration.status[item.status.toLowerCase()]}</span>
                                    {item.status !== 'DELETED' ?
                                        <Dropdown
                                            className="article_menu"
                                            trigger={trigger}
                                            options={optionsMenu('article', item.status)}
                                            pointing='top right'
                                            icon={null}
                                            onChange={(e, select) => {
                                                if (select.value !== 'default') {
                                                    item.status = select.value;
                                                    functionList('article', {id: item.id,  versionId: item.versionId, article: item, status: select.value});
                                                }
                                            }}
                                        /> : ''}
                                </div>
                        }
                        let date = FormateDate(item.createTime && new Date(item.createTime) || '');
                        let subject = '';
                        if(constants.subjects.length) {
                            for (let i = 0; i < constants.subjects.length; i++) {
                                if(item.subjectId === constants.subjects[i].id.toString()) {
                                    subject = constants.subjects[i].label
                                }
                            }
                        }
                        let element = (
                            <div className="row" onClick={() => functionList('', {path: `${typeTable}/${item.id}`, typeInfo: typeTable, status: item.status, id: item.id, isNewEvent: false, element: item})} data-color={dataColor && 1 || 2}>
                                <div className="column name_article" style={Object.values(columns)[0].style}>{`${item.label} (${item.language.toUpperCase()})`}</div>
                                <div className="column subject" style={Object.values(columns)[1].style}>{subject}</div>
                                <div className="column date_create_article" style={Object.values(columns)[2].style}>{date}</div>
                                <div className={`column status ${item.status && item.status.toLowerCase()}`} style={Object.values(columns)[3].style}>{status}</div>
                            </div>);
                        bodyTable.push(element);
                    })
                } else {
                    let element = (
                        <div className="table_not_found_data">{translate.administration.notFoundData[typeTable]}</div>);
                    bodyTable.push(element);
                }
                break;
            }
            case 'events': {
                if (data && data.length) {
                    data.map((item, index) => {
                        let dateCreate = FormateDate(item.createTime && new Date(item.createTime) || '');
                        let publishDate = FormateDate(new Date(item.publishDate) || '');
                        let element = (
                            <div className="row" onClick={() => functionList('', {path: '', typeInfo: typeTable, status: '', id: '', isNewEvent: false, element: item})}>
                                <div className="column title_event" style={Object.values(columns)[0].style}>{item.caption}</div>
                                <div className="column date_create_event" style={Object.values(columns)[1].style}>{dateCreate}</div>
                                <div className="column date_publication_event" style={Object.values(columns)[2].style}>{publishDate}</div>
                            </div>);
                        bodyTable.push(element);
                    })
                } else {
                    let element = (
                        <div className="table_not_found_data">{translate.administration.notFoundData[typeTable]}</div>);
                    bodyTable.push(element);
                }
                break;
            }
            default: break;
        }

        return (
            <div className="administration_table_portal">
                <div className="administration_table_head_portal">
                    {headTable}{typeTable === 'events'
                        && <div className="add_icon_event"
                                onClick={() => functionList('',{path: '', typeInfo: typeTable, status: '', id: '', isNewEvent: true, element: ''})}
                ><Add/></div>}
                </div>
                <div className="administration_table_body_portal">{bodyTable}</div>
            </div>
        )
    }


    render() {
        let { className, translate, data, optionsMenu, colums, functionList, typeTable, constants } = this.props;
        let content = this.renderContentAdministration(colums, data, translate, optionsMenu, functionList, typeTable, constants, functionList.onClick);
        return (
            <div id="table" className={className}>
                {content}
            </div>
        );
    }
}
export default (Table)