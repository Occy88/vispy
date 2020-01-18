import React from "react";
import './style.scss'
import Button from "../../Button";
import CadexVis from "../../../../frontend/static/frontend/components/CadexVis";
import DecisionReviewOverview from "../../../../frontend/static/frontend/components/DecisionReviewOverview";
import DecisionOverview from "../../../../frontend/static/frontend/components/DecisionOverview";
import DeepLearningVis from "../../../../frontend/static/frontend/components/DeepLearningVis";
import Routes from "../../../../frontend/static/frontend/components/Routes";


export default class Toolbar extends React.Component {
    constructor(props) {
        super(props);

        //components to be created according to each button.
        this.componentDicts = [
            {component: CadexVis, w: 5, h: 4, text: 'Transparency'},
            {component: DecisionReviewOverview, w: 5, h: 4, text: 'Auditability'},
            {component: DecisionOverview, w: 5, h: 4, text: 'Safety Monitoring'},
            {component: DeepLearningVis, w: 5, h: 4, text: 'Explainability'},
            {component: Routes, w: 6, h: 4, text: 'Website'},

        ];
    }

    render() {
        return (
            <div className='Toolbar'>
                {
                    this.componentDicts.map((d, index) => {
                        return <Button key={index} text={d.text}
                                       onClick={() => this.props.handleCreate(d.component, null, null, null, d.w, d.h, null)}/>
                    })
                }
            </div>
        );
    }
}
