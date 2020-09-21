import React from "react";
import "./style.scss"
import GraphContainer from "../../../../../../static/remote_components/react_components/components/GraphContainer";
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
        console.log(this.state.data)
        return (
            <div className={'Results'}>

                    {this.state.data ?
                        this.state.data.map((d) => <div className={'results_row'}>
                            <div className={'name'}>{d.feature}</div>
                            <div className={'value'}>{d.value}</div>
                        </div>) : null
                    }
            </div>
        );
    }
}


export default Results;

