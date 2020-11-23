import React from 'react'
import AceEditorCustom from '../../../../static/remote_components/react_components/components/AceEditorCustom'

/**
 *  Manages an instance of code for editing only
 *  i.e. one file open in provided area
 */
export default class AceExample extends React.Component {
    render() {
        return (
                <AceEditorCustom/>
        )
    }
}
