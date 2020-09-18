import React from "react";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";
import ListSelect from "../../../../../static/components/ListSelect";
import Button from "../../../../../static/components/Button";
import NodeAnalysis from "./NodeAnalysis";
import uuid from 'uuid'
import Shapley from "./Shapley";
import PermutationFeatureImportance from "./PermutationFeatureImportance";
import Results from "./Results";
import DataAnalysisService from "./service";
import FeatureAnalysis from "./FeatureAnalysis";
import displayNodeAttributes from "./NodeAttributes";

class DataAnalysis extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            node_list: null,
            node: null,
            analysis_list: [
                {id: 0, name: "Results", component: Results},
                {id: 1, name: "Permutation Feature Importance", component: PermutationFeatureImportance},
            ],
            analysis: {id: 0, str: "Feature Contribution", sort: 0, component: Shapley},
        }
        this.analyseNode = this.analyseNode.bind(this);
        this.analyseFeature = this.analyseFeature.bind(this);
    };

    setNode(data) {
        this.setState({
            node: data
        })
    }

    getNode(node_id) {
        for (let n of this.state.node_list) {
            if (n.id === node_id) {
                return n
            }
        }
    }

    analyseNode(data) {
        console.log(data)
        this.analyse(NodeAnalysis, {node: this.getNode(data.id)})
    }

    analyseFeature(data) {
        this.analyse(FeatureAnalysis, {feature: data})
    }

    analyse(component, data) {
        this.props.handleCreate(component, null, null, null, 2, 4, Object.assign(data, {
            handleSelectNode: this.analyseNode,
            handleSelectFeature: this.analyseFeature
        }))
    }

    setAnalysis(val) {
        this.setState(
            {
                analysis: val
            }
        )
    }

    componentDidMount() {
        DataAnalysisService.getNodes().then((d) => {
            this.setState({
                node_list: d.data,
                node: d.data[0]
            })
        })
    }

    render() {
        return (
            <div className={'DataAnalysis'}>
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
                        {displayNodeAttributes(this.state.node)}
                        <Button
                            onClick={() => this.analyseNode(this.state.node)}>
                            Analyse
                        </Button>
                    </div>,
                        <div className={'visualisation'}>
                            <div className={'options'}>
                                <ListSelect handleSelect={this.setAnalysis.bind(this)} filter={false}
                                            object_list={this.state.analysis_list}
                                            str_key={'name'}
                                            sort_key={'id'}
                                            id_key={'id'}
                                />
                            </div>
                            <GraphContainer>
                                {React.createElement(this.state.analysis.component, {
                                    handleSelectFeature: this.analyseFeature,
                                    handleSelectNode: this.analyseNode,
                                })}
                            </GraphContainer>
                        </div>] : "Loading nodes, Please wait."
                    }

                </WidgetBody>
            </div>
        );
    }
}


export default DataAnalysis;
