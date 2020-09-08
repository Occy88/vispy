import React from "react";
import './style.scss'
import Button from "../../../../../static/components/Button";
import AsWidget from "../../../../../static/components/AsWidget";

/**
 * Button toolbar that handles user adding a widget to the grid
 * @param {function} handleCreateWidget callback used to determine when and which widget to create
 */
export default class DashboardToolbar extends React.Component {
    // Toolbar style
    constructor(props) {
        super(props);

    }

    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        console.log("TOOLBAR RECIEVED THEM", )
    }

    render() {
        return (
            <div className='DashboardToolbar'>
                {
                    this.props.widgets.map((d, index) => {
                        return <Button text={d.text} onClick={() => this.props.handleCreateWidget(index)}/>
                    })
                }
            </div>
        );
    }
}
