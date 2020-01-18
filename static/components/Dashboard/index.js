import React from 'react'
import Toolbar from "./Toolbar";
import DashboardGrid from "./DashboardGrid";
import "./style.scss";
import _ from 'underscore'
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import findSpace from "../../js/packing";
import uuid from 'uuid'

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
            componentDicts: [],
        };

        this.handleRemove = this.handleRemove.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    /**
     * function adds a component to the grid
     * @param component an imported component (to be called with react.createElement(...)
     * @param id uuid
     * @param posX (null or int)
     * @param posY (null or int)
     * @param width (null or int)
     * @param height (null or int)
     * @param props (additional props to pass )
     */
    handleCreate(component, id, posX, posY, width, height, props) {
        // if id not provided generate it now
        if (!id) {
            id = uuid()
        }
        //if no height/ width provided, set it here.
        if (!width || !height) {
            width = 4;
            height = 4;
        }
        //if  position not provided, generate one.
        if (!posX || !posY) {
            let pos = findSpace(this.state.componentDicts, 13, 13, width, height);
            posX = pos[0];
            posY = pos[1];
        }
        this.setState({
            componentDicts: this.state.componentDicts.concat({
                component: component,
                x: posX,
                y: posY,
                h: height,
                w: width,
                props: props,
                id: id
            })
        })
    }


    /**
     * Function to remove a component from the grid
     * @param {string} id the unique id of the component.
     */
    handleRemove(id) {
        this.setState({
            componentDicts: _.reject(this.state.componentDicts, {id: id})
        })
    };

    render() {
        return (
            <div className='Dashboard'>
                <Toolbar handleCreate={this.handleCreate.bind(this)}/>
                <DashboardGrid
                    handleRemove={this.handleRemove}
                    handleCreate={this.handleCreate}
                    componentDicts={this.state.componentDicts}/>
            </div>
        );
    }

}
