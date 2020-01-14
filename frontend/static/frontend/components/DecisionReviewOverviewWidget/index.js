import React from "react";
import DecisionReviewOverview from "./widget.js"
import "./style.scss"

/**
 * An Example of a simple widget to be used in the grid.
 *
 * Note: To be able to use a widget you must also:
 *  - Add it to the WidgetList in DashboardGrid
 *  - Create a button for it in the DashboardToolbar
 *
 * Any given widget must take the following parameters
 * @param {function} handleRemove callback usSSSSSed to remove this widget
 * @param {string} i unique identity of this widget.
 */
const DecisionReviewOverviewWidget = (handleRemove) => {

    const content = (
        <DecisionReviewOverview handleRemove={handleRemove}/>
    );

    const defaultDimen = { w: 6, h: 2 };

    return {
        text: "Decision Review Overview",
        content: content,
        w: defaultDimen.w,
        h: defaultDimen.h
    };
};

export default DecisionReviewOverviewWidget;
