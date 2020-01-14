import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import ListSelect from "../../../../../static/components/ListSelect";

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
const ExampleWidget = (handleRemove, i) => {
  // Create the content using the BaseWidget component.
  const content = (
    <BaseWidget handleRemove={handleRemove} i={i} header="Example 1">
      {/* The children contained within the component will be displayed within */}
      <div>
        <p>This is an example of some content for a widget</p>
      </div>
    </BaseWidget>
  );

  // The default dimensions in terms of the grid system
  const defaultDimen = { w: 2, h: 2 };

  /*
    Any widget MUST have the following return object structure:
    {
      content: The content to be displayed within the widget,
      w: the default width of this widget (in terms of the grid system),
      h: the default height of this widget (in terms of the grid system)
    }
  */
  return {
    text:'Example Button',
    content: content,
    w: defaultDimen.w,
    h: defaultDimen.h
  };
};

export default ExampleWidget;
