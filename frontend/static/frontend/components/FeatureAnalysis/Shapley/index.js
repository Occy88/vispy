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
                {id:0,str:"Shapley",sort:0,Shapley}
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
                    <div className={'selection'}>
                        <div className={'select_feature'}>
                            <ListSelect handleSelect={this.setFeature.bind(this)} filter={true}
                                        object_list={this.state.feature_list}/>
                        </div>

                        <div className={'features'}>
                        </div>
                        <Button>
                        HI
                        </Button>
                    </div>
                    <div className={'visualisation'}>
                        <div className={'options'}>
                            Some map function to return a list of options for graph
                        </div>
                        <GraphContainer>
                            THE GRAPH
                        </GraphContainer>
                    </div>
                </WidgetBody>
            </div>
        );
    }
}


export default Shapley;

