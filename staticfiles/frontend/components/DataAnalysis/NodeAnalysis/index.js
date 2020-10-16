import React from "react";
import WidgetHeader from "../../../../../../static/remote_components/react_components/components/WidgetHeader";
import WidgetBody from "../../../../../../static/remote_components/react_components/components/WidgetBody";
import "./style.scss"
import ListSelect from "../../../../../../static/remote_components/react_components/components/ListSelect";
import Shapley from "../Shapley";
import displayNodeAttributes from "../NodeAttributes";

class NodeAnalysis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis_list: [
                {name: "Feature Contribution", component: Shapley},
            ],
            analysis: {name: "Feature Contribution", component: Shapley},

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
            <div className={'NodeAnalysis'}>
                <WidgetHeader>
                    <h5>Node Analysis</h5>
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
                        {displayNodeAttributes(this.props.node)}
                    </div>
                    <div className={'visualisation'}>
                        {React.createElement(this.state.analysis.component, {node: this.props.node})}
                    </div>
                </WidgetBody>
            </div>
        );
    }
}


export default NodeAnalysis;

