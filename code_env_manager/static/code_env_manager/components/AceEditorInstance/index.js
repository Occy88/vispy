import React from 'react';


var languages = ["javascript", "java", "python", "xml", "ruby", "sass", "markdown", "mysql", "json", "html", "handlebars", "golang", "csharp", "elixir", "typescript", "css"];
var themes = ["monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"];

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorConfig extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
        this.languages = [
            {'name': 'python'},
            {'name': 'java'},
            {'name': 'javascript'},
            {'name': 'xml'}
        ]
        this.modes = [
            {'name': 'monokai'},
            {'name': 'github'},
            {'name': 'tomorrow'},
            {'name': 'kuroir'},
            {'name': 'twilight'},
            {'name': 'xcode'},
            {'name': 'textmate'},
            {'name': 'solarized_dark'},
            {'name': 'solarized_light'},
            {'name': 'terminal'},

        ]
        this.setState()
    }

    render() {
        return (
                <div className={'AceEditorConfig'}>
                    <AceEditor placeholder="Placeholder Text"
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
                               setOptions={this.props.setOptions}
                    />
                    <ListSelect
                            object_list={this.languages}
                            str_key={'name'}
                            id_key={'name'}
                            sort_key={'name'}
                            default={this.languages[0]}
                            onChange={(val) => this.props.onChange({language: val.name})}
                    />
                    <ListSelect
                            object_list={this.modes}
                            str_key={'name'}
                            id_key={'name'}
                            sort_key={'name'}
                            default={this.languages[0]}
                            onChange={(val) => this.props.onChange({language: val.name})}
                    />
                </div>
        )
    }
}

