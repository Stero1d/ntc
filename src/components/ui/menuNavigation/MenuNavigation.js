/**
 * Created by smalkov on 05.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Dropdown } from 'semantic-ui-react'
/*css*/
import "./menuNavigation.css"
import 'semantic-ui-css/semantic.min.css';
/*custom-components*/

/**
 * Компонент рендеринга навигации кнопок
 */


class MenuNavigation extends React.PureComponent {

    renderMenuButtons(buttons, activeButton, page, user) {//Отрисовка кнопок меню
        if(buttons && buttons.length) {
            return buttons.map((item, index) => {
                if(!Object.keys(user).length && (item.name === 'my_publications' || item.name === 'library')) {
                    return ''
                } else {
                    return (
                        <div className={item.name === page ? `menu_button_${index} button-menu active-menu-button` : `menu_button_${index} button-menu`}
                             key={`menu_button_${index}`}
                             onClick={() => {
                                 this.props.onClick(item.name);
                             }}
                        >{item.label}</div>
                    )
                }
            })
        }
    }

    render() {
        let { buttons, className, activeButton = 0, page, user, exit, exitName } = this.props;

        return (
            <div id="menu-navigation" className={className}>
                {this.renderMenuButtons(buttons, activeButton, page, user)}
                { exit && <div className="button-menu mobile_menu_exit_user" onClick={exit}>{exitName}</div>}
            </div>
        );
    }
}
export default (MenuNavigation)