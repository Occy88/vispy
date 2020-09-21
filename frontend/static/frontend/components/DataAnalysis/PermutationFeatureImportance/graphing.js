import * as d3 from "d3";

/**
 * draws a horizontal bar chart on an svg ref given data in the correct format
 * @param svg_ref
 * @param chart_data : format of graph is: [{feature:name, value:value},...]
 * @returns {*}
 */
export default function drawGraphPerm(svg_ref, chart_data, onClick) {
    console.log("DRAWING")
    let data = chart_data
    console.log("chart data: ", chart_data)
    // console.log(svg_ref.children)
    // console.log(this.state.data)
    while (svg_ref.firstChild) {
        svg_ref.removeChild(svg_ref.firstChild)
    }
    let margin = ({top: 30, right: 60, bottom: 10, left: 165})
    let barHeight = 25
    let height = svg_ref.clientHeight
    let width = svg_ref.clientWidth
    console.log(width, height)
    // console.log(svg_ref)
    // console.log(width, height)
    let y = d3.scaleBand()
        .domain(d3.range(data.length))
        .rangeRound([margin.top, height - margin.bottom])
        .padding(0.1)
    let vals = data.map(d => Math.abs(d.value))
    console.log(vals, Math.max(vals))
    let max_val = Math.max(...data.map(d => Math.abs(d.value)))
    console.log(max_val)
    let x = d3.scaleLinear()
        .domain([0, max_val])
        .rangeRound([margin.left, width - margin.right])
        .rangeRound([margin.left, width - margin.right])

    let yAxis = g => g
        .attr("transform", `translate(${0},0)`)
        .call(d3.axisLeft(y).tickFormat(i => data[i].feature).tickSize(0).tickPadding(8))
        .call(g => g.selectAll(".tick text")
            // .filter(i => data[i].value < 0)
            .attr("text-anchor", "start")
            .attr("x", 6))
    let xAxis = g => g
        .attr("transform", `translate(0,${margin.top})`)
        .call(d3.axisTop(x).ticks(width / 80))
        .call(g => g.select(".domain").remove())
    const svg = d3.select(svg_ref)
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%")
        .attr("height", "100%")
        .classed("svg-content-responsive", true)
    svg.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("fill", "rgba(234,234,234,0.3)")
        .attr("x", 0)
        .attr("y", (d, i) => y(i))
        .attr("width", width)
        .attr("height", y.bandwidth())
        .on("click", (d, i) => onClick(i))

    svg.append("g")
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("fill", d => d3.schemeSet1[d.value < 0 ? 1 : 0])
        .attr("x", d => x(Math.min(d.value, 0)))
        .attr("y", (d, i) => y(i))
        .attr("width", d => Math.abs(x(d.value) - x(0)))
        .attr("height", y.bandwidth())
        .on("click", (d, i) => onClick(i))

    svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("text-anchor", d => d.value < 0 ? "end" : "start")
        .attr("x", d => x(d.value) + Math.sign(d.value - 0) * 4)
        .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
        .attr("dy", "0.35")
        .text(d => d.value);

    svg.append("g")
        .call(xAxis)
        .attr("font-size", 15)
    ;


    svg.append("g")
        .call(yAxis)
        .attr("font-size", 15)
        .attr("font-weight", "bold")
    ;
    // console.log(svg)
    let node = svg.node();
    // console.log(node)
    return node;
}