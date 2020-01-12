import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";
import React from 'react'
import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

/**
 * High level component that handles the connection between the toolbar and the grid.
 * Maintains the items to be displayed on the grid.
 */

class Dashboard extends React.Component {
    // State
    // Current items on the grid
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            counter: 0
        };
        console.log('constructor Dashboard')
    }


    /**
     * Function to create a specific widget
     * @param {number} type index of the widget in the WidgetList
     */
    createWidget(type) {
        this.setState({
            counter: this.state.counter + 1,
            items: this.state.items.concat({
                i: "n" + this.state.counter,
                x: (this.state.items.length * 2) % 12,
                y: Infinity,
                type: type
            })
        });

    };

    /**
     * Function to remove a widget from the list of items
     * @param {string} i the unique id of the widget.
     */
    onRemoveItem(i) {
        this.setState({
            items: _.reject(this.state.items, {i: i})
        })
    };

    render() {

        // Render the Navigation bar, grid and toolbar.
        console.log("something working?");
        return (
            <div className='Dashboard'>
                <DashboardToolbar handleCreateWidget={this.createWidget.bind(this)}/>
                <div className='gridContainer'>
                    <DashboardGrid items={this.state.items} onRemoveItem={this.onRemoveItem.bind(this)}/>
                </div>
            </div>
        );
    }

}

export default Dashboard;
// Styles

