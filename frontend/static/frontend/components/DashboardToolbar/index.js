import React from "react";
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

    }


    render() {/** Example button to add the ExampleWidget
     *  IMPORTANT: the index of the widget in the WidgetList is passed
     *    as the argument to handleCreateWidget.
     **/
        // console.log(this.state.buttons);
        return (
            <div className='DashboardToolbar'>
                {
                    this.props.widgets.map((d,index) => {
                        console.log(d);
                        let d_=d(null,null);
                        return <Button text={d_.text} onClick={()=>this.props.handleCreateWidget(index)}/>
                    })
                }
            </div>
        );
    }

    // Render the toolbar with the buttons

}

export default DashboardToolbar;
