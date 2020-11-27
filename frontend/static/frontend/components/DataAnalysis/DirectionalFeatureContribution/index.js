import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/remote_components/react_components/components/GraphContainer";
import DataAnalysisService from "../service";
import {ResponsiveScatterPlot} from "@nivo/scatterplot";

class DirectionalFeatureContribution extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feature:this.props.feature
        }
    };

    componentDidMount() {
        DataAnalysisService.getDirectionalFeatureContribution(this.state.feature).then((d) => {
            // let global_step = d.data[10]
            // delete d.data[10]
            this.setState({
                data: d.data,
                // global_step: global_step
            })
        })
    }

    render() {

        return (
            <div className={'DirectionalFeatureContribution'}>
                {/*<h4>Directional Feature Contribution</h4>*/}
                <GraphContainer>
                    {this.state.data ? <ResponsiveScatterPlot
                        data={this.state.data}
                        margin={{top: 60, right: 140, bottom: 70, left: 90}}
                        xScale={{type: 'linear', min: 'auto', max: 'auto'}}
                        xFormat={function (e) {
                            return e
                        }}
                        yScale={{type: 'linear', min: 'auto', max: 'auto'}}
                        yFormat={function (e) {
                            return e + " cm"
                        }}
                        blendMode="multiply"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'value',
                            legendPosition: 'middle',
                            legendOffset: 46
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'contribution',
                            legendPosition: 'middle',
                            legendOffset: -60
                        }}
                        onClick={(data) => this.props.handleSelectNode({id: data.index})}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 130,
                                translateY: 0,
                                itemWidth: 100,
                                itemHeight: 12,
                                itemsSpacing: 5,
                                itemDirection: 'left-to-right',
                                symbolSize: 12,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    /> : null
                    }
                </GraphContainer>
            </div>
        );
    }
}


export default DirectionalFeatureContribution;

