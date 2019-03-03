/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
import {connect} from "react-redux";
/*css*/
import "./listTitleText.css"

/**
 *  Компонент отображения тектового списка с заголовком
 */

class ListTitleText extends React.PureComponent {

    renderText(textList, id) {
        if(textList){
            return textList.map((item, index) => {
                return (
                    <div key={`text_item_${id}_${index}`} className={`text_item_list ${id}`}>
                        <span>{index + 1 + ". "}</span>{item.label}
                    </div>
                )
            })
        }
    }

    render() {
        let { title, textList, id } = this.props;

        return (
            <div className="block_title_text">
                <h3>{title}</h3>
                <div className="text_block">{this.renderText(textList, id)}</div>
            </div>
        );
    }
}

export default (ListTitleText);


