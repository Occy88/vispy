import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/remote_components/react_components/components/GraphContainer";
import {ResponsiveBar} from "@nivo/bar";
import * as d3 from "d3";
import DataAnalysisService from "../service";
import Button from "../../../../../../static/remote_components/react_components/components/Button";
import ReactResizeDetector from 'react-resize-detector';
import drawGraphShap from './graphing'

class Shapley extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.chart = React.createRef()
    };

    componentDidMount() {
        DataAnalysisService.getShapley(this.props.node).then((d) => {
            drawGraphShap(this.chart.current, d.data.reverse())
            // this.genShapley(d.data.reverse())
            this.setState({
                data: d.data,
                keys: d.keys.reverse()
            })
        })
    }


    render() {
        return (
            <div className={'Shapley'}>
                {/*<Button onClick={this.genShapley} text={"refresh"}/>*/}
                <ReactResizeDetector refreshMode={"throttle"} refreshRate={200}
                                     onResize={() => drawGraphShap(this.chart.current, this.state.data)}/>
                <svg className={'chart'} ref={this.chart}/>

                {/*<GraphContainer>*/}
                {/*    {this.state.data !== null ? <ResponsiveBar*/}
                {/*        data={this.state.data}*/}
                {/*        keys={this.state.keys}*/}
                {/*        minValue="auto"*/}
                {/*        maxValue="auto"*/}
                {/*        // groupMode="stacked"*/}
                {/*        layout="horizontal"*/}
                {/*        reverse={false}*/}
                {/*        colors={{scheme: 'nivo'}}*/}
                {/*        colorBy="id"*/}
                {/*        borderWidth={0}*/}
                {/*        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}*/}
                {/*        axisTop={{tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36}}*/}
                {/*        axisRight={null}*/}
                {/*        axisBottom={{*/}
                {/*            tickSize: 5,*/}
                {/*            tickPadding: 5,*/}
                {/*            tickRotation: 0,*/}
                {/*            legend: 'Contribution to predicted probability',*/}
                {/*            legendPosition: 'middle',*/}
                {/*            legendOffset: 36*/}
                {/*        }}*/}
                {/*        axisLeft={{*/}
                {/*            tickSize: 5,*/}
                {/*            tickPadding: 5,*/}
                {/*            tickRotation: 0,*/}
                {/*            legend: 'features',*/}
                {/*            legendPosition: 'middle',*/}
                {/*            legendOffset: -40*/}
                {/*        }}*/}
                {/*        margin={{top: 30, right: 30, bottom: 50, left: 50}}*/}
                {/*        enableGridX={true}*/}
                {/*        enableGridX={true}*/}
                {/*        enableGridY={false}*/}
                {/*        enableLabel={true}*/}
                {/*        labelSkipWidth={12}*/}
                {/*        labelSkipHeight={12}*/}
                {/*        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}*/}
                {/*        // isInteractive={true}*/}
                {/*        groupMode={'grouped'}*/}
                {/*        indexBy={"feature"}/> : null*/}
                {/*    }*/}
                {/*</GraphContainer>*/}
            </div>
        );
    }
}


export default Shapley;

