import React from "react";
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import "./style.scss"
import GraphContainer from "../../../../../static/components/GraphContainer";
import ListSelect from "../../../../../static/components/ListSelect";
import Button from "../../../../../static/components/Button";

class FeatureSelection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            feature_list: [
                {id: 0, str: 'ex0', sort: 0, features: {n1: 'blonde', n2: 'died'}},
                {id: 1, str: 'ex1', sort: 1, features: {n1: 'brunette', n2: 'survived'}},
                {id: 2, str: 'ex2', sort: 2, features: {n1: 'ginger', n2: 'amputated'}},],
            selected_feature: {id: 0, str: 'ex0', sort: 0, features: {n1: 'blonde', n2: 'died'}}

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
            <div className={'FeatureSelection'}>
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
                            {display_features(this.state.selected_feature)}
                        </div>
                        <Button>
                            Analyse
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


export default FeatureSelection;

/**
 *
 * @param feature: {id: id of feature, }
 */
function display_features(feature) {
    console.log(feature)
    return [
        display_feature('id', feature.id),
        Object.keys(feature.features).map((key, index) => {
            return display_feature(key, feature.features[key])
        })
    ]

}

function display_feature(feature_name, feature_value) {
    return <div key={feature_name} className={'feature'}>
        <h6>{feature_name + " -"} </h6> <p>{feature_value}</p>
    </div>
}
