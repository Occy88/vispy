import React from "react";
import './style.scss'
import Button from "../../../../../static/components/Button";

/**
 * Button toolbar that handles user adding a widget to the grid
 * @param {function} handleCreateWidget callback used to determine when and which widget to create
 */
export default class DashboardToolbar extends React.Component {
    // Toolbar style
    constructor(props) {
        super(props);

    }

    render() {
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
}
