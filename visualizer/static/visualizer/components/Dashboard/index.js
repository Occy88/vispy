import React, { useState } from "react";
import _ from "lodash";
import DashboardToolbar from "../DashboardToolbar";
import DashboardGrid from "../DashboardGrid";

import "./style.scss";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

/**
 * High level component that handles the connection between the toolbar and the grid.
 * Maintains the items to be displayed on the grid.
 */
const Dashboard = () => {
  // State
  // Current items on the grid
  const [items, setItems] = useState([]);
  // Counter to generate unique IDs
  const [counter, setCounter] = useState(0);

  // Styles
  const style_window = {
    margin: "3% 2% 2% 2%",
    paddingTop: "30px",
    height: "100vh",
    backgroundColor: "#F0F5F6",
    overflowX: "hidden"
  };
  const style_gridContainer = { width: "85vw", marginLeft: "12vw" };

  /**
   * Function to create a specific widget
   * @param {number} type index of the widget in the WidgetList
   */
  const createWidget = type => {
    setItems(
      items.concat({
        i: "n" + counter,
        x: (items.length * 2) % 12,
        y: Infinity,
        type: type
      })
    );
    setCounter(counter + 1);
  };

  /**
   * Function to remove a widget from the list of items
   * @param {string} i the unique id of the widget.
   */
  const onRemoveItem = i => {
    setItems(_.reject(items, { i: i }));
  };

  // Render the Navigation bar, grid and toolbar.
  return (
    <div style={{width: '100%', backgroundColor: '#F0F5F6'}}>
    <div style={style_window}>
      <DashboardToolbar handleCreateWidget={createWidget} />
      <div style={style_gridContainer}>
        <DashboardGrid items={items} onRemoveItem={onRemoveItem} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
