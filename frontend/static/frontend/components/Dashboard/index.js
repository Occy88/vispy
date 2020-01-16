import React from 'react'
import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";
import DecisionOverview from "../DecisionOverview";
import DeepLearningVis from "../DeepLearningVis";
import DecisionReviewOverview from "../DecisionReviewOverview";
import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import CadexVis from "../CadexVis";

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
            counter: 0,
            elementToRemove: 0
        };
        this.widgets = [
            {component: CadexVis, w: 5, h: 4, text: 'Transparency'},
            {component: DecisionReviewOverview, w: 5, h: 4, text: 'Auditability'},
            {component: DecisionOverview, w: 5, h: 4, text: 'Safety Monitoring'},
            {component: DeepLearningVis, w: 5, h: 4, text: 'Explainability'},
        ];
        this.handleRemove = this.handleRemove.bind(this);
        this.createSpecial = this.createSpecial.bind(this);
        this.removeElement = this.removeElement.bind(this)
    }

    createWidget(type) {
        let val = this.state.counter;
        let widget = this.widgets[type];
        let content = this.widgets[type].component
        let pos = this.findSpace(widget.w, widget.h);
        let gridData = {
            i: 'n' + val,
            x: pos[0],
            y: pos[1],
            w: widget.w,
            h: widget.h
        };
        return {
            content: content,
            gridData: gridData,
            i: val
        }
    }

    removeElement(id) {
        this.setState({elementToRemove: id});
        console.log("Removing element", id)
    }

    createSpecial(id) {
        let widget = CadexVis;
        let i = this.state.counter + 1;
        let content = widget;
        let gridData = {
            i: 'n' + i,
            x: 5,
            y: 3,
            w: 7,
            h: 3
        };
        let toPush = {
            content: content,
            gridData: gridData,
            i: i
        };
        let returnList = [...this.state.createdWidgets];
        returnList.push(toPush);
        this.setState({
            createdWidgets: returnList,
            counter: i,
            elementToEval:id
        })
    }

    preloadWidgets() {
        let dims = [[0, 0, 5, 6], [5, 0, 7, 3]];
        let widgets = [DecisionOverview, DecisionReviewOverview];
        let returnList = [];
        for (let i = 0; i < widgets.length; i += 1) {
            let widget = widgets[i];
            let content = widget;
            let gridData = {
                i: 'n' + i,
                x: dims[i][0],
                y: dims[i][1],
                w: dims[i][2],
                h: dims[i][3]
            };
            let toPush = {
                content: content,
                gridData: gridData,
                i: i
            };
            returnList.push(toPush)
        }
        this.setState({
            createdWidgets: returnList,
            counter: widgets.length
        })
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

    componentDidMount() {
        this.preloadWidgets();
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
        this.setState({
            createdWidgets: _.reject(this.state.createdWidgets, {i: i})
        })
    };

    render() {
        return (
            <div className='Dashboard'>
f
                <DashboardToolbar widgets={this.widgets} handleCreateWidget={this.handleCreate.bind(this)}/>
                <DashboardGrid
                               handleRemove={this.handleRemove}
                               removeElement={this.removeElement}
                               elementToRemove={this.state.elementToRemove}
                               elementToEval={this.state.elementToEval}
                               createSpecial={this.createSpecial}
                               items={this.state.createdWidgets}/>
            </div>
        );
    }

}
