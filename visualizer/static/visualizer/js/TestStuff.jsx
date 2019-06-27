import '../css/RegisterDelivery.css'
import React from "react";
import KnnService from "../../../../knn_backend/static/knn_backend/js/KnnService.jsx";
import DrawNetwork from "./DrawNetwork.jsx";

export default class TestStuff extends React.Component {
    constructor(props) {
        super(props);
        this.items = [];
        this.state = {
            nodes: [],
            edges: [],
            node: 0
        };
        this.constructNetwork = this.constructNetwork.bind(this);
        this.updateNetwork = this.updateNetwork.bind(this);
    }

    // handleClick(properties) {
    //     console.log(properties);
    // }
    enterNumber(event) {
        this.setState({
            node: event.target.value
        })
    }

    componentDidMount() {
        this.updateNetwork();
    }

    updateNetwork() {
        console.log("getting data");
        KnnService.getItemsRelations({
            hash: Math.floor(this.state.node),
            API_KEY: 'ti^$0ys%1m0ys%n601$rhk!*q#q1$rhk!6m2#&m0ys%'
        }).then(d => this.constructNetwork(d));
    }

    constructNetwork(data) {
        /**
         * This should be constructed out of set nodes rather than
         * hard coded.
         * nodes come with the following format:
         * {hash:<hash>, label:<label>,data:<data>}
         * Group should be defined by the label
         * Label should probably just be the hash
         * and the id is obviously the hash...
         * @type {*[]}
         */
        console.log("DATA RECIEVED:");
        console.log(data);
        let nodes = [];
        let edges = [];
        // console.log(data);
        for (let dict of data) {
            // console.log(JSON.stringify(dict));
            nodes.push({id: dict.hash, label: dict.hash, group: dict.label});
            for (let n of dict["k_nearest"]) {
                console.log(n);
                nodes.push({id: n.hash, label: n.hash, group: n.label});

                edges.push({from: dict.hash, to: n.hash})
            }
        }

        this.setState({
            nodes: nodes,
            edges: edges
        });
        console.log("constructor Network End");
        // console.log(nodes)

    }

    render() {

        return (
            <div>
                <input type={"number"} onChange={this.enterNumber.bind(this)} value={this.state.node}/>
                <button onClick={this.updateNetwork}>update network</button>
                <DrawNetwork nodes={this.state.nodes} edges={this.state.edges}/>
            </div>


        )
    }
}
