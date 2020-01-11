import React from "react";

export default class TableCell extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <td>
                {this.props.children}
            </td>
        );
    }
}