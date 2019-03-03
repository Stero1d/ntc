/**
 * Created by smalkov on 04.09.2018.
 */

/* react - redux */
import React from "react";
import {connect} from "react-redux";
/*custom components*/
import ListMenu from "../../blocks/listMenu/ListMenu"
/*css*/
import "./about.css"
/*utils*/
import { fetchData } from "../../../../utils/fetchHelper";
import {TranslateInterface} from "../../../../utils/translate/Translate";
/*constants*/
import { API } from "../../../../redux/constant/UIConst";

/**
 * Компонент страницы "О Нас"
 */

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderAboutInformation(info) {
        if (info) {
            let title = info.title;
            let text = info.content;
            let content = [];
            text.map((item, index) => {
                switch (Object.keys(item)[0]) {
                    case 'p': {
                        let className = item.p.className;
                        content.push(
                            <p className={className} key={`${Object.keys(item)[0]}_${index}`}>{item.p.text}</p>
                        )
                        break;
                    }
                    case 'br': {
                        content.push(
                            <span key={`${Object.keys(item)[0]}_${index}`}>{item.br}<br/></span>
                        )
                        break;
                    }
                    case 'ol': {
                        let listOl = item.ol;
                        let newList = [];
                        listOl.map((element, index) => {
                            newList.push(
                                <li key={`${Object.keys(item)[0]}_${index}`}>{element}</li>
                            )
                        });
                        content.push(
                            <ol key={`ol_${index}`}>{newList}</ol>
                        );
                        break;
                    }
                    case 'ul': {
                        let listUl = item.ul;
                        let newList = [];
                        listUl.map((element, index) => {
                            newList.push(
                                <li key={`${Object.keys(item)[0]}_${index}`}>{element}</li>
                            )
                        });
                        content.push(
                            <ul key={`ul_${index}`}>{newList}</ul>
                        );
                        break;
                    }
                    default: break;
                }
            });

            return (
                <div>
                    <h2 className="about_title">{title && title.toUpperCase()}</h2>
                    <div className="horizontal_divider"></div>
                    <div className="about_data">{content}</div>
                </div>
            )
        }
    }

    render() {
        let { settings, about, switchMenuTab } = this.props;
        let Translate = TranslateInterface(settings.language || 'ru');
        let content = this.renderAboutInformation(Translate.about.information.content[about.tabLeftAbout]);

        return (
            <div id="about_page">
                <div className="slider_menu_tab_mobile">
                    <div>
                        <ListMenu
                            list={Translate.about.tabs}
                            onClick={(tabMenu) => switchMenuTab(tabMenu)}
                            active={about.tabLeftAbout}
                            disabledCount={true}
                        />
                    </div>
                </div>
                <div className="about_content">
                    {content}
                </div>
        </div>
        );
    }
}

export default
connect(
    state => ({
        user: state.user,
        about: state.about,
        settings: state.settings
    }),
    dispatch => ({
        switchMenuTab: (tabMenu) => {
            dispatch({
                type: "SWITCH_ABOUT_MENU_TAB",
                payload: {
                    tabMenu: tabMenu
                }
            })
        }
    })
)
(About);