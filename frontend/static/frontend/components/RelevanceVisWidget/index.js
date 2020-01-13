import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import {ResponsiveHeatMap} from "@nivo/heatmap"
import WidgetHeader from "../WidgetHeader";
import WidgetBody from "../WidgetBody";
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
const RelevanceVisWidget = (handleRemove, i) => {

  // these would be fetched.
  const data = [
      {row:'0', '0': 0.3, '1': 0.1, '2': 0.4, '3': 0.2, '4': 0.3, '5': 0.1, '6': 0.3, '7': 0.8},
      {row:'1', '0': 0.7, '1': 0.1, '2': 0.6, '3': 0.8, '4': 0.5, '5': 0.1, '6': 0.6, '7': 0.1},
      {row:'2', '0': 0.2, '1': 0.0, '2': 0.4, '3': 0.9, '4': 0.7, '5': 0.1, '6': 0.2, '7': 0.5},
      {row:'3', '0': 0.3, '1': 0.1, '2': 0.5, '3': 0.3, '4': 0.6, '5': 0.1, '6': 0.4, '7': 0.1},
      {row:'4', '0': 0.6, '1': 0.3, '2': 0.7, '3': 0.5, '4': 0.7, '5': 0.2, '6': 0.6, '7': 0.5},
      {row:'5', '0': 0.9, '1': 0.3, '2': 0.3, '3': 0.7, '4': 0.9, '5': 0.4, '6': 0.7, '7': 0.3},
      {row:'6', '0': 0.6, '1': 0.7, '2': 0.3, '3': 0.1, '4': 0.2, '5': 0.2, '6': 0.6, '7': 0.1},
      {row:'7', '0': 0.7, '1': 0.3, '2': 0.4, '3': 0.4, '4': 0.6, '5': 0.4, '6': 0.1, '7': 0.3},
      {row:'8', '0': 0.3, '1': 0.1, '2': 0.3, '3': 0.1, '4': 0.1, '5': 0.2, '6': 0.6, '7': 0.2}
  ];

  const alt_data = [
      {row:0, dat: [ 0.3, 0.1, 0.4, 0.2, 0.34, 0.1, 0.37, 0.08]}
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
            keys={['0', '1', '2', '3', '4', '5', '6', '7']}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            indexBy="row"
            forceSquare={true}
            colors="reds"
            axisLeft={null}
            axisTop={null}
            enableLabels={false}
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
