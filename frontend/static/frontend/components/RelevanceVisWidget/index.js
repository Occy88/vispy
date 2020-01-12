import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import ResponsiveHeatMap from "nivo/lib/components/charts/heatmap/ResponsiveHeatMap";
import WidgetHeader from "../WidgetHeader";
import WidgetBody from "../WidgetBody";

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
const RelevanceVisWidget = (handleRemove, i) => {

  // these would be fetched.
  const data = [
      {row:0, '0': 0.3, '1': 0.1, '2': 0.4, '3': 0.1},
      {row:1, '0': 0.7, '1': 0.1, '2': 0.6, '3': 0.1},
      {row:2, '0': 0.2, '1': 0.01, '2': 0.4, '3': 0.1},
      {row:3, '0': 0.9, '1': 0.1, '2': 0.4, '3': 0.1}
  ];

  // Create the content using the BaseWidget component.
  const content = (
    <BaseWidget handleRemove={handleRemove} i={i}>
      {/* The children contained within the component will be displayed within */}
      <WidgetHeader>
          Something
      </WidgetHeader>
      <WidgetBody>
        <ResponsiveHeatMap
            data={data}
            keys={['0', '1', '2', '3']}
            indexBy="row"
            forceSquare={true}
            colors="RdBu"
        />
      </WidgetBody>
    </BaseWidget>
  );

  // The default dimensions in terms of the grid system
  const defaultDimen = { w: 6, h: 2 };

  /*
    Any widget MUST have the following return object structure:
    {
      content: The content to be displayed within the widget,
      w: the default width of this widget (in terms of the grid system),
      h: the default height of this widget (in terms of the grid system)
    }
  */
  return {
    text: "Relevance",
    content: content,
    w: defaultDimen.w,
    h: defaultDimen.h
  };
};

export default RelevanceVisWidget;
