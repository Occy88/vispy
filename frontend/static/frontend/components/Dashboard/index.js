import React from 'react'
import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";
import DecisionOverviewWidget from "../DecisionOverviewWidget";
import CadexVisWidget from "../CadexVisWidget";
import DeepLearningVisWidget from "../DeepLearningVisWidget";
import DecisionReviewOverviewWidget from "../DecisionReviewOverviewWidget";
import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

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
        this.widgets = [
            CadexVisWidget,
            DecisionReviewOverviewWidget,
            DecisionOverviewWidget,
            DeepLearningVisWidget
        ];
        this.handleRemove = this.handleRemove.bind(this)
    }

    createWidget(type) {
        let val = this.state.counter;
        let widget = this.widgets[type](() => {
            this.handleRemove(val)
        });
        let pos = this.findSpace(widget.w, widget.h);
        let gridData = {
            i: 'n' + val,
            x: pos[0],
            y: pos[1],
            w: widget.w,
            h: widget.h
        };
        return {
            content: widget.content,
            gridData: gridData,
            i: val
        }
    }

    findSpace(width, height) {
        // identify max_width,max_height
        const max_width = 12;
        const max_height = 13;
        //    go linearly
        let p_x = 0;
        let p_y = 0;
        let found = true;
        let y = 0;
        let x = 0;
        while (y < max_height) {
            while (x < max_width) {
                console.log('evaluating:', x, y);
                for (let comp of this.state.createdWidgets) {
                    let w = comp.gridData.w;
                    let h = comp.gridData.h;
                    let x_c = comp.gridData.x;
                    let y_c = comp.gridData.y;
                    if (((p_x + width >= x_c && p_x < x_c) || (p_x + width >= x_c + w && p_x < x_c + w)) ||
                        ((p_y + height >= y_c && p_y < y_c) || (p_y + height >= y_c + h && p_y < y_c + h))) {
                        if (x_c + w + width > max_width) {
                            console.log('max width reached');
                            p_x = 0;
                            p_y = y_c + h;
                            console.log('evaluating:', p_x, p_y);
                        } else {
                            p_x = x_c + w;
                            console.log('evaluating:', p_x, p_y);

                        }
                        found = true;
                        x = p_x + width + 1;
                        y = p_y + height + 1;
                    }
                }
                if (found) {
                    console.log('went through iteration wth no collision, returning:', p_x, p_y);
                    return [p_x, p_y]

                }
                x += 1
            }
            y += 1
        }
        console.log('forced return: ', p_x, p_y);
        return [p_x, p_y]

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
        this.forceUpdate()

    };

    /**
     * Function to remove a widget from the list of createdWidgets
     * @param {string} i the unique id of the widget.
     */
    handleRemove(i) {
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
