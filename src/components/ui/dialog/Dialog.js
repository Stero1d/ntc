/**
 * Created by smalkov on 12.09.2018.
 */

/*react - redux*/
import React from "react";
/*semantic-ui components*/
import { Button, Modal, Input, Icon} from 'semantic-ui-react'
/*svgIcons*/
import { CloseIcon } from "../../ui/svgIcons/svgIcons"
/*css*/
import "./dialog.css"

/**
 *  Компонент отображения тектового списка с заголовком
 */

class Dialog extends React.PureComponent {

    render() {
        let { title = '', content = '', actions = '', className = '', isOpen, isIconClose, close } = this.props;

        return (
        <Modal
            open={isOpen}
            closeOnEscape={true}
            closeOnDimmerClick={false}
            onClose={close}
            id="dialog_modal_window"
            className={className}
        >
            {title ? <Modal.Header>{title}</Modal.Header> : ''}
            <Modal.Content>
                {content}
            </Modal.Content>
            <Modal.Actions>
                {actions}
            </Modal.Actions>
            {isIconClose
                ?   <div className="close icon" onClick={close}>
                        <CloseIcon/>
                    </div>
                        : ''}
        </Modal>

        );
    }
}

export default (Dialog);


