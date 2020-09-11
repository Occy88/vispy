import React from "react";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";
import ListSelect from "../../../../../static/components/ListSelect";
import Button from "../../../../../static/components/Button";
import FeatureAnalysis from "../FeatureAnalysis";
import uuid from 'uuid'
import Shapley from "../FeatureAnalysis/Shapley";
import PermutationFeatureImportance from "../FeatureAnalysis/PermutationFeatureImportance";
import Results from "../FeatureAnalysis/Results";
import DirectionalFeatureContribution from "../FeatureAnalysis/DirectionalFeatureContribution";
import FeatureAnalysisService from "../FeatureAnalysis/service";

class FeatureSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            node_list: null,
            node: null,
            analysis_list: [
                {name: "Results", component: Results},
                {name: "Permutation Feature Importance", component: PermutationFeatureImportance},
            ],
            analysis: {id: 0, str: "Feature Contribution", sort: 0, component: Shapley},
        }
        this.setFeature = this.setFeature.bind(this)
        this.setNode = this.setNode.bind(this)

    };

    setNode(data) {
        console.log("selected: ", data)
        this.setState({
            node: data
        })
    }

    setFeature(data) {
        console.log("selected: ", data)
        this.props.handleCreate(DirectionalFeatureContribution, null, null, null, 2, 4, {feature: data})
    }

    setAnalysis(val) {
        this.setState(
            {
                analysis: val
            }
        )
    }

    componentDidMount() {
        FeatureAnalysisService.getNodes().then((d) => {
            console.log(d.data)
            console.log(d.data[0])
            this.setState({
                node_list: d.data,
                node: d.data[0]
            })
        })
    }

    render() {
        return (
            <div className={'FeatureSelection'}>
                <WidgetHeader>
                    <h5>Feature Visualisation and Selection</h5>
                </WidgetHeader>
                <WidgetBody>
                    {this.state.node_list !== null ? [<div className={'selection'}>
                        <div className={'select_node'}>
                            <ListSelect handleSelect={this.setNode.bind(this)} filter={true}
                                        object_list={this.state.node_list}
                                        str_key={'id'}
                                        sort_key={'id'}
                                        id_key={'id'}
                                        reverse={true}
                            />
                        </div>

                        <div className={'features'}>
                            {display_node_attributes(this.state.node)}
                        </div>
                        <Button
                            onClick={() => this.props.handleCreate(FeatureAnalysis, uuid(), null, null, 2, 3, {node: this.state.node})}>
                            Analyse
                        </Button>
                    </div>,
                        <div className={'visualisation'}>
                            <div className={'options'}>
                                <ListSelect handleSelect={this.setAnalysis.bind(this)} filter={false}
                                            object_list={this.state.analysis_list}
                                            str_key={'name'}
                                            sort_key={'name'}
                                            id_key={'name'}
                                />
                            </div>
                            <GraphContainer>
                                {React.createElement(this.state.analysis.component, {
                                    handleSelectFeature: this.setFeature,
                                    feature: this.state.feature,
                                    node: this.state.node,
                                    setNode: this.setNode,
                                })}
                            </GraphContainer>
                        </div>] : "Loading nodes, Please wait."
                    }

                </WidgetBody>
            </div>
        );
    }
}


export default FeatureSelection;

/**
 *
 * @param feature: {id: id of feature, }
 */
function display_node_attributes(feature) {
    console.log(feature)
    return [
        Object.keys(feature).map((key, index) => {
            return display_attribute(key, feature[key])
        })
    ]

}

function display_attribute(feature_name, feature_value) {
    return <div key={feature_name} className={'feature'}>
        <h6>{feature_name + " -"} </h6> <p>{feature_value}</p>
    </div>
}
