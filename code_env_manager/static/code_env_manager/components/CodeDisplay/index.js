import React from 'react'
import AceEditorCustom from '../../../../../static/remote_components/react_components/components/AceEditorCustom'
import FileService from '../FileService'
import FileBrowser from '../FileBrowser'
import './style.scss'
import Toolbar from '../../../../../static/remote_components/react_components/components/Toolbar'

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class CodeDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: `function onLoad(editor) {
  console.log("i've loaded");
}`
        }
    }

    componentDidMount() {
        console.log("COMPONENT MOUNTED GETTING FILE :")
        FileService.getFile({
            'path': '/home/caramel/PycharmProjects/ai_secure',
            'file': 'bots/testing.py'
        }).then((d) => {
            console.log("=======response=========")
            console.log(d)

            this.setState({code: d.file})
        })
    }

    onLoad() {

    }

    onChange(args) {
        console.log("CHANGED: ", args)
        this.setState({
            code: args
        })
        FileService.updateFile({
            'file': 'bots/testing.py',
            'path': '/home/caramel/PycharmProjects/ai_secure',
            'data': args
        }).then((d) => {
            console.log(d)
        })
    }

    render() {
        return (
                <div className={'CodeDisplay'}>
                    <Toolbar component={
                        <FileBrowser/>
                    }/>
                    <AceEditorCustom
                            value={this.state.code}
                            onLoad={this.onLoad.bind(this)}
                            onChange={this.onChange.bind(this)}
                    />
                </div>

        )
    }
}
