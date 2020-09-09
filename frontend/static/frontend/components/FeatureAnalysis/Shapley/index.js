import React from "react";
import WidgetHeader from "../../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../../static/components/WidgetBody";
import "./style.scss"
import GraphContainer from "../../../../../../static/components/GraphContainer";
import ListSelect from "../../../../../../static/components/ListSelect";
import Button from "../../../../../../static/components/Button";

class Shapley extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            analysis_list: [
                {id: 0, str: "Shapley", sort: 0, Shapley}
            ],
            selected_feature: {id: 0, str: 'ex0', sort: 0, feature_list: {n1: 'blonde', n2: 'died'}}

        }
    };

    setFeature(data) {
        console.log("selected: ", data)
        this.setState({
            selected_feature: data
        })
    }

    render() {
        return (
            <div className={'Shapley'}>
                <WidgetHeader>
                    <h5>Feature Visualisation and Selection</h5>
                </WidgetHeader>
                <WidgetBody>
                    <GraphContainer>
                        <ResponsiveBarCanvas
                            data={data}
                            keys={keys}
                            minValue="auto"
                            maxValue="auto"
                            groupMode="stacked"
                            layout="horizontal"
                            reverse={false}
                            colors={{scheme: 'red_blue'}}
                            colorBy="id"
                            borderWidth={0}
                            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                            axisTop={{tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 36}}
                            axisRight={null}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'country',
                                legendPosition: 'middle',
                                legendOffset: 36
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                legend: 'food',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            enableGridX={true}
                            enableGridY={false}
                            enableLabel={true}
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                            isInteractive={true}
                            indexBy={"probability"}/>


                    </GraphContainer>
                </WidgetBody>
            </div>
        );
    }
}


export default Shapley;

