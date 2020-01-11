import React from "react";
import { Paper, Button } from "@material-ui/core";

/**
 * Button toolbar that handles user adding a widget to the grid
 * @param {function} handleCreateWidget callback used to determine when and which widget to create
 */
const DashboardToolbar = ({ handleCreateWidget }) => {
  // Toolbar style
  const style_toolbar = {
    width: "10vw",
    height: "80%",
    position: "fixed",
    paddingTop: "2%",
    textAlign: 'center',
  };

  /** Example button to add the ExampleWidget
   *  IMPORTANT: the index of the widget in the WidgetList is passed
   *    as the argument to handleCreateWidget.
   **/
  const ToolbarButton_Example = () => {
    return (
      <Button
        style={{ margin: "2%" }}
        variant="contained"
        color="primary"
        onClick={() => handleCreateWidget(0)}
      >
        Example
      </Button>
    );
  };

    const ToolbarButton_Decision = () => {
    return (
      <Button
        style={{ margin: "2%" }}
        variant="contained"
        color="primary"
        onClick={() => handleCreateWidget(1)}
      >
        Decision
      </Button>
    );
  };

  // Render the toolbar with the buttons
  return (
    <Paper elevation={3} style={style_toolbar}>
      {/* Add toolbar buttons here */}
      <ToolbarButton_Example />
      <ToolbarButton_Decision />
    </Paper>
  );
};

export default DashboardToolbar;
