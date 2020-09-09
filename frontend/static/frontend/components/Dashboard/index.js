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
import FeatureSelection from "../FeatureSelection";

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
            {component: FeatureSelection, w: 7, h: 4, text: 'Feature Selection'},

        ];
        this.handleRemove = this.handleRemove.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.removeElement = this.removeElement.bind(this)
    }

    /**
     *
     * @param component Component to render
     * @param w width in grid units
     * @param h height in grid units
     * @param props props to pass component as it is created and rendered
     * @returns {{i: (number|Int8Array|Int16Array|Int32Array|Uint8Array|Uint16Array|Uint32Array|Uint8ClampedArray|Float32Array|Float64Array|DataView|ArrayBuffer), gridData: {w: *, x: number, h: *, i: string, y: number}, content: *, props: *}}
     */
    createWidget(component, w, h, props) {
        let val = this.state.counter;
        let pos = this.findSpace(w, h);
        let gridData = {
            i: 'n' + val,
            x: pos[0],
            y: pos[1],
            w: w,
            h: h
        };
        props.createWidget = this.handleCreate
        props.removeWidget = this.handleRemove
        props.id = val;
        return {
            content: component,
            props: props,
            gridData: gridData,
            i: val
        }
    }

    removeElement(id) {
        this.setState({elementToRemove: id});
        console.log("Removing element", id)
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
        // this.preloadWidgets();
    }

    /**
     * Creates a widget given a component, height of widget and width,
     * Widget is added to list of widgets to be rendered.
     * @param component: the widget to be created
     * @param width: width of the widget in grid units
     * @param height: height of the widget in grid units
     * @param props: props to pass to widget as it is created
     */
    handleCreate(component, width, height, props) {

        this.setState({
            createdWidgets: this.state.createdWidgets.concat(this.createWidget(component, width, height, props)),
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
                <DashboardToolbar widgets={this.widgets} handleCreateWidget={this.handleCreate.bind(this)}/>
                <DashboardGrid
                    handleRemove={this.handleRemove}
                    removeElement={this.removeElement}
                    elementToRemove={this.state.elementToRemove}
                    elementToEval={this.state.elementToEval}
                    items={this.state.createdWidgets}/>
            </div>
        );
    }
}
