import React from "react";
import './style.scss'
import Toolbar from "../../../../../static/components/Toolbar";
import DeepLearningVis from "../DeepLearningVis";
import DecisionOverview from "../DecisionOverview";
import Dashboard from "../../../../../static/components/Dashboard";
import DecisionReviewOverview from "../DecisionReviewOverview";
import CadexVis from "../CadexVis";

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
                {component: DecisionReviewOverview, w: 2, h: 4, text: 'Auditability'},
                {component: DecisionOverview, w: 2, h: 4, text: 'Safety Monitoring'},
                {component: DeepLearningVis, w: 2, h: 4, text: 'Explainability'},
            ]
        };
        this.dashboard = React.createRef()
    }

    generateWidget(w) {
        this.dashboard.current.handleCreate(w.component, null, null, null, w.w, w.h, null)
    }

    componentDidMount() {
        this.pregenWidgets();
        this.dashboard.current.scale(1000);
    }

    pregenWidgets() {
        // component, id, posX, posY, width, height, props
        this.dashboard.current.handleCreateMultiple(
                [
                    {component: DecisionReviewOverview, id: null, posX: 0, posY: 0, width: 2, height: 4, props: null},
                    {component: DeepLearningVis, id: null, posX: 0, posY: 4, width: 2, height: 4, props: null},
                    {component: DecisionOverview, id: null, posX: 2, posY: 0, width: 2, height: 4, props: null}]);

    }

    render() {
        return (
                <div className={'Home'}>
                    <Toolbar onToggle={(time) => {
                        this.dashboard.current.scale(time)
                    }} componentDicts={this.state.dashboardComponents} onClick={this.generateWidget.bind(this)}/>
                    <Dashboard ref={this.dashboard}/>
                </div>
        )
    }

}

export default Home;
