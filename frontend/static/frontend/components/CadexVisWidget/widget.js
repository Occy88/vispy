import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import WidgetHeader from "../WidgetHeader";
import WidgetBody from "../WidgetBody";
import {Slider} from "@material-ui/core";
import './style.scss'

/**
 * An Example of a simple widget to be used in the grid.
 *
 * Note: To be able to use a widget you must also:
 *  - Add it to the WidgetList in DashboardGrid
 *  - Create a button for it in the DashboardToolbar
 *
 * Any given widget must take the following parameters
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique identity of this widget.
 */
class CadexVis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'sweets', original: 100, proposed: 200},
                {name: 'jail time', original: 20, proposed: 30},
                {name: 'relationship strength', original: 0.4, proposed: 0.2},
                {name: 'life expectancy', original: 100, proposed: 36}
            ]
        }
    }

    render() {
        const slider = (key,original, value, onChange) => {
            return (
                <Slider
                        onChange={(event, value) => onChange(event, value, key)}
                        min={-original * 2}
                        max={original * 4}
                        step={original *4/100}
                        defaultValue={value}/>
            )
        };
        const rowTitles = <div className={'row'}>
            <div className={'name'}>
                Name
            </div>
            <div className={'adjust'}>
                Adjust
            </div>
            <div className={'original'}>
                Original
            </div>
            <div className={'proposed'}>
                Proposed
            </div>
            <div className={'change'}>
                Change
            </div>
        </div>;
        return (
            <BaseWidget handleRemove={this.props.handleRemove}>
                {/* The children contained within the component will be displayed within */}
                <WidgetHeader>
                    Title: {new Date().toDateString()}
                </WidgetHeader>
                <WidgetBody>
                    <div className={'CadexVisWidget'}>
                        {rowTitles}
                        {this.state.data.map((value, index) => {
                            return (
                                <div key={index} className={'row'}>
                                    <div className={'name'}>
                                        {value.name}
                                    </div>
                                    <div className='nonDraggable'>
                                        <div className={'adjust'}>
                                            {slider(index, value.original,value.proposed, (event, value, key) => {
                                                let newData = [...this.state.data];
                                                newData[key].proposed = value;
                                                this.setState({
                                                    data: newData
                                                })
                                            })}
                                        </div>
                                    </div>

                                    <div className={'original'}>
                                        {value.original}
                                    </div>
                                    <div className={'proposed'}>
                                        {value.proposed}
                                    </div>
                                    <div className={'change'}>
                                        {Math.round((value.proposed / value.original) * 1000) / 10 -100}%
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </WidgetBody>
            </BaseWidget>
        )
    }

}

export default CadexVis;
