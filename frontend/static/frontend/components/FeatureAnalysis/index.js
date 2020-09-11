import React from "react";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";
import ListSelect from "../../../../../static/components/ListSelect";
import Button from "../../../../../static/components/Button";
import Shapley from "./Shapley";
import PermutationFeatureImportance from "./PermutationFeatureImportance";

class FeatureAnalysis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis_list: [
                { name: "Feature Contribution",  component: Shapley},
            ],
            analysis: {id: 0, str: "Feature Contribution", sort: 0, component: Shapley},

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
                    <h5>Feature Visualisation and Selection</h5>
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
                        {React.createElement(this.state.analysis.component, {node: this.props.node})}
                    </div>
                </WidgetBody>
            </div>
        );
    }
}


export default FeatureAnalysis;

