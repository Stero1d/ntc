/**
 * Created by smalkov on 06.09.2018.
 */

/*react - redux*/
import React from "react";
/*css*/
import "./listMenu.css"

/**
 * Компонент список меню с табами(левое меню)
 */

class ListMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    renderList(list, onClick, active, arrayList, disabledCount) {
        let newList = Object.values(list);
        let keys = Object.keys(list);
        if(newList && newList.length) {
            return newList.map((item, index) => {
                return (
                    <div
                        className={active === keys[index] ? "list_item_menu active_menu_tab" : "list_item_menu"}
                        key={`list_item_${item}_${index}`}
                        onClick={() => {onClick(keys[index])}}
                    >{item}
                    {!disabledCount
                        ? <span>{arrayList && Object.values(arrayList[keys[index]]).length && "(" + Object.values(arrayList[keys[index]]).length + ")" || "(0" + ")"}</span>
                            : ''}</div>

                )
            })
        }
    }

    render() {
        let { list, onClick, active, arrayList, disabledCount } = this.props;

        return (
            <div id="list_menu">
                {this.renderList(list, onClick, active, arrayList, disabledCount)}
            </div>
        );
    }
}
export default (ListMenu);