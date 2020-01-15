import React from "react";
import {ResponsiveLine} from "@nivo/line";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";

import {Tab, Tabs} from "react-bootstrap";
import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";

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

        const hourly_timeline_pos_data = [
            {x: "03/01/2020:07", y: 3},
            {x: "03/01/2020:08", y: 1},
            {x: "03/01/2020:09", y: 2},
            {x: "03/01/2020:10", y: 6},
            {x: "03/01/2020:11", y: 8},
            {x: "03/01/2020:12", y: 7},
            {x: "03/01/2020:13", y: 1},
            {x: "03/01/2020:14", y: 0},
            {x: "03/01/2020:15", y: 1},
            {x: "03/01/2020:16", y: 2},
            {x: "03/01/2020:17", y: 5},
            {x: "03/01/2020:18", y: 4},
            {x: "03/01/2020:19", y: 7},
            {x: "03/01/2020:20", y: 5},
            {x: "03/01/2020:21", y: 4}
        ];

        const daily_timeline_pos_data =
            [
                {
                    id: 'something',
                    data: [
                        {x: "01/01/2020", y: 3},
                        {x: "02/01/2020", y: 1},
                        {x: "03/01/2020", y: 27},
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
                    ]
                }
            ];

        const weekly_timeline_pos_data =
            [
                {
                    id: 'something',
                    data: [
                        {x: "22/12/2019", y: 5},
                        {x: "29/12/2019", y: 4},
                        {x: "05/01/2020", y: 7},
                        {x: "12/01/2020", y: 5},
                        {x: "19/01/2020", y: 4}
                    ]
                }
            ];

        // Create the content using the BaseWidget component.
        return (
            <div className={'DecisionReviewOverview'}>
                <WidgetHeader>
                    Decisions Flagged for Review
                </WidgetHeader>
                <WidgetBody className="vertical">
                    <Tabs defaultActiveKey="weekly" transition={false}>
                        <Tab eventKey="weekly" title="By Week">
                            <GraphContainer>
                                <ResponsiveLine
                                    data={weekly_timeline_pos_data}
                                    margin={{top: 10, right: 20, bottom: 30, left: 30}}
                                    xScale={{
                                        type: 'time',
                                        format: '%d/%m/%Y',
                                        precision: 'day'
                                    }}
                                    xFormat="time:%d/%m/%Y"
                                    axisBottom={{
                                        format: '%b %d',
                                        tickValues: 'every week'
                                    }}
                                />
                            </GraphContainer>
                        </Tab>
                        <Tab eventKey="daily" title="By day">
                            <GraphContainer>
                                <ResponsiveLine
                                    data={daily_timeline_pos_data}
                                    margin={{top: 10, right: 20, bottom: 30, left: 30}}
                                    xScale={{
                                        type: 'time',
                                        format: '%d/%m/%Y',
                                        precision: 'day'
                                    }}
                                    xFormat="time:%d/%m/%Y"
                                    axisBottom={{
                                        format: '%b %d',
                                        tickValues: 'every day'
                                    }}
                                />
                            </GraphContainer>
                        </Tab>
                        <Tab eventKey="hourly" title="Per Hour">
                            <GraphContainer>
                                <ResponsiveLine
                                    data={hourly_timeline_pos_data}
                                    margin={{top: 10, right: 20, bottom: 30, left: 30}}
                                    xScale={{
                                        type: 'time',
                                        format: '%d/%m/%Y',
                                        precision: 'day'
                                    }}
                                    xFormat="time:%d/%m/%Y"
                                    axisBottom={{
                                        format: '%b %d',
                                        tickValues: 'every day'
                                    }}
                                />
                            </GraphContainer>
                        </Tab>
                    </Tabs>
                </WidgetBody>
            </div>
        );
    }
}

export default DecisionReviewOverview;