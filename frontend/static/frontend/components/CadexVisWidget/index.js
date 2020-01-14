import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import ListSelect from "../../../../../static/components/ListSelect";
import CadexVis from './widget.js'
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
const CadexVisWidget = (handleRemove) => {
  // Create the content using the BaseWidget component.
  const content = (
    <CadexVis handleRemove={handleRemove}/>
  );

  // The default dimensions in terms of the grid system
  const defaultDimen = { w: 2, h: 2 };

  return {
    text:'Cadex Vis',
    content: content,
    w: defaultDimen.w,
    h: defaultDimen.h
  };
};

export default CadexVisWidget;
