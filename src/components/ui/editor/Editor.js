/**
 * Created by smalkov on 12.09.2018.
 */

import React from 'react';
/*library*/
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
/*css*/
import "./editor.css"

/**
 * Компонент редактор текста(Возвращает html)
 */

class EditorConvertToHTML extends React.PureComponent {
    constructor(props) {
        super(props);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
        const html = props.htmlText;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    componentWillReceiveProps(newProps) {
        let html = newProps.htmlText;
        if(!html) {
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                this.setState({editorState: editorState});
            }
        }
    }

    onEditorStateChange(editorState) {
         this.setState({editorState});
        this.props.onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())), 'text');
    };

    render() {
        let { localization = 'ru' } = this.props;
        const { editorState } = this.state;

        return (
            <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={(editorState) => {
                    this.onEditorStateChange(editorState);
                }}
                localization={{
                    locale: localization,
                }}
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'history']
                }}
            />
        );
    }
}
export default (EditorConvertToHTML)