import React from "react";
import './style.scss'
import Toolbar from "../../../../../static/remote_components/react_components/components/Toolbar";
import Dashboard from "../../../../../static/remote_components/react_components/components/Dashboard";
import DataAnalysis from "../DataAnalysis";
import Button from "../../../../../static/remote_components/react_components/components/Button";
<<<<<<< HEAD
import CodeDisplay from '../../../../../code_env_manager/static/code_env_manager/components/CodeDisplay'
=======
import Index from '../../../../../code_env_manager/static/code_env_manager/components/CodeStateManager'
>>>>>>> b297e6efba7cd3b835d905a71105e5c2c285f6fd

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
<<<<<<< HEAD
                {component: CodeDisplay, w: 2, h: 3, text: 'Code'}
=======
                {component: Index, w: 2, h: 3, text: 'Code'}
>>>>>>> b297e6efba7cd3b835d905a71105e5c2c285f6fd
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
                    <Dashboard ref={this.dashboard}/>
                </div>
        )
    }

}

export default Home;
