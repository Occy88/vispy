import React from 'react';
import AceEditorInstance from "./AceEditorInstance";
import AceEditorConfig from "./AceEditorConfig";

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceExample extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
        this.state = ({
            config: {
                placeholder: "Placeholder Text",
                mode: "javascript",
                theme: "monokai",
                name: "blah2",
                onLoad: this.onLoad,
                onChange: this.onChange,
                fontSize: 14,
                showPrintMargin: true,
                showGutter: true,
                highlightActiveLine: true,
                value: `function onLoad(editor) {
  console.log("i've loaded");
}`,

                setOptions: {
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }
            }
        })
        console.log('instantiated ace example: ')
        console.log(this.state.config)
    }

    onLoad() {
    }

    onChange() {
    }

    updateConfig(config) {
        console.log("updating config: ")
        console.log(config)
        this.setState({config: {...this.state.config, ...config}})
    }

    render() {
        console.log("EXAMPLE : ")
        console.log(this.state.config)
        return (
            <div className={'example'}>
                <AceEditorConfig config={this.state.config} onChange={(config) => this.updateConfig(config)}/>
                <AceEditorInstance config={this.state.config}/>
            </div>

        )
    }
}

