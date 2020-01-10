import React from "react";

/**
 * The skeleton of any widget to be displayed on the grid.
 *
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique index of the widget
 * @param {string} header the name of the widget
 * @param {JSX.Element} chlidren the content to be displayed within the widget (children of the component).
 */
const BaseWidget = ({ handleRemove, i, header, children }) => {
  // Styles
  const style_removeButton = {
    position: "absolute",
    right: "3%",
    top: 0,
    curesor: "pointer"
  };

  const style_interior = {
    margin: "2% 5%",
    fontFamily: "Montserrat"
  };

  const style_header = {
    textAlign: "left",
    fontSize: "0.8em",
    fontWeight: "bold",
    letterSpacing: "0.2em",
    paddingBottom: "2%"
  };

  // Create the interior of any given widget to be displayed.
  return (
    <div style={style_interior}>
      <div>
        <div style={style_header}>{header}</div>
        <span
          className="remove"
          style={style_removeButton}
          onClick={() => {
            handleRemove(i);
          }}
        >
          x
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default BaseWidget;
