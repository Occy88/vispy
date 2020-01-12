import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
// import { Paper } from "react-bootstrap";
import {Paper} from "@material-ui/core";
import ExampleWidget from '../ExampleWidget';
import DecisionOverviewWidget from '../DecisionOverviewWidget';
const ResponsiveGridLayout = WidthProvider(Responsive);

/**
 * A list of all the widgets that can be used in the grid.
 * The widget must exist in this list to be accessed by the DashboardToolbar
 */

const AllWidgets = [ExampleWidget, DecisionOverviewWidget];

/**
 * Component that handles the grid system of widgets
 *
 * @param {[{i: string, x: number, y: number, type: number}]} items descriptors of all the widgets
 * @param {function} onRemoveItem callback to remove a widget
 */
const DashboardGrid = ({ items, onRemoveItem }) => {
  // Generate all the widgets as children of a ReponsiveGridLayout
  return (
    <ResponsiveGridLayout>
      {items.map(item => WidgetGenerator(item, onRemoveItem))}
    </ResponsiveGridLayout>
  );
};

/**
 * Generator function that handles the creation of a widget based on its descriptor
 *
 * @param {{i: string, x: number, y: number, type: number}} item descriptor of a widget
 * @param {function} handleRemove callback to remove a widget
 */
const WidgetGenerator = (item, handleRemove) => {
  // Get the widget from the WidgetList, and pass required parameters
  const widget = AllWidgets[item.type](handleRemove, item.i);
  // Create the grid data with relevant information
  const grid_data = {
    i: item.i,
    x: item.x,
    y: item.y,
    w: widget.w,
    h: widget.h
  };
  // Generate the widget as a child of a Paper component (improves appearance)
  return (
    <Paper itemevation={3} key={item.i} data-grid={grid_data}>
      {widget.content}
    </Paper>
  );
};

export default DashboardGrid;
