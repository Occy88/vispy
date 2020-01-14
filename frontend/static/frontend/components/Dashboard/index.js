import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";
import React from 'react'
import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import DecisionOverviewWidget from "../DecisionOverviewWidget";
import RelevanceVisWidget from "../RelevanceVisWidget";
import CadexVisWidget from "../CadexVisWidget";

/**
 * High level component that handles the connection between the toolbar and the grid.
 * Maintains the createdWidgets to be displayed on the grid.
 */

export default class Dashboard extends React.Component {
    // State
    // Current createdWidgets on the grid
    constructor(props) {
        super(props);
        this.state = {
            createdWidgets: [],
            counter: 0
        };
        console.log('constructor Dashboard');
        this.widgets = [
            // {widget: ExampleWidget, w: 6, h: 2},
            // {widget: DecisionOverviewWidget, w: 6, h: 2},
            // {widget: RelevanceVisWidget, w: 6, h: 2},
            CadexVisWidget];
        this.handleRemove = this.handleRemove.bind(this)
    }

    createWidget(type) {
        let val = this.state.counter;
        let widget = this.widgets[type](() => {
            this.handleRemove(val)
        });
        let gridData = {
            i: 'n' + val,
            x: (this.state.createdWidgets.length * 2) % 12,
            y: Infinity,
            w: widget.w,
            h: widget.h
        };
        return {
            content: widget.content,
            gridData: gridData,
            i: val
        }
    }

    /**
     * Function to create a specific widget
     * @param {number} type index of the widget in the WidgetList
     */
    handleCreate(type) {
        this.setState({
            createdWidgets: this.state.createdWidgets.concat(this.createWidget(type)),
            counter: this.state.counter + 1,
        });

    };

    /**
     * Function to remove a widget from the list of createdWidgets
     * @param {string} i the unique id of the widget.
     */
    handleRemove(i) {
        console.log(i);
        console.log(this.state.createdWidgets);
        this.setState({
            createdWidgets: _.reject(this.state.createdWidgets, {i: i})
        })
    };

    render() {
        return (
            <div className='Dashboard'>
                <DashboardToolbar widgets={this.widgets} handleCreateWidget={this.handleCreate.bind(this)}/>
                <DashboardGrid items={this.state.createdWidgets}/>
            </div>
        );
    }

}
