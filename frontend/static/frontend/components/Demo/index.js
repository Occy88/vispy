import React from "react";
import './style.scss'
import Toolbar from "../../../../../static/remote_components/react_components/components/Toolbar";
import Dashboard from "../../../../../static/remote_components/react_components/components/Dashboard";
import DataAnalysis from "../DataAnalysis";
import Button from "../../../../../static/remote_components/react_components/components/Button";
import CodeDisplay from '../../../../../code_env_manager/static/code_env_manager/components/CodeDisplay'

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
                {component: DataAnalysis, w: 10, h: 5, text: 'Feature Analysis'},
                {component: CodeDisplay, w: 4, h: 5, text: 'Code'}

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
                    <Toolbar component={components}/>
                    <Dashboard
                            grid_config={{margin: [10, 10], vertical_compact: true}}
                            ref={this.dashboard}/>
                </div>
        )
    }

}

export default Home;
