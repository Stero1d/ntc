/**
 * Created by smalkov on 11.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*semantic-ui components*/
import { Input, Button, Icon } from 'semantic-ui-react'
/*css*/
import "./subscription.css"

/**
 * Компонент блок подписки
 */


class Subscription extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        let { onChange } = this.props;
        let value = e.target.value;
        onChange(value);
    }

    render() {
        let { title, btnLabel, className, placeholder,  isFramed, framedClick, value} = this.props;
        return (
            <div className="atricles_subscription" className={className}>
                    <div className="subscription_title">{title}</div>
                    {!isFramed
                    ?   <div className="subscription_email_btn">
                            <div className="subscription_email">
                                <Input
                                    size='small'
                                    placeholder={placeholder}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <Button
                                className="atricles_subscription_btn articles_btn_style"
                                disabled={!value}
                                onClick={() => {framedClick(true)}}>{btnLabel}</Button>
                        </div>
                            : <div className="subscription_framed">
                                <Icon name="check"/>
                                <span>Подписка оформлена</span>
                            </div>}
            </div>
        );
    }
}
export default (Subscription)