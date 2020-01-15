import React from "react";
import DecisionOverview from "./widget.js"
import "./style.scss"

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
const DecisionOverviewWidget = (handleRemove) => {

    // Create the content using the BaseWidget component.
    const content = (
        <DecisionOverview handleRemove={handleRemove}/>
    );

    // The default dimensions in terms of the grid system
    const defaultDimen = {w: 4, h: 2};

    return {
        content: content,
        w: defaultDimen.w,
        h: defaultDimen.h,
        text: 'Decision overview'
    };
};

export default DecisionOverviewWidget;
