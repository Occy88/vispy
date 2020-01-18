import React from "react";
import {ResponsiveHeatMap} from "@nivo/heatmap"
import {ResponsiveBar} from "@nivo/bar";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";

import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";

class DeepLearningVis extends React.Component {

    constructor(props) {
        super(props);
        const timeline_posneg_data = [
            {"minibatch": 0, pos: 0.1, neg: -0.0},
            {"minibatch": 1, pos: 0.3, neg: -0.1},
            {"minibatch": 2, pos: 0.4, neg: -0.2},
            {"minibatch": 3, pos: 0.7, neg: -0.1},
            {"minibatch": 4, pos: 0.2, neg: -0.3},
            {"minibatch": 5, pos: 0.8, neg: -0.4},
            {"minibatch": 6, pos: 0.7, neg: -0.5},
            {"minibatch": 7, pos: 0.4, neg: -0.4},
            {"minibatch": 8, pos: 0.3, neg: -0.2},
            {"minibatch": 9, pos: 0.5, neg: -0.3},
            {"minibatch": 10, pos: 0.6, neg: -0.5},
            {"minibatch": 11, pos: 0.9, neg: -0.4},
            {"minibatch": 12, pos: 0.3, neg: -0.2},
            {"minibatch": 13, pos: 0.4, neg: -0.1},
            {"minibatch": 14, pos: 0.2, neg: -0.1}
        ];

        const timeline_pos_data = [
            {"minibatch": 0, pos: 0.3},
            {"minibatch": 1, pos: 0.1},
            {"minibatch": 2, pos: 0.2},
            {"minibatch": 3, pos: 0.6},
            {"minibatch": 4, pos: 0.8},
            {"minibatch": 5, pos: 0.7},
            {"minibatch": 6, pos: 0.1},
            {"minibatch": 7, pos: 0.0},
            {"minibatch": 8, pos: 0.1},
            {"minibatch": 9, pos: 0.2},
            {"minibatch": 10, pos: 0.5},
            {"minibatch": 11, pos: 0.4},
            {"minibatch": 12, pos: 0.7},
            {"minibatch": 13, pos: 0.5},
            {"minibatch": 14, pos: 0.4}
        ];
        const heatmap_data = [
            {
                row: '0',
                '0': 0.3,
                '1': 0.1,
                '2': 0.4,
                '3': 0.2,
                '4': 0.3,
                '5': 0.1,
                '6': 0.3,
                '7': 0.8,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
            {
                row: '1',
                '0': 0.7,
                '1': 0.1,
                '2': 0.6,
                '3': 0.8,
                '4': 0.5,
                '5': 0.1,
                '6': 0.6,
                '7': 0.1,
                '8': 0.3,
                '9': 0.1,
                '10': 0.3,
                '11': 0.1,
                '12': 0.1,
                '13': 0.2,
                '14': 0.6,
                '15': 0.2
            },
            {
                row: '2',
                '0': 0.2,
                '1': 0.0,
                '2': 0.4,
                '3': 0.9,
                '4': 0.7,
                '5': 0.1,
                '6': 0.2,
                '7': 0.5,
                '8': 0.3,
                '9': 0.1,
                '10': 0.4,
                '11': 0.2,
                '12': 0.3,
                '13': 0.1,
                '14': 0.3,
                '15': 0.8
            },
            {
                row: '3',
                '0': 0.3,
                '1': 0.1,
                '2': 0.5,
                '3': 0.3,
                '4': 0.6,
                '5': 0.1,
                '6': 0.4,
                '7': 0.1,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
            {
                row: '4',
                '0': 0.6,
                '1': 0.3,
                '2': 0.7,
                '3': 0.5,
                '4': 0.7,
                '5': 0.2,
                '6': 0.6,
                '7': 0.5,
                '8': 0.7,
                '9': 0.1,
                '10': 0.6,
                '11': 0.8,
                '12': 0.5,
                '13': 0.1,
                '14': 0.6,
                '15': 0.1
            },
            {
                row: '5',
                '0': 0.9,
                '1': 0.3,
                '2': 0.3,
                '3': 0.7,
                '4': 0.9,
                '5': 0.4,
                '6': 0.7,
                '7': 0.3,
                '8': 0.3,
                '9': 0.1,
                '10': 0.5,
                '11': 0.3,
                '12': 0.6,
                '13': 0.1,
                '14': 0.4,
                '15': 0.1
            },
            {
                row: '6',
                '0': 0.6,
                '1': 0.7,
                '2': 0.3,
                '3': 0.1,
                '4': 0.2,
                '5': 0.2,
                '6': 0.6,
                '7': 0.1,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
            {
                row: '7',
                '0': 0.7,
                '1': 0.3,
                '2': 0.4,
                '3': 0.4,
                '4': 0.6,
                '5': 0.4,
                '6': 0.1,
                '7': 0.3,
                '8': 0.3,
                '9': 0.1,
                '10': 0.4,
                '11': 0.2,
                '12': 0.3,
                '13': 0.1,
                '14': 0.3,
                '15': 0.8
            },
            {
                row: '8',
                '0': 0.3,
                '1': 0.1,
                '2': 0.3,
                '3': 0.1,
                '4': 0.1,
                '5': 0.2,
                '6': 0.6,
                '7': 0.2,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
            {
                row: '9',
                '0': 0.3,
                '1': 0.1,
                '2': 0.4,
                '3': 0.2,
                '4': 0.3,
                '5': 0.1,
                '6': 0.3,
                '7': 0.8,
                '8': 0.3,
                '9': 0.1,
                '10': 0.3,
                '11': 0.1,
                '12': 0.1,
                '13': 0.2,
                '14': 0.6,
                '15': 0.2
            },
            {
                row: '10',
                '0': 0.7,
                '1': 0.1,
                '2': 0.6,
                '3': 0.8,
                '4': 0.5,
                '5': 0.1,
                '6': 0.6,
                '7': 0.1,
                '8': 0.9,
                '9': 0.3,
                '10': 0.3,
                '11': 0.7,
                '12': 0.9,
                '13': 0.4,
                '14': 0.7,
                '15': 0.3
            },
            {
                row: '11',
                '0': 0.2,
                '1': 0.0,
                '2': 0.4,
                '3': 0.9,
                '4': 0.7,
                '5': 0.1,
                '6': 0.2,
                '7': 0.5,
                '8': 0.3,
                '9': 0.1,
                '10': 0.4,
                '11': 0.2,
                '12': 0.3,
                '13': 0.1,
                '14': 0.3,
                '15': 0.8
            },
            {
                row: '12',
                '0': 0.3,
                '1': 0.1,
                '2': 0.5,
                '3': 0.3,
                '4': 0.6,
                '5': 0.1,
                '6': 0.4,
                '7': 0.1,
                '8': 0.3,
                '9': 0.1,
                '10': 0.5,
                '11': 0.3,
                '12': 0.6,
                '13': 0.1,
                '14': 0.4,
                '15': 0.1
            },
            {
                row: '13',
                '0': 0.6,
                '1': 0.3,
                '2': 0.7,
                '3': 0.5,
                '4': 0.7,
                '5': 0.2,
                '6': 0.6,
                '7': 0.5,
                '8': 0.3,
                '9': 0.1,
                '10': 0.3,
                '11': 0.1,
                '12': 0.1,
                '13': 0.2,
                '14': 0.6,
                '15': 0.2
            },
            {
                row: '14',
                '0': 0.9,
                '1': 0.3,
                '2': 0.3,
                '3': 0.7,
                '4': 0.9,
                '5': 0.4,
                '6': 0.7,
                '7': 0.3,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
            {
                row: '15',
                '0': 0.6,
                '1': 0.7,
                '2': 0.3,
                '3': 0.1,
                '4': 0.2,
                '5': 0.2,
                '6': 0.6,
                '7': 0.1,
                '8': 0.7,
                '9': 0.3,
                '10': 0.4,
                '11': 0.4,
                '12': 0.6,
                '13': 0.4,
                '14': 0.1,
                '15': 0.3
            },
        ];
        this.state = {
            heatmap_data: heatmap_data,
            timeline_pos_data: timeline_pos_data,
            timeline_posneg_data: timeline_posneg_data
        }
    };


    render() {
        return (
            <div className={'DeepLearningVis'}>
                <WidgetHeader>
                    <h5>Deep Learning Decision Explanation</h5>
                </WidgetHeader>
                <WidgetBody>
                    <div className="TimelineContainer">
                        <div className="title">
                            Training Progression
                        </div>
                        <GraphContainer>
                            <ResponsiveBar
                                data={this.state.timeline_posneg_data.reverse()}
                                keys={['pos', 'neg']}
                                indexBy="minibatch"
                                groupMode={'grouped'}
                                margin={{top: 10, right: 10, bottom: 30, left: 30}}
                                enableLabel={false}
                            />
                        </GraphContainer>
                    </div>
                    <div className="HeatMapContainer">
                        <div className="title heat-map">
                            Decision Relevance Heat Map
                        </div>
                        <GraphContainer>
                            <ResponsiveHeatMap
                                data={this.state.heatmap_data}
                                keys={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']}
                                margin={{top: 10, right: 10, bottom: 10, left: 10}}
                                indexBy="row"
                                forceSquare={true}
                                colors="reds"
                                axisLeft={null}
                                axisTop={null}
                                enableLabels={false}
                                hoverTarget="cell"
                            />
                        </GraphContainer>
                    </div>
                </WidgetBody>
            </div>
        );
    }
}

export default DeepLearningVis;