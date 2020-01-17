import React from "react";
import './style.scss'
import Button from "../../../../../static/components/Button";
import CadexVis from "../CadexVis";
import DecisionReviewOverview from "../DecisionReviewOverview";
import DeepLearningVis from "../DeepLearningVis";
import DecisionOverview from "../DecisionOverview";

/**
 * Button toolbar that handles user adding a widget to the grid
 * @param {function} handleCreateWidget callback used to determine when and which widget to create
 */
export default class DashboardToolbar extends React.Component {
    constructor(props) {
        super(props);
        //components to be created according to each button.
        this.componentDicts = [
            {component: CadexVis, w: 5, h: 4, text: 'Transparency'},
            {component: DecisionReviewOverview, w: 5, h: 4, text: 'Auditability'},
            {component: DecisionOverview, w: 5, h: 4, text: 'Safety Monitoring'},
            {component: DeepLearningVis, w: 5, h: 4, text: 'Explainability'},
        ];
    }

    render() {
        return (
            <div className='DashboardToolbar'>
                {
                    this.componentDicts.map((d, index) => {
                        return <Button text={d.text}
                                       onClick={() => this.props.handleCreate(d.component, null, null, null, d.w, d.h, null)}/>
                    })
                }
            </div>
        );
    }
}
