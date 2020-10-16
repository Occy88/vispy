import React from "react";
import WidgetHeader from "../../../../../../static/remote_components/react_components/components/WidgetHeader";
import WidgetBody from "../../../../../../static/remote_components/react_components/components/WidgetBody";
import "./style.scss"
import ListSelect from "../../../../../../static/remote_components/react_components/components/ListSelect";
import DirectionalFeatureContribution from "../DirectionalFeatureContribution";

class FeatureAnalysis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis_list: [
                {name: "Directional Feature Contribution", component: DirectionalFeatureContribution},
            ],
            analysis: {name: "Directional Feature Contribution", component: DirectionalFeatureContribution},

        }
    };

    setAnalysis(val) {
        this.setState(
            {
                analysis: val
            }
        )
    }

    render() {
        return (
            <div className={'FeatureAnalysis'}>
                <WidgetHeader>
                    <h5>Feature Analysis</h5>
                </WidgetHeader>
                <WidgetBody>
                    <div className={'selection'}>
                        <div className={'select_feature'}>
                            <ListSelect handleSelect={this.setAnalysis.bind(this)} filter={false}
                                        object_list={this.state.analysis_list}
                                        str_key={'name'}
                                        sort_key={'name'}
                                        id_key={'name'}
                            />
                        </div>
                    </div>
                    <div className={'visualisation'}>
                        {React.createElement(this.state.analysis.component, {
                            handleSelectNode: this.props.handleSelectNode,
                            feature: this.props.feature
                        })}
                    </div>
                </WidgetBody>
            </div>
        );
    }
}


export default FeatureAnalysis;

