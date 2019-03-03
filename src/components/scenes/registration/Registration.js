/**
 * Created by smalkov on 05.09.2018.
 */

// react - redux
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Button, Modal, Input, Icon} from 'semantic-ui-react'
/*svgIcons*/
import { CloseIcon } from "../../ui/svgIcons/svgIcons"
/*utils*/
import { isAutoFocusMobile } from "../../../utils/utils";
/*css*/
import "./registration.css"
import 'semantic-ui-css/semantic.min.css';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewPassword: false,
            name: '',
            login: '',
            password: ''
        }
    }

    close = () => this.setState({ open: false });

    onChageRegistration(value, type) {
        switch (type) {
            case 'name': {
                this.setState({name: value});
                break;
            }
            case 'email': {
                this.setState({login: value});
                break;
            }

            case 'password': {
                this.setState({password: value});
                break;
            }
        }
    }

    checkValidation(name, login, password) {
        let check = true;
        if (name && password) {
            let array = login.split('@');
            if (array[0] &&  array[1] && array[1].split('.') && array[1].split('.')[0] &&  array[1].split('.')[1])  {
                check = false;
            }
        }
        return check
    }

    render() {
        let { registration, close, dialog, onRegAuth, handleTextFieldKeyDown, isOpenSignWindow, isOpenRegWindow } = this.props;
        let { name, login, password, viewPassword } = this.state
        let isDisabled = this.checkValidation(name, login, password);
        let objReg = {
            name: name,
            login: login,
            password: password,
            type: 'LOGIN_PASSWORD'
        };

        return (
            <Modal
                open={registration.signUp || false}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                onClose={this.close}
                className='registration_auth_panel registration'
            >
                <div>
                    <Modal.Header>
                        <div className="registration-auth_title">{dialog.registrationTitle}</div>
                    </Modal.Header>
                    {registration.signUp === 'reg' &&
                    <Modal.Content>
                        <div className="ui input container focus">
                            <span>{dialog.fio.label}</span>
                            <Input type="text"
                                   value={name}
                                   placeholder={dialog.fio.placeholder}
                                   autoFocus={isAutoFocusMobile()}
                                   onKeyDown={(e) => {handleTextFieldKeyDown(e, 'reg', objReg, isDisabled)}}
                                   onChange={(e) => this.onChageRegistration(e.currentTarget.value, 'name')}
                            />
                        </div>
                        <div className="ui input container">
                            <span>{dialog.email.label}</span>
                            <Input type="text"
                                   value={login}
                                   placeholder={dialog.email.placeholder}
                                   onKeyDown={(e) => {handleTextFieldKeyDown(e, 'reg', objReg, isDisabled)}}
                                   onChange={(e) => this.onChageRegistration(e.currentTarget.value, 'email')}
                            />
                        </div>
                        <div className="ui input container">
                            <span>{dialog.password.label}</span>
                            <Input type={!viewPassword && "password" || "text"}
                                   value={password}
                                   placeholder={dialog.password.placeholder}
                                   onKeyDown={(e) => {handleTextFieldKeyDown(e, 'reg', objReg, isDisabled)}}
                                   onChange={(e) => this.onChageRegistration(e.currentTarget.value, 'password')}
                            />
                            <div className="view_password"
                                 onClick={() => {
                                     this.setState({viewPassword: !viewPassword})
                                 }}>{viewPassword && <Icon name='eye'/> || <Icon name='hide'/>}</div>
                        </div>
                        <div className='registration_text'>
                            <span>{dialog.registrationText.text_1}</span>
                            <span className="link">{dialog.registrationText.link_1}</span>
                            <span>{dialog.registrationText.text_2}</span>
                            <span className="link">{dialog.registrationText.link_2}</span>
                        </div>
                    </Modal.Content>
                    }
                    {registration.signUp === 'success' &&
                    <Modal.Content>
                        <div className="container_registration_success">
                            <div className="container_icon_check">
                                <Icon className="icon_check" name="check"/>
                            </div>
                            <div className="check_window_text">{dialog.successRegistration.title}</div>
                        </div>
                    </Modal.Content>
                    }
                    {registration.signUp === 'error' &&
                    <Modal.Content>
                        <div className="container_registration_warning ">
                            <div>
                                <Icon className="icon_warning" name="warning circle"/>
                            </div>
                            <div className="check_window_text">{registration.text || dialog.errorRegistration}</div>
                        </div>
                    </Modal.Content>
                    }
                    <Modal.Actions>
                        {registration.signUp === 'reg' ?
                            <Button className="btn_standart_style"
                                    disabled={isDisabled}
                                    onClick={() =>{
                                        onRegAuth(objReg, 'reg')}}>{dialog.signUp}
                            </Button>
                            :
                            <Button className="btn_standart_style"
                                    onClick={() => {
                                        this.setState({
                                            name: '',
                                            login: '',
                                            password: ''
                                        });
                                        close();
                                    }}>
                                {dialog.backPortal}
                            </Button>}
                    </Modal.Actions>
                    <div className="close icon" onClick={close}>
                        <CloseIcon/>
                    </div>
                    <div className="yes_sign_in">
                        <div className="yes_sign_in_text">{dialog.text.reg.text_1}</div>
                        <div
                            className="yes_sign_in_link link"
                            onClick={() => {
                                isOpenSignWindow(true);
                                isOpenRegWindow(false);
                            }}
                        >{dialog.text.reg.text_2}</div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default (Registration)