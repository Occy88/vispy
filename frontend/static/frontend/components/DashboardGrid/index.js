import React from "react";
import {WidthProvider, Responsive} from "react-grid-layout";
// import { Paper } from "react-bootstrap";
import {Paper} from "@material-ui/core";
import './style.scss'
import ExampleWidget from '../ExampleWidget';
import DecisionOverviewWidget from '../DecisionOverviewWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * A list of all the widgets that can be used in the grid.
 * The widget must exist in this list to be accessed by the DashboardToolbar
 */


/**
 * Component that handles the grid system of widgets
 *
 * @param {[{i: string, x: number, y: number, type: number}]} items descriptors of all the widgets
 * @param {function} handleRemove callback to remove a widget
 */
export default class DashboardGrid extends React.Component {
    constructor(props) {
        super(props)
    }

    // Generate all the widgets as children of a ReponsiveGridLayout
    render() {
        console.log("here");
        return (
            <div className={'DashboardGrid'}>
                <ResponsiveGridLayout>
                    {this.props.items.map(item => {
                        return <Paper
                            itemevation={3}
                            key={item.i}
                            data-grid={item.grid_data}>
                            {item.content}
                        </Paper>

                    })}
                </ResponsiveGridLayout>
            </div>
        );
    }
}
