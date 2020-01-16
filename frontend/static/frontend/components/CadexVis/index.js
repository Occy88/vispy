import React from "react";
import {Slider} from "@material-ui/core";
import './style.scss'
import WidgetHeader from "../../../../../static/components/WidgetHeader";
import WidgetBody from "../../../../../static/components/WidgetBody";
import Button from "../../../../../static/components/Button";

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
                {name: 'Credit Score', original: 500, proposed: 500, minValue: 0, maxValue: 850},
                {name: 'Total Income', original: 20000, proposed: 20000, minValue: 1000, maxValue: 100000},
                {name: 'Loan Amount', original: 10000, proposed: 5000, minValue: 100, maxValue: 100000},
                {name: 'Interest Rate', original: 20, proposed: 24, minValue: 0.1, maxValue: 100},
                {name: 'Debt to Income Ratio', original: 1, proposed: 1, minValue: 0, maxValue: 2},
                {name: 'Total Accounts', original: 20, proposed: 20, minValue: 0, maxValue: 100},
            ]
        };
        this.removeElement = this.removeElement.bind(this)
    }

    removeElement() {
        this.props.removeElement(this.props.elementToEval);
    }

    render() {
        const slider = (key, original, value, max, min, onChange) => {
            return (
                <Slider
                    onChange={(event, value) => onChange(event, value, key)}
                    min={min}
                    max={max}
                    step={(max - min) / 10000}
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

        const button_style = {
            color: "unset",
            border: "1px solid #3e3e3e",
            width: "100%",
            margin: "auto"
        };

        return (
            <div className={'CadexVis'}>
                <WidgetHeader>
                    <h5>Decision Review</h5>
                </WidgetHeader>
                <WidgetBody>
                    {rowTitles}
                    {this.state.data.map((value, index) => {
                        return (
                            <div key={index} className={'row'}>
                                <div className={'name'}>
                                    {value.name}
                                </div>
                                <div className='nonDraggable'>
                                    <div className={'adjust'}>
                                        {slider(index, value.original, value.proposed, value.maxValue, value.minValue, (event, value, key) => {
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
                                    {value.proposed.toFixed(2)}
                                </div>
                                <div className={'change'}
                                     style={{
                                         backgroundColor: 'RGB(' +
                                             (value.proposed / value.original - 1 > 0 ? 255 : 255 - ((value.proposed / value.original - 1) * -255 / ((value.original - value.minValue) / value.original))) + ',' +
                                             (value.proposed / value.original - 1 > 0 ? 255 - ((value.proposed / value.original - 1) * 255 / ((value.maxValue - value.original) / value.original)) : 255 - ((value.proposed / value.original - 1) * -255 / ((value.original - value.minValue) / value.original))) + ',' +
                                             (value.proposed / value.original - 1 > 0 ? 255 - ((value.proposed / value.original - 1) * 255 / ((value.maxValue - value.original) / value.original)) : 255) + ')'
                                     }}>
                                    {value.proposed / value.original - 1 > 0 ? '+' : ''}{Math.round((value.proposed / value.original) * 100).toFixed(2) - 100}%
                                </div>
                            </div>
                        )
                    })}

                </WidgetBody>
                <Button style={button_style} onClick={() => {
                    this.removeElement();
                    this.props.handleRemove()
                }}>Accept</Button>
            </div>
        )
    }
}

export default CadexVis;
