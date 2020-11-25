import React from 'react'
import AceEditorCustom from '../../../../../static/remote_components/react_components/components/AceEditorCustom'
import FileService from '../FileService'
import './style.scss'
import LoadingIndicator from "../../../../../static/remote_components/react_components/components/LoadingIndicator";
import IdleTimerCustom from "../../../../../static/remote_components/react_components/components/IdleTimerCustom";

/**
 *  Manages state of code between front end and back end
 *  when to reload, save and such (wrapper over an existing front end editor)
 *  manages a single file (so path is required)
 */
export default class CodeStateManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ``,
            file: this.props.file,
            sync: false
        }
        this.push=this.push.bind(this)
    }

    componentDidMount() {
        this.pull()
    }

    pull() {
        this.setState({
            sync: true
        })
        FileService.getFile({
            'path': '/home/caramel/PycharmProjects/ai_secure',
            'file': 'bots/testing.py'
        }).then((d) => {
            console.log("=======response=========")
            console.log(d)

            this.setState({
                sync: false,
                code: d.file
            })
        })
    }

    push() {
        this.setState({
            sync: true
        })
        FileService.updateFile({
            'file': 'bots/testing.py',
            'path': '/home/caramel/PycharmProjects/ai_secure',
            'data': this.state.code
        }).then((d) => {
            console.log(d)
            this.setState({
                sync: false
            })
        })
    }

    onLoad() {
    }

    onChange(args) {
        // console.log("CHANGED: ",args)
        this.setState({
            code: args
        })
        this.state.resetTimer()

    }

    render() {
        return (
            <div ref={node => this.node = node} className={'CodeStateManager'}>
                <LoadingIndicator loading={this.state.sync}/>
                <IdleTimerCustom
                    timeout={1000 * 2}
                    throttle={250}
                    onIdle={this.push}
                    setResetCalback={(func) => {
                        this.setState({resetTimer: func})
                    }}
                /><AceEditorCustom
                value={this.state.code}
                onLoad={this.onLoad.bind(this)}
                onChange={this.onChange.bind(this)}
            />

            </div>

        )
    }
}
