import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/components/GraphContainer";
import {ResponsiveBar} from "@nivo/bar";
import * as d3 from "d3";
import DataAnalysisService from "../service";
import Button from "../../../../../../static/components/Button";
import ReactResizeDetector from 'react-resize-detector';


class Shapley extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
        this.chart = React.createRef()
        this.genShapley = this.genShapley.bind(this)
    };

    componentDidMount() {
        DataAnalysisService.getShapley(this.props.node).then((d) => {
            this.genShapley(d.data)
            this.setState({
                data: d.data,
                keys: d.keys
            })
        })
    }


    genShapley(chart_data) {
        let data = this.state.data === null ? chart_data : this.state.data
        // console.log(this.chart.current.children)
        // console.log(this.state.data)
        while (this.chart.current.firstChild) {
            this.chart.current.removeChild(this.chart.current.firstChild)
        }
        let margin = ({top: 30, right: 60, bottom: 10, left: 60})
        let barHeight = 25
        let height = this.chart.current.clientHeight
        let width = this.chart.current.clientWidth
        // console.log(this.chart.current)
        // console.log(width, height)
        let y = d3.scaleBand()
            .domain(d3.range(data.length))
            .rangeRound([margin.top, height - margin.bottom])
            .padding(0.1)
        let x = d3.scaleLinear()
            .domain(d3.extent(data, d => d.value))
            .rangeRound([margin.left, width - margin.right])
        let yAxis = g => g
            .attr("transform", `translate(${x(0)},0)`)
            .call(d3.axisLeft(y).tickFormat(i => data[i].feature).tickSize(0).tickPadding(6))
            .call(g => g.selectAll(".tick text").filter(i => data[i].value < 0)
                .attr("text-anchor", "start")
                .attr("x", 6))
        let xAxis = g => g
            .attr("transform", `translate(0,${margin.top})`)
            .call(d3.axisTop(x).ticks(width / 80))
            .call(g => g.select(".domain").remove())
        const svg = d3.select(this.chart.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", "100%")
            .attr("height", "100%")
            .classed("svg-content-responsive", true)

        svg.append("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("fill", d => d3.schemeSet1[d.value > 0 ? 1 : 0])
            .attr("x", d => x(Math.min(d.value, 0)))
            .attr("y", (d, i) => y(i))
            .attr("width", d => Math.abs(x(d.value) - x(0)))
            .attr("height", y.bandwidth());

        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .selectAll("text")
            .data(data)
            .join("text")
            .attr("text-anchor", d => d.value < 0 ? "end" : "start")
            .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
            .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
            .attr("dy", "0.35")
            .text(d => d.value);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);
        // console.log(svg)
        let node = svg.node();
        // console.log(node)
        return node;
    }


    render() {
        return (
            <div className={'Shapley'}>
                <Button onClick={this.genShapley} text={"refresh"}/>
                <ReactResizeDetector refreshMode={"throttle"} refreshRate={200} onResize={() => this.genShapley()}/>
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

