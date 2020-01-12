import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";
import React from 'react'
import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ExampleWidget from "../ExampleWidget";
import DecisionOverviewWidget from "../DecisionOverviewWidget";
import {Paper} from "@material-ui/core";

/**
 * High level component that handles the connection between the toolbar and the grid.
 * Maintains the createdWidgets to be displayed on the grid.
 */

class Dashboard extends React.Component {
    // State
    // Current createdWidgets on the grid
    constructor(props) {
        super(props);
        this.state = {
            createdWidgets: [],
            counter: 0
        };
        console.log('constructor Dashboard');
        this.widgets = [ExampleWidget,DecisionOverviewWidget];
        this.handleRemove=this.handleRemove.bind(this)
    }

    createWidget(type) {
        let widget = this.widgets[type](this.handleRemove, this.state.counter);
        let grid_data = {
            i: 'n'+this.state.counter,
            x: (this.state.createdWidgets.length * 2) % 12,
            y: Infinity,
            w: widget.w,
            h: widget.h
        };
        return {
            content: widget.content,
            grid_data: grid_data,
            i: this.state.counter
        }
    }

    /**
     * Function to create a specific widget
     * @param {number} type index of the widget in the WidgetList
     */
    handleCreate(type) {
        this.setState({
            counter: this.state.counter + 1,
            createdWidgets: this.state.createdWidgets.concat(this.createWidget(type))
        });

    };

    /**
     * Function to remove a widget from the list of createdWidgets
     * @param {string} i the unique id of the widget.
     */
    handleRemove(i) {
        console.log(i)
        console.log('removing')
        console.log(this.state.createdWidgets);
        this.setState({
            createdWidgets: _.reject(this.state.createdWidgets, {i: i})
        })
    };

    render() {

        // Render the Navigation bar, grid and toolbar.
        console.log("something working?");
        console.log(this.state.createdWidgets);

        return (
            <div className='Dashboard'>
                <DashboardToolbar widgets={this.widgets} handleCreateWidget={this.handleCreate.bind(this)}/>
                <DashboardGrid items={this.state.createdWidgets}
                               handleRemove={this.handleRemove.bind(this)}/>
            </div>
        );
    }

}

export default Dashboard;
// Styles

