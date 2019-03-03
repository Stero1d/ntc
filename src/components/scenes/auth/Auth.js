/**
 * Created by smalkov on 05.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Modal, Input, Icon} from 'semantic-ui-react'
/*svgIcons*/
import { CloseIcon } from "../../ui/svgIcons/svgIcons"
import { isAutoFocusMobile } from "../../../utils/utils";
/*css*/
import "./auth.css"
import 'semantic-ui-css/semantic.min.css';

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewPassword: false,
            login: '',
            password: ''
        }
    }

    onChangeAuth(value, type) {
        this.setState({
            [type]: value
        })
    }

    close = () => this.setState({ open: false });

    render() {
        let { auth, close,  dialog, onRegAuth, handleTextFieldKeyDown, isOpenSignWindow, isOpenRegWindow, language } = this.props;
        let { login, password, viewPassword } = this.state;
        let objAuth = {
            login: login,
            password: password,
            type: 'LOGIN_PASSWORD',
            language: language
        };

        return (
            <Modal
                open={auth.signIn}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                onClose={this.close}
                className='registration_auth_panel auth'
            >
                <div>
                    <Modal.Header>
                        <div className="registration-auth_title">{dialog.authTitle}</div>
                    </Modal.Header>
                    <div className="yes_sign_in_title">{dialog.text.auth.text_1}</div>
                    <Modal.Content>
                        <div className="ui input container">
                            <span>{dialog.email.label}</span>
                            <Input
                                type="text"
                                name="login"
                                value={login}
                                autoFocus={isAutoFocusMobile()}
                                placeholder={dialog.email.placeholder}
                                onKeyDown={(e) => {handleTextFieldKeyDown(e, 'auth', objAuth, !login || !password)}}
                                onChange={(e) => {
                                    this.onChangeAuth(e.currentTarget.value, 'login');
                                }}
                            />
                        </div>
                        <div className="ui input container">
                            <span>{dialog.password.label}</span>
                            <Input
                                type={!viewPassword && "password" || "text"}
                                name="password"
                                value={password}
                                placeholder={dialog.password.placeholder}
                                onKeyDown={(e) => {handleTextFieldKeyDown(e, 'auth', objAuth, !login || !password)}}
                                onChange={(e) => {
                                    this.onChangeAuth(e.currentTarget.value, 'password');
                                }}
                            />
                            <div className="view_password"
                                 onClick={() => {
                                     this.setState({viewPassword: !viewPassword})
                                 }}>{viewPassword && <Icon name='eye'/> || <Icon name='hide'/>}</div>
                            {auth.errorMessage ? <div className="error error_log_in">{auth.errorMessage}</div> : ''}
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            disabled={!login || !password}
                            className="btn_standart_style"
                            onClick={() => {
                                onRegAuth(objAuth, 'auth');
                            }}>{dialog.signIn}</Button>
                    </Modal.Actions>
                    <div className="close icon" onClick={close}>
                        <CloseIcon/>
                    </div>
                    <div className="yes_sign_in">
                        <div className="yes_sign_in_text">{dialog.text.auth.text_2}</div>
                        <div
                            className="yes_sign_in_link link"
                            onClick={() => {
                                isOpenSignWindow(false);
                                isOpenRegWindow('reg');
                            }}
                        >{dialog.text.auth.text_3}</div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default (Auth)