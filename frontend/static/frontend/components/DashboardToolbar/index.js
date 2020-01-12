import React from "react";
import {Paper} from "@material-ui/core";
import './style.scss'
import Button from "../../../../../static/components/Button";

/**
 * Button toolbar that handles user adding a widget to the grid
 * @param {function} handleCreateWidget callback used to determine when and which widget to create
 */
class DashboardToolbar extends React.Component {
    // Toolbar style
    constructor(props) {
        super(props);
        this.state = {
            buttons: [
                {id: 0, text: 'Example',widget:'the import'},
                {id: 1, text: 'Decision'}
            ]
        }

    }


    render() {/** Example button to add the ExampleWidget
     *  IMPORTANT: the index of the widget in the WidgetList is passed
     *    as the argument to handleCreateWidget.
     **/
        console.log(this.state.buttons);
        return (
            <div className='DashboardToolbar'>
                {
                    this.state.buttons.map(d => {
                        return <Button text={d.text} onClick={()=>this.props.handleCreateWidget(d.id)}/>
                    })
                }
            </div>
        );
    }

    // Render the toolbar with the buttons

}

export default DashboardToolbar;
