import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/remote_components/react_components/components/GraphContainer";
import {ResponsiveBar} from "@nivo/bar";
import DataAnalysisService from "../service";

class PermutationFeatureImportance extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data:null
        }
    };

    componentDidMount() {
        DataAnalysisService.getPermutationFeatureImportance(this.props.node).then((d) => this.setState({data: d.data,keys:d.keys}))
    }

    render() {

        return (
            <div className={'PermutationFeatureImportance'}>
                <GraphContainer>
                    {this.state.data ? <ResponsiveBar
                        data={this.state.data}
                        minValue="0"
                        maxValue="auto"
                        // groupMode="stacked"
                        layout="horizontal"
                        reverse={false}
                        colors={{scheme: 'nivo'}}
                        colorBy="id"
                        borderWidth={0}
                        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        axisTop={{tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36}}
                        axisRight={null}
                        // axisBottom={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'Contribution to predicted probability',
                        //     legendPosition: 'middle',
                        //     legendOffset: 36
                        // }}
                        // axisLeft={{
                        //     tickSize: 5,
                        //     tickPadding: 5,
                        //     tickRotation: 0,
                        //     legend: 'features',
                        //     legendPosition: 'middle',
                        //     legendOffset: -40
                        // }}
                        margin={{top: 30, right: 30, bottom: 50, left: 50}}
                        enableGridX={true}
                        enableGridX={true}
                        enableGridY={false}
                        enableLabel={true}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                        // isInteractive={true}
                        groupMode={'grouped'}
                        indexBy={"feature"}
                        onClick={(data)=>this.props.handleSelectFeature(data.indexValue)}
                    /> : null

                    }
                </GraphContainer>
            </div>
        );
    }
}


export default PermutationFeatureImportance;

