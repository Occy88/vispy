import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import {ResponsiveLine} from "@nivo/line";
import WidgetHeader from "../WidgetHeader";
import WidgetBody from "../WidgetBody";
import "./style.scss"

class DecisionReviewOverview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
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
            {x: "01/01/2020", y: 3},
            {x: "02/01/2020", y: 1},
            {x: "03/01/2020", y: 2},
            {x: "04/01/2020", y: 6},
            {x: "05/01/2020", y: 8},
            {x: "06/01/2020", y: 7},
            {x: "07/01/2020", y: 1},
            {x: "08/01/2020", y: 0},
            {x: "09/01/2020", y: 1},
            {x: "10/01/2020", y: 2},
            {x: "11/01/2020", y: 5},
            {x: "12/01/2020", y: 4},
            {x: "13/01/2020", y: 7},
            {x: "14/01/2020", y: 5},
            {x: "15/01/2020", y: 4}
        ];

        const error_data = [
            {id: 'something',
            data: timeline_pos_data}
        ];

        // Create the content using the BaseWidget component.
        return (
            <BaseWidget handleRemove={this.props.handleRemove}>
                <WidgetHeader>
                    Decision Review
                </WidgetHeader>
                <WidgetBody>
                    <div className="">
                        Decisions flagged for Review
                    </div>
                    <div className="TimelineContainer">
                        <ResponsiveLine
                            data={error_data}
                            margin={{top: 10, right: 10, bottom: 30, left: 30}}
                            xScale={{
                                type:'time',
                                format:'%d/%m/%Y',
                                precision:'day'
                            }}
                            xFormat="time:%d/%m/%Y"
                            axisBottom={{
                                format: '%b %d',
                                tickValues: 'every day'
                            }}
                        />
                    </div>
                </WidgetBody>
            </BaseWidget>
        );
    }
}

export default DecisionReviewOverview;