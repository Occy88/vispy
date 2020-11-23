import React from "react";
import './style.scss'
import Toolbar from "../../../../../static/remote_components/react_components/components/Toolbar";
import Dashboard from "../../../../../static/remote_components/react_components/components/Dashboard";
import DataAnalysis from "../DataAnalysis";
import Button from "../../../../../static/remote_components/react_components/components/Button";
import AceExample from '../../../../../code_env_manager/static/code_env_manager/components/AceExample.js'

/**
 * An Example of a simple widget to be used in the grid.
 *
 * Note: To be able to use a widget you must also:
 *  - Add it to the WidgetList in DashboardGrid
 *  - Create a button for it in the Toolbar
 *
 * Any given widget must take the following parameters
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique identity of this widget.
 */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboardComponents: [
                {component: DataAnalysis, w: 2, h: 3, text: 'Feature Analysis'},
                {component: AceExample, w: 2, h: 3, text: 'Code'}
            ]
        };
        this.dashboard = React.createRef()
    }

    generateWidget(w) {
        this.dashboard.current.handleCreate(w.component, null, null, null, w.w, w.h, null)
    }

    componentDidMount() {
        this.pregenWidgets();
        this.dashboard.current.scale()
    }

    pregenWidgets() {

        // component, id, posX, posY, width, height, props

    }

    render() {
        let components = this.state.dashboardComponents.map((d, index) => {
            return <Button key={index} text={d.text}
                           onClick={() => this.generateWidget(d)}/>

        })

        return (
                <div className={'Home'}>
                    <Toolbar onToggle={(time) => {
                        this.dashboard.current.scale(time)
                    }} component={components}/>
                    <Dashboard ref={this.dashboard}/>
                </div>
        )
    }

}

export default Home;
