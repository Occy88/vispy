import React from "react";
import DeepLearningVis from "./widget";
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
const DeepLearningVisWidget = (handleRemove, i) => {

  // Create the content using the BaseWidget component.
  const content = (
      <DeepLearningVis handleRemove={handleRemove}/>
  );

  // The default dimensions in terms of the grid system
  const defaultDimen = { w: 6, h: 2 };

  return {
    text: "Relevance",
    content: content,
    w: defaultDimen.w,
    h: defaultDimen.h
  };
};

export default DeepLearningVisWidget;
