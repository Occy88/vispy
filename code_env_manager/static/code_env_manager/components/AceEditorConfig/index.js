import React from 'react';
import ListSelect from "../../../../../static/remote_components/react_components/components/ListSelect";
import Input from "../../../../../static/remote_components/react_components/components/Input";
/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceEditorConfig extends React.Component {
    constructor(props) {
        // super must provide all settings..
        super(props);
        this.mode = [
            {'name': 'python'},
            {'name': 'java'},
            {'name': 'javascript'},
            {'name': 'xml'}
        ]
        this.theme = [
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
        this.name = "default name"

        this.setState()
    }

    render() {
        return (
            <div className={'AceEditorConfig'}>
                <ListSelect
                    object_list={this.mode}
                    str_key={'name'}
                    id_key={'name'}
                    sort_key={'name'}
                    default={this.mode[0]}
                    handleSelect={(val) => this.props.onChange({mode: val.name})}
                />
                <ListSelect
                    object_list={this.theme}
                    str_key={'name'}
                    id_key={'name'}
                    sort_key={'name'}
                    default={this.theme[0]}
                    handleSelect={(val) => this.props.onChange({theme: val.name})}
                />
                <Input
                    value={this.props.config.name}
                    name={'name'}
                    defaultValue={'my code editor'}
                    onChange={(val) => this.props.onChange({'name': val})}
                />
                <Input
                    value={this.props.config.fontSize}
                    name={'font size'}
                    defaultValue={14}
                    onChange={(val) => this.props.onChange({'fontSize': val})}
                />
                <Input
                    value={this.props.config.showPrintMargin}
                    name={'show margin'}
                    type={'checkbox'}
                    defaultValue={true}
                    onChange={(val) => this.props.onChange({'showPrintMargin': val})}
                />
                <Input
                    value={this.props.config.showGutter}
                    name={'showGutter'}
                    defaultValue={true}
                    onChange={(val) => this.props.onChange({'showGutter': val})}
                    type={'checkbox'}

                />
                <Input
                    value={this.props.config.highlightActiveLine}
                    name={'highlightActiveLine'}
                    defaultValue={true}
                    type={'checkbox'}
                    onChange={(val) => this.props.onChange({'highlightActiveLine': val})}
                />

                <Input
                    value={this.props.config.tabSize}
                    name={'tabSize'}
                    defaultValue={2}
                    onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{tabSize: val}}})}

                />
                <Input
                    value={this.props.config.enableBasicAutocompletion}
                    name={'enableBasicAutocompletion'}
                    type={'checkbox'}
                    defaultValue={true}
                    onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableBasicAutocompletion: val}}})}
                />
                <Input
                    value={this.props.config.enableSnippets}
                    name={'enableSnippets'}
                    type={'checkbox'}
                    defaultValue={false}
                    onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableSnippets: val}}})}
                />
                <Input
                    value={this.props.config.showLineNumbers}
                    name={'showLineNumbers'}
                    type={'checkbox'}
                    defaultValue={true}
                    onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{showLineNumbers: val}}})}
                />
                <Input
                    value={this.props.config.enableLiveAutocompletion}
                    name={'enableLiveAutocompletion'}
                    type={'checkbox'}
                    defaultValue={false}
                    onChange={(val) => this.props.onChange({'setOptions': {...this.props.config.setOptions, ...{enableLiveAutocompletion: val}}})}
                />

            </div>
        )
    }
}

