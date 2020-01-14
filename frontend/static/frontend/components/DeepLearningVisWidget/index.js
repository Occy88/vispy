import React from "react";
import BaseWidget from "../../../../../static/components/BaseWidget";
import {ResponsiveHeatMap} from "@nivo/heatmap"
import {ResponsiveBar} from "@nivo/bar";
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
 * @param {function} handleRemove callback usSSSSSed to remove this widget
 * @param {string} i unique identity of this widget.
 */
const DeepLearningVisWidget = (handleRemove, i) => {

  // these would be fetched.
  const heatmap_data = [
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

        const timeline_posneg_data = [
            {"minibatch": 0, pos: 0.1, neg: -0.0},
            {"minibatch": 1, pos: 0.3, neg: -0.1},
            {"minibatch": 2, pos: 0.4, neg: -0.2},
            {"minibatch": 3, pos: 0.7, neg: -0.1},
            {"minibatch": 4, pos: 0.2, neg: -0.3},
            {"minibatch": 5, pos: 0.8, neg: -0.4},
            {"minibatch": 6, pos: 0.7, neg: -0.5},
            {"minibatch": 7, pos: 0.4, neg: -0.4},
            {"minibatch": 8, pos: 0.3, neg: -0.2},
            {"minibatch": 9, pos: 0.5, neg: -0.3},
            {"minibatch": 10, pos: 0.6, neg: -0.5},
            {"minibatch": 11, pos: 0.9, neg: -0.4},
            {"minibatch": 12, pos: 0.3, neg: -0.2},
            {"minibatch": 13, pos: 0.4, neg: -0.1},
            {"minibatch": 14, pos: 0.2, neg: -0.1}
        ];

        const timeline_pos_data = [
            {"minibatch": 0, pos: 0.3},
            {"minibatch": 1, pos: 0.1},
            {"minibatch": 2, pos: 0.2},
            {"minibatch": 3, pos: 0.6},
            {"minibatch": 4, pos: 0.8},
            {"minibatch": 5, pos: 0.7},
            {"minibatch": 6, pos: 0.1},
            {"minibatch": 7, pos: 0.0},
            {"minibatch": 8, pos: 0.1},
            {"minibatch": 9, pos: 0.2},
            {"minibatch": 10, pos: 0.5},
            {"minibatch": 11, pos: 0.4},
            {"minibatch": 12, pos: 0.7},
            {"minibatch": 13, pos: 0.5},
            {"minibatch": 14, pos: 0.4}
        ];

  // Create the content using the BaseWidget component.
  const content = (
      <BaseWidget handleRemove={handleRemove} i={i}>
          <WidgetHeader>
                    Something
          </WidgetHeader>
          <WidgetBody>
              <div className="Left">
                  <div className="">
                      Network Training
                  </div>
                  <div className="TimelineContainer">
                      <ResponsiveBar
                          data={timeline_posneg_data}
                          keys={['pos', 'neg']}
                          indexBy="minibatch"
                          groupMode={'grouped'}
                          margin={{top: 10, right: 10, bottom: 30, left: 30}}
                          enableLabel={false}
                        />
                  </div>
              </div>
              <div className="Right">
                  <div className="">
                      Decision Relevance Heat Map
                  </div>
                  <div className="HeatMapContainer">
                      <ResponsiveHeatMap
                          data={heatmap_data}
                          keys={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']}
                          margin={{top: 10, right: 10, bottom: 10, left: 10}}
                          indexBy="row"
                          forceSquare={true}
                          colors="reds"
                          axisLeft={null}
                          axisTop={null}
                          enableLabels={false}
                      />
                  </div>
              </div>
          </WidgetBody>;
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

export default DeepLearningVisWidget;
