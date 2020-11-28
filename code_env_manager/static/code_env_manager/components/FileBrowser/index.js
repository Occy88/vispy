import React from 'react'
import FileService from '../FileService'
import './style.scss'
import Toolbar from '../../../../../static/remote_components/react_components/components/Toolbar'
import TreeDirectoryViewer
    from '../../../../../static/remote_components/react_components/components/TreeDirectoryViewer'

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class FileBrowser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            directory_tree: {
                id: 'root',
                name: 'Parent',
                children: [
                    {
                        id: '1',
                        name: 'Child - 1',
                    },
                    {
                        id: '3',
                        name: 'Child - 3',
                        children: [
                            {
                                id: '4',
                                name: 'Child - 4',
                            },
                        ],
                    },
                ],
            }
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
            <div className={'FileBrowser'}>
                <TreeDirectoryViewer
                    data={this.state.directory_tree}/>

            </div>

        )
    }
}
