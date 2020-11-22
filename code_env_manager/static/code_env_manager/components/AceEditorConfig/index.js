import React from 'react';

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorInstance extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
    }

    render() {
        return (
                <AceEditor
                        placeholder="Placeholder Text"
                        mode={this.props.mode}
                        theme={this.props.theme}
                        name={this.props.name}
                        onLoad={this.props.onLoad}
                        onChange={this.props.onChange}
                        fontSize={this.props.fontSize}
                        showPrintMargin={this.props.showPrintMargin}
                        showGutter={this.props.showGutter}
                        highlightActiveLine={this.props.highlightActiveLine}
                        value={this.props.value}
                        setOptions={this.props.setOptions}/>
        )
    }
}

