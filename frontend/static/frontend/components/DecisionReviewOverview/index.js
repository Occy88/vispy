import React from "react";
import WidgetHeader from "../../../../../static/remote_components/react_components/components/WidgetHeader";
import WidgetBody from "../../../../../static/remote_components/react_components/components/WidgetBody";
import GraphContainer from "../../../../../static/remote_components/react_components/components/GraphContainer";
import {Tab, Tabs} from "react-bootstrap";
import "./style.scss"

class DecisionReviewOverview extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        const hourly_timeline_pos_data = [
            {
                    id: 'something',
                    data: [
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
        ]}];

        const daily_timeline_pos_data =
            [
                {
                    id: 'something',
                    data: [
                        {x: "01/01/2020", y: 10},
                        {x: "02/01/2020", y: 11},
                        {x: "03/01/2020", y: 22},
                        {x: "04/01/2020", y: 16},
                        {x: "05/01/2020", y: 28},
                        {x: "06/01/2020", y: 17},
                        {x: "07/01/2020", y: 11},
                        {x: "08/01/2020", y: 7},
                        {x: "09/01/2020", y: 11},
                        {x: "10/01/2020", y: 14},
                        {x: "11/01/2020", y: 18},
                        {x: "12/01/2020", y: 24},
                        {x: "13/01/2020", y: 27},
                        {x: "14/01/2020", y: 22},
                        {x: "15/01/2020", y: 16}
                    ]
                }
            ];

        const weekly_timeline_pos_data =
            [
                {
                    id: 'something',
                    data: [
                        {x: "22/12/2019", y: 67},
                        {x: "29/12/2019", y: 34},
                        {x: "05/01/2020", y: 72},
                        {x: "12/01/2020", y: 93},
                        {x: "19/01/2020", y: 82}
                    ]
                }
            ];

        // Create the content using the BaseWidget component.
        return (
            <div className={'DecisionReviewOverview'}>
                <WidgetHeader>
                    <h5>Decisions Flagged for Review | Timeline</h5>
                </WidgetHeader>
                <WidgetBody className="vertical">
                    <Tabs defaultActiveKey="weekly" transition={false} id="graph-tabs">
                        <Tab eventKey="weekly" title="Per Week">
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
                        <Tab eventKey="daily" title="Per Day">
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
                                        type:'time',
                                        format:'%d/%m/%Y:%H',
                                        precision:'hour'
                                    }}
                                    xFormat="time:%d/%m/%Y"
                                    axisBottom={{
                                        format: '%H:00',
                                        tickValues: 'every hour'
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