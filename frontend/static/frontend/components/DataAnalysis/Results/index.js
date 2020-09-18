import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/components/GraphContainer";
import {ResponsiveBar} from "@nivo/bar";
import DataAnalysisService from "../service";

class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    };

    componentDidMount() {
        DataAnalysisService.getResults(this.props.feature).then((d) => {
            // let global_step = d.data[10]
            // delete d.data[10]
            this.setState({
                data: d.data,
                keys: d.keys,
                // global_step: global_step
            })
        })
    }

    render() {

        return (
            <div className={'Results'}>

                <GraphContainer>
                    {this.state.data ? <ResponsiveBar
                        data={this.state.data}
                        keys={this.state.keys}
                        minValue="0"
                        maxValue="1"
                        // groupMode="stacked"
                        layout="horizontal"
                        reverse={false}
                        colors={{scheme: 'nivo'}}
                        colorBy="id"
                        borderWidth={0}
                        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        axisTop={{tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36}}
                        axisRight={null}
                        axisBottom={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Contribution to predicted probability',
                            legendPosition: 'middle',
                            legendOffset: 36
                        }}
                        axisLeft={{
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'features',
                            legendPosition: 'middle',
                            legendOffset: -120
                        }}
                        margin={{top: 30, right: 30, bottom: 50, left: 150}}
                        enableGridX={true}
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={true}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        // isInteractive={true}
                        groupMode={'grouped'}
                        indexBy={"feature"}/> : null
                    }
                </GraphContainer>
            </div>
        );
    }
}


export default Results;

